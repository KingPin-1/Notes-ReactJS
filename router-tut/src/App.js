/* eslint-disable no-unused-vars */
import Nav from './Nav.js';
import Header from './Header.js';
import Footer from './Footer.js';
import About from './About.js';
import Missing from './Missing.js';
import Home from './Home.js';
import PostPage from './PostPage.js';
import NewPost from './NewPost.js';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

    return (
        <div className="App">
            <Header title="React JS Blog" />
            <Nav search={search} setSearch={setSearch} />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/post">
                    <NewPost />
                </Route>
                <Route path="/posts/:id">
                    <PostPage />
                </Route>
                <Route path="/about" component={About}></Route>
                <Route path="*" component={Missing}></Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
