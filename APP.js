const { useState, useEffect, useRef } = React;

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "مزارع علي",
      content: "ما هي أفضل الأسمدة العضوية للقمح؟",
      likes: 3,
      comments: ["جرب سماد البلدي!", "جرب NPK"],
    },
  ]);

  const [newPostContent, setNewPostContent] = useState("");

  const handleAddPost = () => {
    if (newPostContent.trim() === "") {
      alert("يرجى كتابة محتوى المنشور!");
      return;
    }

    const newPost = {
      id: posts.length + 1,
      author: "مزارع مجهول",
      content: newPostContent,
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const handleLike = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleAddComment = (id, comment) => {
    if (comment.trim() === "") return;

    const updatedPosts = posts.map((post) =>
      post.id === id
        ? { ...post, comments: [...post.comments, comment] }
        : post
    );

    setPosts(updatedPosts);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">مجتمع المزارعين</h2>
      <div className="mb-4">
        <textarea
          className="form-control mb-2"
          rows="3"
          placeholder="اكتب منشورًا..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddPost}>
          نشر
        </button>
      </div>
      <div>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onLike={() => handleLike(post.id)}
            onAddComment={handleAddComment}
          />
        ))}
      </div>
    </div>
  );
}

function Post({ post, onLike, onAddComment }) {
  const [comment, setComment] = useState("");
  const postRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      postRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleCommentSubmit = () => {
    onAddComment(post.id, comment);
    setComment("");
  };

  return (
    <div className="card mb-3" ref={postRef}>
      <div className="card-body">
        <h5 className="card-title">{post.author}</h5>
        <p className="card-text">{post.content}</p>
        <button className="btn btn-link" onClick={onLike}>
          👍 إعجاب ({post.likes})
        </button>
        <hr />
        <h6>التعليقات:</h6>
        <ul className="list-unstyled">
          {post.comments.map((comment, index) => (
            <li key={index}>- {comment}</li>
          ))}
        </ul>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="اكتب تعليقًا..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleCommentSubmit}>
            إضافة
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
