import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DataContext from './context/DataContext';
import { format } from 'date-fns';
import api from './api/posts';

const EditPost = () => {
    const { posts, setPosts } = useContext(DataContext);
    const [editPostTitle, setEditPostTitle] = useState('');
    const [editPostBody, setEditPostBody] = useState('');
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);
    const navigate = useNavigate();

    const handleEdit = async (id) => {
        const updatedPost = {
            id: id,
            title: editPostTitle,
            datetime: format(new Date(), 'MMMM dd,yyyy pp'),
            body: editPostBody,
        };
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(
                posts.map((post) =>
                    post.id === id ? { ...response.data } : post
                )
            );
            setEditPostBody('');
            setEditPostTitle('');
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
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
