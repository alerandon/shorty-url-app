import type { FC, FormEvent } from 'react';
import { useState } from 'react';

const LinkInput: FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    if (!url.trim()) {
      setError('Please enter a URL.');
      return;
    }
    setLoading(true);

    try {
      console.log('Dentro del try-catch!!!!');
      // const res = await fetch('/api/shorten', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ url }),
      // });
      // if (!res.ok) throw new Error('Failed to shorten URL');
      // const data = await res.json();
      // setShortUrl(data.shortUrl || '');
    } catch {
      setError('There was a problem shortening your URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <form
        className="w-full flex items-center justify-between mt-8 shadow-lg rounded-full p-1 bg-[#28213B]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="url"
          placeholder="Enter your link here!"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="md:w-96 text-xs md:text-base bg-transparent outline-none px-3 md:px-6 py-3 text-white placeholder:text-gray-400 rounded-full font-medium"
          disabled={loading}
        />
        <button
          type="submit"
          className="ml-2 px-3 md:px-6 py-3 bg-[#3d3757]/80 hover:bg-[#4b4370] font-semibold text-xs md:text-base rounded-full transition-colors duration-200 shadow disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>
      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      {shortUrl && (
        <div className="mt-4 flex flex-col items-center">
          <span className="text-green-400 font-semibold">Short URL:</span>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline break-all mt-1"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default LinkInput;
