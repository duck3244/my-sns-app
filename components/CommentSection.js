import { useState, useEffect } from 'react';

export default function CommentSection({ postId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제로는 API 호출
    setTimeout(() => {
      const dummyComments = [
        {
          id: '101',
          content: '멋진 글이네요!',
          createdAt: '2023-10-15T10:30:00Z',
          author: {
            username: 'commenter1',
            name: '댓글러'
          }
        },
        {
          id: '102',
          content: '정말 공감합니다.',
          createdAt: '2023-10-15T11:45:00Z',
          author: {
            username: 'commenter2',
            name: '독자'
          }
        }
      ];
      setComments(dummyComments);
      setLoading(false);
    }, 500);
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    // 실제로는 API 호출
    const comment = {
      id: Date.now().toString(),
      content: newComment,
      createdAt: new Date().toISOString(),
      author: {
        username: currentUser.username,
        name: currentUser.name
      }
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <div className="mt-4 border-t dark:border-gray-700 pt-4">
      <h3 className="text-lg font-semibold mb-3 dark:text-white">댓글</h3>
      
      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">댓글 로딩 중...</p>
      ) : (
        <div className="space-y-3 mb-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">아직 댓글이 없습니다.</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="flex">
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 mr-2 flex-shrink-0">
                  {/* 프로필 이미지 */}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-grow dark:text-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium dark:text-white">{comment.author.name}</span>
                    <span className="text-gray-500 dark:text-gray-300 text-xs">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {currentUser ? (
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 disabled:bg-blue-300"
          >
            등록
          </button>
        </form>
      ) : (
        <p className="text-gray-500 text-sm">댓글을 작성하려면 로그인하세요.</p>
      )}
    </div>
  );
}
