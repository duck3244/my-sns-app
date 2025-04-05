import { useState } from 'react';
import Link from 'next/link';
import CommentSection from './CommentSection';

export default function PostCard({ post, currentUser }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    // 실제로는 API 호출
    if (!liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setLiked(!liked);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow p-4">
  <div className="flex items-start mb-3">
    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-3 flex-shrink-0">
      {/* 사용자 프로필 이미지 */}
    </div>
    <div>
      <Link href={`/profile/${post.author.username}`} className="font-bold hover:underline dark:text-white">
        {post.author.name}
      </Link>
      <p className="text-gray-500 dark:text-gray-300 text-sm">@{post.author.username}</p>
    </div>
  </div>

  <Link href={`/post/${post.id}`} className="block mb-3">
    <p className="text-gray-800 dark:text-white">{post.content}</p>
  </Link>

  <p className="text-gray-500 dark:text-gray-300 text-sm mb-3">{formatDate(post.createdAt)}</p>

      <div className="flex border-t pt-3">
        <button
          onClick={handleLike}
          className={`flex items-center mr-4 ${liked ? 'text-red-500' : 'text-gray-500'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill={liked ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>{likes}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>{post.comments}</span>
        </button>
      </div>

      {showComments && <CommentSection postId={post.id} currentUser={currentUser} />}
    </div>
  );
}