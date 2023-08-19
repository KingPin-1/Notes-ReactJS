import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EditPost = ({
    posts,
    handleEdit,
    editPostBody,
    editPostTitle,
    setEditPostBody,
    setEditPostTitle,
}) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);
    useEffect(() => {
        if (post) {
            setEditPostBody(post.body);
            setEditPostTitle(post.title);
        }
    }, [post, setEditPostBody, setEditPostTitle]);
    return (
        <main className="newPost">
            {editPostTitle && (
                <>
                    <h2>Edit Post</h2>
                    <form
                        className="newPostForm"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            autoFocus
                            required
                            id="postTitle"
                            type="text"
                            value={editPostTitle}
                            onChange={(e) => setEditPostTitle(e.target.value)}
                            autoComplete="off"
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            required
                            id="postBody"
                            value={editPostBody}
                            onChange={(e) => setEditPostBody(e.target.value)}
                            autoComplete="off"
                        ></textarea>
                        <button
                            type="submit"
                            onClick={() => handleEdit(post.id)}
                        >
                            Submit
                        </button>
                    </form>
                </>
            )}
            {!editPostTitle && (
                <>
                    <h2>Post Not Found</h2>
                    <p className="postBody">
                        Unfortunately this post doesn't exist
                    </p>
                    <Link className="back" to="/">
                        Click here to go home
                    </Link>
                </>
            )}
        </main>
    );
};

export default EditPost;
