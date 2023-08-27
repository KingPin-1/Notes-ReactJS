import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const EditPost = () => {
    const posts = useStoreState((state) => state.posts);
    const editPostTitle = useStoreState((state) => state.editPostTitle);
    const editPostBody = useStoreState((state) => state.editPostBody);
    const editPost = useStoreActions((action) => action.editPost);
    const setEditPostTitle = useStoreActions(
        (action) => action.setEditPostTitle
    );
    const setEditPostBody = useStoreActions((action) => action.setEditPostBody);

    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);
    const navigate = useNavigate();
 
    const handleEdit = (id) => {
        const updatedPost = {
            id: id,
            title: editPostTitle,
            datetime: format(new Date(), 'MMMM dd,yyyy pp'),
            body: editPostBody,
        };
        editPost(updatedPost);
        navigate(`/post/${id}`);
    };

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
                    <h2>Edit Note</h2>
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
