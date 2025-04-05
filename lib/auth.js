// 실제 서비스에서는 백엔드와 연동하는 인증 로직을 구현
// 현재는 로컬 스토리지 기반의 간단한 인증 처리

export const login = async (username, password) => {
  // 실제로는 API 호출
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 예시 사용자 정보 (실제로는 서버에서 인증)
      if (username === 'user' && password === 'password') {
        const userData = {
          id: '101',
          username: 'user',
          name: '김사용자',
          email: 'user@example.com'
        };
        resolve(userData);
      } else {
        reject(new Error('아이디 또는 비밀번호가 올바르지 않습니다'));
      }
    }, 1000);
  });
};

export const register = async (userData) => {
  // 실제로는 API 호출
  return new Promise((resolve) => {
    setTimeout(() => {
      // 더미 회원가입 (실제로는 서버에 사용자 저장)
      const newUser = {
        id: Date.now().toString(),
        ...userData
      };
      resolve(newUser);
    }, 1000);
  });
};

export const getUser = () => {
  // 로컬 스토리지에서 사용자 정보 가져오기
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
  }
  return null;
};

export const setUser = (user) => {
  // 로컬 스토리지에 사용자 정보 저장
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const removeUser = () => {
  // 로컬 스토리지에서 사용자 정보 삭제
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

export const isAuthenticated = () => {
  // 사용자 인증 상태 확인
  return getUser() !== null;
};
