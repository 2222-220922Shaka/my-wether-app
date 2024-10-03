// Forum.js
import React, { useState } from 'react';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setPosts([...posts, input.trim()]);
      setInput(''); // Clear the input field
    }
  };

  return (
    <div className="forum">
      <h2>Community Forum</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your weather tips or questions..."
          required
        />
        <button type="submit">Post</button>
      </form>
      <div className="forum-posts">
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="forum-post">
              <p>{post}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Forum;
