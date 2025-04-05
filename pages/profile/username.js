import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PostCard from '../../components/PostCard';

export default function Profile({ user }) {
  const router = useRouter();
  const { username } = router.query;
  
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!username) return;
    
    // 실제로는 API 호출
    setTimeout(() => {
      // 더미 프로필 및 게시물 데이터
      const dummyProfile = {
        id: '102',
        username: username,
        name: username === 'user' ? '김사용자' : '이개발',
        bio: '안녕하세요! SNS에서 활동하고 있습니다.',
        followers: 120,
        following: 85
      };
      
      const dummyPosts = [
        {
          id: '201',
          content: '오늘은 정말 즐거운 하루였습니다!',
          createdAt: '2023-10-12T14:25:00Z',
          author: dummyProfile,
          likes: 15,
          comments: 2
        },
        {
          id: '202',
          content: '새로운 프로젝트를 시작했어요. Next.js로 SNS 만들기!',
          createdAt: '2023-10-10T09:15:00Z',
          author: dummyProfile,
          likes: 28,
          comments: 6
        }
      ];
      
      setProfile(dummyProfile);
      setPosts(dummyPosts);
      setLoading(false);
    }, 1000);
  }, [username]);

  const handleFollow = () => {
    // 실제로는 API 호출
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      setProfile({
        ...profile,
        followers: profile.followers + 1
      });
    } else {
      setProfile({
        ...profile,
        followers: profile.followers - 1
      });
    }
  };

  if (loading) {
    return <div className="text-center p-8">프로필 로딩 중...</div>;
  }

  if (!profile) {
    return <div className="text-center p-8">사용자를 찾을 수 없습니다</div>;
  }

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full mb-4 md:mb-0 md:mr-6">
            {/* 프로필 이미지 */}
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-2xl font-bold dark:text-white">{profile.name}</h1>
            <p className="text-gray-500 dark:text-gray-300 mb-2">@{profile.username}</p>
            <p className="mb-4 dark:text-gray-200">{profile.bio}</p>
            
            <div className="flex justify-center md:justify-start space-x-4 mb-4 dark:text-white">
              <span>
                <strong>{posts.length}</strong> 게시물
              </span>
              <span>
                <strong>{profile.followers}</strong> 팔로워
              </span>
              <span>
                <strong>{profile.following}</strong> 팔로잉
              </span>
            </div>
            
            {user && user.username !== profile.username && (
              <button
                onClick={handleFollow}
                className={`px-4 py-2 rounded ${
                  isFollowing
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isFollowing ? '팔로잉' : '팔로우'}
              </button>
            )}
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">게시물</h2>
      
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center p-4 bg-white rounded-lg shadow">
          게시물이 없습니다
        </p>
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
