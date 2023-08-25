import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';

const NewPost = () => {
    const posts = useStoreState((state) => state.posts);
    const postTitle = useStoreState((state) => state.postTitle);
    const postBody = useStoreState((state) => state.postBody);
    const savePost = useStoreActions((action) => action.savePost);
    const setPostTitle = useStoreActions((action) => action.setPostTitle);
    const setPostBody = useStoreActions((action) => action.setPostBody);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            id: posts.length ? posts[posts.length - 1].id + 1 : 1,
            title: postTitle,
            datetime: format(new Date(), 'MMMM dd,yyyy pp'),
            body: postBody,
        };
        savePost(newPost);
        navigate('/');
    };

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
