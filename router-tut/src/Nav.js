import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Nav = () => {
    const posts = useStoreState((state) => state.posts);
    const search = useStoreState((state) => state.search);
    const setSearch = useStoreActions((action) => action.setSearch);
    const setSearchResults = useStoreActions(
        (action) => action.setSearchResults
    );

    useEffect(() => {
        const filteredResults = posts.filter(
            (post) =>
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse());
    }, [posts, search, setSearchResults]);

    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="searchBar">Search Blog&nbsp;</label>
                <input
                    type="text"
                    placeholder="Search Blog"
                    id="searchBar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/post">Post</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
