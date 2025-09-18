import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com";

const Comment = ({ comment, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.body);

  const handleSave = () => {
    onEdit(comment.id, text);
    setIsEditing(false);
  };

  return (
    <div className="border p-2 rounded-md bg-gray-100 mb-2">
      {isEditing ? (
        <div className="flex gap-2">
          <input className="flex-1 p-2 border border-gray-300 rounded" value={text} onChange={(e) => setText(e.target.value)} />
          <button className="px-4 py-1 bg-blue-500 text-white rounded cursor-pointer" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-800">{text}</p>
          <button className="text-blue-500 hover:underline text-sm cursor-pointer" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/posts/${post.id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [post.id]);

  const handleEditComment = (commentId, newBody) => {
    setComments((prev) => prev.map((c) => (c.id === commentId ? { ...c, body: newBody } : c)));
    fetch(`${API_URL}/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ body: newBody }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  return (
    <div className="mb-6 shadow-md border rounded-md">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="mb-4 text-gray-700">{post.body}</p>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Comments:</h3>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} onEdit={handleEditComment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const PostsWithComments = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/posts?_limit=5`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Posts with Comments</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
