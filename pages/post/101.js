import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CommentSection from '../../components/CommentSection';

export default function PostDetail({ user }) {
  const router = useRouter();
  const { id } = router.query;
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (!id) return;
    
    // 실제로는 API 호출
    setTimeout(() => {
      // 더미 포스트 데이터
      const dummyPost = {
        id: id,
        content: '이것은 상세 페이지에서 볼 수 있는 포스트입니다.',
        createdAt: '2023-10-15T09:30:00Z',
        author: {
          id: '101',
          username: 'user',
          name: '김사용자'
        },
        likes: 18,
        comments: 7
      };
      
      setPost(dummyPost);
      setLikes(dummyPost.likes);
      setLoading(false);
    }, 500);
  }, [id]);

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

  if (loading) {
    return <div className="text-center p-8">포스트 로딩 중...</div>;
  }

  if (!post) {
    return <div className="text-center p-8">포스트를 찾을 수 없습니다</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <Link href="/" legacyBehavior>
          <a className="text-blue-500 hover:underline flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            홈으로 돌아가기
          </a>
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-start mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-4 flex-shrink-0">
            {/* 프로필 이미지 */}
          </div>
          <div>
            <Link href={`/profile/${post.author.username}`} className="font-bold text-lg hover:underline dark:text-white">
              {post.author.name}
            </Link>
            <p className="text-gray-500 dark:text-gray-300">@{post.author.username}</p>
            <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        
        <div className="text-xl mb-6 dark:text-white">{post.content}</div>
        
        <div className="flex border-t pt-4">
          <button
            onClick={handleLike}
            className={`flex items-center mr-6 ${liked ? 'text-red-500' : 'text-gray-500'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
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
            <span>{likes} 좋아요</span>
          </button>
          
          <div className="flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
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
            <span>{post.comments} 댓글</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <CommentSection postId={id} currentUser={user} />
      </div>
    </div>
  );
}
