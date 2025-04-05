import { useState } from 'react';

export default function PostForm({ user, addPost }) {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() || submitting) return;
    
    setSubmitting(true);
    
    // 실제로는 API 호출
    setTimeout(() => {
      addPost({ content });
      setContent('');
      setSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="mb-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="무슨 생각을 하고 계신가요?"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          rows="3"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!content.trim() || submitting}
          className={`px-4 py-2 rounded text-white ${
            !content.trim() || submitting
            ? 'bg-blue-300 dark:bg-blue-800'
            : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
          }`}
        >
          {submitting ? '게시 중...' : '게시하기'}
        </button>
      </div>
    </form>
  );
}