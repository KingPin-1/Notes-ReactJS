import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {
    const { id } = useParams();
    const getPostById = useStoreState((state) => state.getPostById);
    const deletePost = useStoreActions((action) => action.deletePost);
    const post = getPostById(id);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        deletePost(id);
        navigate('/');
    };

    return (
        <main className="post">
            {post && (
                <>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                    <p className="postBody">{post.body}</p>
                    <Link to={`/edit/${post.id}`}>
                        <button className="editBtn">Edit Note</button>
                    </Link>
                    <button onClick={() => handleDelete(id)}>
                        Delete Note
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
