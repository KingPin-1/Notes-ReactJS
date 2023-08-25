import About from './About.js';
import Missing from './Missing.js';
import Home from './Home.js';
import PostPage from './PostPage.js';
import NewPost from './NewPost.js';
import Layout from './Layout.js';
import EditPost from './EditPost.js';
import useAxiosFetch from './hooks/useAxiosFetch.js';
import { Route, Routes } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';

function App() {
    const setPosts = useStoreActions((action) => action.setPosts);
    const { data, fetchError, isLoading } = useAxiosFetch(
        'http://localhost:3500/posts'
    );
    useEffect(() => {
        setPosts(data);
    }, [data, setPosts]);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    path="/"
                    element={
                        <Home fetchError={fetchError} isLoading={isLoading} />
                    }
                ></Route>
                <Route path="post">
                    <Route index path="/post" element={<NewPost />}></Route>
                    <Route path=":id" element={<PostPage />}></Route>
                </Route>
                <Route path="edit/:id" element={<EditPost />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="*" element={<Missing />}></Route>
            </Route>
        </Routes>
    );
}

export default App;
