import { Link } from 'react-router-dom';
import DataContext from './context/DataContext';
import { useContext } from 'react';

const Nav = () => {
    const { search, setSearch } = useContext(DataContext);
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
