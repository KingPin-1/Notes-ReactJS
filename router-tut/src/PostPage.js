/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DataContext from './context/DataContext';
import api from './api/posts';

const PostPage = () => {
    const { id } = useParams();
    const { posts, setPosts } = useContext(DataContext);
    const post = posts.find((post) => post.id.toString() === id);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/posts/${id}`);
            const filteredPosts = posts.filter(
                (post) => post.id.toString() !== id
            );
            setPosts(filteredPosts);
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    };

    return (
        <main className="post">
            {post && (
                <>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                    <p className="postBody">{post.body}</p>
                    <Link to={`/edit/${post.id}`}>
                        <button className="editBtn">Edit Post</button>
                    </Link>
                    <button onClick={() => handleDelete(id)}>
                        Delete Post
                    </button>
                </>
            )}
            {!post && (
                <>
                    <h2>No such post</h2>
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

export default PostPage;
