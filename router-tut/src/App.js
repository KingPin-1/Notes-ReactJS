/* eslint-disable no-unused-vars */
import About from './About.js';
import Missing from './Missing.js';
import Home from './Home.js';
import PostPage from './PostPage.js';
import NewPost from './NewPost.js';
import Layout from './Layout.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'My First Post',
            datetime: 'July 01, 2021 11:17:36 AM',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
        },
        {
            id: 2,
            title: 'My 2nd Post',
            datetime: 'July 01, 2021 11:17:36 AM',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
        },
        {
            id: 3,
            title: 'My 3rd Post',
            datetime: 'July 01, 2021 11:17:36 AM',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
        },
        {
            id: 4,
            title: 'My Fourth Post',
            datetime: 'July 01, 2021 11:17:36 AM',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
        },
    ]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const filteredResults = posts.filter(
            (post) =>
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    const handleDelete = (id) => {
        const filteredPosts = posts.filter((post) => post.id.toString() !== id);
        setPosts(filteredPosts);
        navigate('/');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            id: posts.length ? posts[posts.length - 1].id + 1 : 1,
            title: postTitle,
            datetime: format(new Date(), 'MMMM dd,yyyy pp'),
            body: postBody,
        };
        const newList = [...posts, newPost];
        setPosts(newList);
        setPostBody('');
        setPostTitle('');
        navigate('/');
    };

    return (
        <Routes>
            <Route
                path="/"
                element={<Layout search={search} setSearch={setSearch} />}
            >
                <Route
                    index
                    path="/"
                    element={<Home posts={searchResults} />}
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
                <Route path="/about" element={<About />}></Route>
                <Route path="*" element={<Missing />}></Route>
            </Route>
        </Routes>
    );
}

export default App;
