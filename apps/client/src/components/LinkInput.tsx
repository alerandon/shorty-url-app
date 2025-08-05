import React from 'react';
import { useCreateUrl } from '../hooks/useCreateUrl';
import { getGuestId } from '../utils/guest';

interface LinkInputProps {
  onUrlCreated: () => void;
}

const LinkInput: React.FC<LinkInputProps> = ({ onUrlCreated }) => {
  const [url, setUrl] = React.useState('');
  const { url: newUrl, loading, error, createUrl } = useCreateUrl();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) return;
    const guestId = getGuestId();
    const result = await createUrl({ originalUrl: url, guestId });
    if (result) {
      onUrlCreated();
      setUrl('');
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-8">
      <form
        className="w-full max-w-lg md:max-w-2xl md:w-10/12 flex items-center justify-between shadow-lg rounded-full p-1 bg-primary"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="url"
          placeholder="Enter your link here!"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full text-xs md:text-base bg-transparent outline-none pl-3 md:pl-6 py-3  placeholder:text-gray-400 rounded-full font-medium"
          disabled={loading}
        />
        <button
          type="submit"
          className="min-w-28 md:min-w-40 ml-2 px-3 md:px-6 py-3 bg-[#3d3757]/80 hover:bg-[#4b4370] font-semibold text-xs md:text-base rounded-full transition-colors duration-200 shadow disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>
      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
    </div>
  );
};

export default LinkInput;
