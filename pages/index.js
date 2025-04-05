import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

export default function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 데이터베이스 연결 대신 임시 데이터
    const dummyPosts = [
      {
        id: '1',
        content: '오늘은 날씨가 정말 좋네요!',
        createdAt: '2023-10-15T09:00:00Z',
        author: {
          id: '101',
          username: 'user1',
          name: '김사용자'
        },
        likes: 12,
        comments: 3
      },
      {
        id: '2',
        content: '새로운 Next.js 버전이 출시되었습니다. 확인해보세요!',
        createdAt: '2023-10-14T13:45:00Z',
        author: {
          id: '102',
          username: 'techguru',
          name: '이개발'
        },
        likes: 24,
        comments: 5
      }
    ];
    
    setPosts(dummyPosts);
    setLoading(false);
  }, []);

  const addPost = (newPost) => {
    // 실제로는 API 호출 후 응답으로 새 포스트 추가
    const post = {
      id: Date.now().toString(),
      content: newPost.content,
      createdAt: new Date().toISOString(),
      author: {
        id: user.id,
        username: user.username,
        name: user.name
      },
      likes: 0,
      comments: 0
    };
    
    setPosts([post, ...posts]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">최신 포스트</h1>
      
      {user && (
        <PostForm user={user} addPost={addPost} />
      )}
      
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} currentUser={user} />
          ))}
        </div>
      )}
    </div>
  );
}
