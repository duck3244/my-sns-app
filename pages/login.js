import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login({ login }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('모든 필드를 입력해주세요');
      return;
    }

    setLoading(true);
    setError('');

    // 실제로는 API 호출
    setTimeout(() => {
      // 더미 로그인 (실제로는 서버에서 인증)
      if (username === 'user' && password === 'password') {
        const userData = {
          id: '101',
          username: 'user',
          name: '김사용자',
          email: 'user@example.com'
        };
        login(userData);
        router.push('/');
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">로그인</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
            아이디
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="dark:text-gray-300">
          계정이 없으신가요?{' '}
          <Link href="/register" className="text-blue-500 hover:underline dark:text-blue-400">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
