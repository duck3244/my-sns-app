// 실제 서비스에서는 데이터베이스와 연동하는 로직 구현
// 현재는 간단한 임시 데이터를 활용한 예시 API

// 더미 사용자 데이터
const users = [
  {
    id: '101',
    username: 'user',
    name: '김사용자',
    email: 'user@example.com',
    password: 'password', // 실제로는 해싱된 비밀번호 저장
    bio: '안녕하세요! SNS에서 활동하고 있습니다.',
    followers: 120,
    following: 85
  },
  {
    id: '102',
    username: 'techguru',
    name: '이개발',
    email: 'dev@example.com',
    password: 'password',
    bio: '웹 개발자입니다. Next.js와 React를 좋아합니다.',
    followers: 250,
    following: 120
  }
];

// 더미 포스트 데이터
let posts = [
  {
    id: '1',
    content: '오늘은 날씨가 정말 좋네요!',
    createdAt: '2023-10-15T09:00:00Z',
    authorId: '101',
    likes: 12,
    comments: 3
  },
  {
    id: '2',
    content: '새로운 Next.js 버전이 출시되었습니다. 확인해보세요!',
    createdAt: '2023-10-14T13:45:00Z',
    authorId: '102',
    likes: 24,
    comments: 5
  }
];

// 더미 댓글 데이터
let comments = [
  {
    id: '101',
    postId: '1',
    content: '멋진 글이네요!',
    createdAt: '2023-10-15T10:30:00Z',
    authorId: '102'
  },
  {
    id: '102',
    postId: '1',
    content: '정말 공감합니다.',
    createdAt: '2023-10-15T11:45:00Z',
    authorId: '101'
  },
  {
    id: '103',
    postId: '2',
    content: '유용한 정보 감사합니다.',
    createdAt: '2023-10-14T14:15:00Z',
    authorId: '101'
  }
];

// 사용자 조회
export const getUserById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find(user => user.id === id);
      if (user) {
        // 비밀번호 제외하고 반환
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      } else {
        resolve(null);
      }
    }, 300);
  });
};

export const getUserByUsername = (username) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find(user => user.username === username);
      if (user) {
        // 비밀번호 제외하고 반환
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      } else {
        resolve(null);
      }
    }, 300);
  });
};

// 포스트 관련 함수
export const getAllPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 포스트에 사용자 정보 포함
      const postsWithAuthors = posts.map(post => {
        const author = users.find(user => user.id === post.authorId);
        const { password, ...authorData } = author;
        return {
          ...post,
          author: authorData
        };
      });
      resolve(postsWithAuthors);
    }, 300);
  });
};

export const getPostById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = posts.find(post => post.id === id);
      if (post) {
        const author = users.find(user => user.id === post.authorId);
        const { password, ...authorData } = author;
        resolve({
          ...post,
          author: authorData
        });
      } else {
        resolve(null);
      }
    }, 300);
  });
};

export const getUserPosts = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userPosts = posts
        .filter(post => post.authorId === userId)
        .map(post => {
          const author = users.find(user => user.id === post.authorId);
          const { password, ...authorData } = author;
          return {
            ...post,
            author: authorData
          };
        });
      resolve(userPosts);
    }, 300);
  });
};

export const createPost = (content, userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPost = {
        id: Date.now().toString(),
        content,
        createdAt: new Date().toISOString(),
        authorId: userId,
        likes: 0,
        comments: 0
      };
      
      posts.unshift(newPost);
      
      const author = users.find(user => user.id === userId);
      const { password, ...authorData } = author;
      
      resolve({
        ...newPost,
        author: authorData
      });
    }, 300);
  });
};

// 댓글 관련 함수
export const getPostComments = (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const postComments = comments
        .filter(comment => comment.postId === postId)
        .map(comment => {
          const author = users.find(user => user.id === comment.authorId);
          const { password, ...authorData } = author;
          return {
            ...comment,
            author: authorData
          };
        });
      resolve(postComments);
    }, 300);
  });
};

export const createComment = (postId, content, userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newComment = {
        id: Date.now().toString(),
        postId,
        content,
        createdAt: new Date().toISOString(),
        authorId: userId
      };
      
      comments.push(newComment);
      
      // 포스트 댓글 수 증가
      const post = posts.find(post => post.id === postId);
      if (post) {
        post.comments += 1;
      }
      
      const author = users.find(user => user.id === userId);
      const { password, ...authorData } = author;
      
      resolve({
        ...newComment,
        author: authorData
      });
    }, 300);
  });
};

// 좋아요 관련 함수
export const toggleLikePost = (postId, userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = posts.find(post => post.id === postId);
      if (post) {
        // 실제로는 좋아요 테이블에서 확인 및 토글
        // 여기서는 간단히 구현
        const isLiked = Math.random() > 0.5; // 실제로는 DB에서 확인
        
        if (isLiked) {
          post.likes -= 1;
        } else {
          post.likes += 1;
        }
        
        resolve({
          postId,
          likes: post.likes,
          isLiked: !isLiked
        });
      } else {
        resolve(null);
      }
    }, 300);
  });
};
