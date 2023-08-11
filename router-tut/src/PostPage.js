import { Link, useParams } from 'react-router-dom';

const PostPage = ({ posts, handleDelete }) => {
    const { id } = useParams();
    console.log(id);
    const post = posts.find((post) => post.id.toString() === id);
    return (
        <article className="post">
            {post && (
                <>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                    <p className="postBody">{post.body}</p>
                    <button onClick={() => handleDelete(id)}>
                        Delete Post
                    </button>
                </>
            )}
            {!post && (
                <>
                    <h2>No such post</h2>
                    <p className="postDate">
                        Unfortunately this post doesn't exist
                    </p>
                    <Link to="/">Click here to go home</Link>
                </>
            )}
        </article>
    );
};

export default PostPage;
