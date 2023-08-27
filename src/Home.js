import Feed from './Feed.js';

import { useStoreState } from 'easy-peasy';

const Home = ({ fetchError, isLoading }) => {
    const searchResults = useStoreState((state) => state.searchResults);

    return (
        <main className="Home">
            {isLoading && <p className="statusMsg">Loading notes...</p>}
            {!isLoading && fetchError && (
                <p className="statusMsg" style={{ color: 'red' }}>
                    {fetchError}
                </p>
            )}
            {!isLoading &&
                !fetchError &&
                (searchResults.length ? (
                    <Feed posts={searchResults} />
                ) : (
                    <p className="statusMsg">No notes to display!</p>
                ))}
        </main>
    );
};

export default Home;
