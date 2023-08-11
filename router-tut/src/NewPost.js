const NewPost = ({
    handleSubmit,
    postTitle,
    setPostTitle,
    postBody,
    setPostBody,
}) => {
    return (
        <main className="newPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    autoFocus
                    required
                    id="postTitle"
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    autoComplete="off"
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    required
                    id="postBody"
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    autoComplete="off"
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </main>
    );
};

export default NewPost;
