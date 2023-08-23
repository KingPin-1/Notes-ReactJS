/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import DataContext from './context/DataContext';
import api from './api/posts.js';

const NewPost = () => {
    const { posts, setPosts } = useContext(DataContext);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            id: posts.length ? posts[posts.length - 1].id + 1 : 1,
            title: postTitle,
            datetime: format(new Date(), 'MMMM dd,yyyy pp'),
            body: postBody,
        };
        try {
            const response = await api.post('/posts', newPost);
            const newList = [...posts, newPost];
            setPosts(newList);
            setPostBody('');
            setPostTitle('');
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
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
