/* eslint-disable no-unused-vars */
import About from './About.js';
import Missing from './Missing.js';
import Home from './Home.js';
import PostPage from './PostPage.js';
import NewPost from './NewPost.js';
import Layout from './Layout.js';
import EditPost from './EditPost.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts.js';
import useWindowSize from './hooks/useWindowSize.js';
import useAxiosFetch from './hooks/useAxiosFetch.js';

function App() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editPostTitle, setEditPostTitle] = useState('');
    const [editPostBody, setEditPostBody] = useState('');
    const navigate = useNavigate();
    const { width } = useWindowSize();

    const { data, fetchError, isLoading } = useAxiosFetch(
        'http://localhost:3500/posts'
    );

    useEffect(() => {
        setPosts(data);
    }, [data]);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await api.get('/posts');
    //             setPosts(response.data);
    //         } catch (err) {
    //             if (err.response) {
    //                 console.log(err.response.data);
    //                 console.log(err.response.status);
    //                 console.log(err.response.headers);
    //             } else {
    //                 console.log(`Error : ${err.message}`);
    //             }
    //         }
    //     };
    //     fetchPosts();
    // }, []);

    useEffect(() => {
        const filteredResults = posts.filter(
            (post) =>
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

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
        <Routes>
            <Route
                path="/"
                element={
                    <Layout
                        search={search}
                        setSearch={setSearch}
                        width={width}
                    />
                }
            >
                <Route
                    index
                    path="/"
                    element={
                        <Home
                            posts={searchResults}
                            fetchError={fetchError}
                            isLoading={isLoading}
                        />
                    }
                ></Route>
                <Route path="post">
                    <Route
                        index
                        path="/post"
                        element={
                            <NewPost
                                handleSubmit={handleSubmit}
                                postTitle={postTitle}
                                setPostTitle={setPostTitle}
                                postBody={postBody}
                                setPostBody={setPostBody}
                            />
                        }
                    ></Route>
                    <Route
                        path=":id"
                        element={
                            <PostPage
                                posts={posts}
                                handleDelete={handleDelete}
                            />
                        }
                    ></Route>
                </Route>
                <Route
                    path="edit/:id"
                    element={
                        <EditPost
                            posts={posts}
                            handleEdit={handleEdit}
                            editPostBody={editPostBody}
                            editPostTitle={editPostTitle}
                            setEditPostBody={setEditPostBody}
                            setEditPostTitle={setEditPostTitle}
                        />
                    }
                ></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="*" element={<Missing />}></Route>
            </Route>
        </Routes>
    );
}

export default App;
