import { useCallback, useEffect, useState } from 'react';

export function useOptimisticDelete<T>(items: T[], getId: (item: T) => string) {
  const [optimisticItems, setOptimisticItems] = useState<T[]>(items);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setOptimisticItems(items);
  }, [items]);

  const deleteItem = useCallback(
    async (idKey: string, action: () => Promise<boolean>) => {
      let removed: T | undefined;
      let removedIndex = -1;

      setDeletingIds((prev) => new Set(prev).add(idKey));
      setOptimisticItems((prev) => {
        removedIndex = prev.findIndex((i) => getId(i) === idKey);
        if (removedIndex === -1) return prev;
        removed = prev[removedIndex];
        const next = prev.slice();
        next.splice(removedIndex, 1);
        return next;
      });

      if (removedIndex === -1 || !removed) {
        setDeletingIds((prev) => {
          const next = new Set(prev);
          next.delete(idKey);
          return next;
        });
        return false;
      }

      let ok = false;
      try {
        ok = await action();
        if (!ok) {
          // rollback si el servidor indicó fallo
          setOptimisticItems((prev) => {
            const next = prev.slice();
            next.splice(removedIndex, 0, removed as T);
            return next;
          });
        }
        return ok;
      } catch {
        // rollback ante excepciones
        setOptimisticItems((prev) => {
          const next = prev.slice();
          next.splice(removedIndex, 0, removed as T);
          return next;
        });
        return false;
      } finally {
        setDeletingIds((prev) => {
          const next = new Set(prev);
          next.delete(idKey);
          return next;
        });
      }
    },
    [getId],
  );

  const isDeleting = useCallback(
    (idKey: string) => deletingIds.has(idKey),
    [deletingIds],
  );

  return { optimisticItems, isDeleting, deleteItem };
}
