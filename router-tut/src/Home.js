import Feed from './Feed.js';

const Home = ({ posts }) => {
    return (
        <main className="Home">
            {posts.length ? (
                <Feed posts={posts} />
            ) : (
                <p style={{ marginTop: '2rem' }}>No Posts Found</p>
            )}
        </main>
    );
};

export default Home;
