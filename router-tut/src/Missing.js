import { Link } from 'react-router-dom';

const Missing = () => {
    return (
        <main>
            <h2>Page not found</h2>
            <p>Well, that's dissappointing</p>
            <p>
                <Link to="/">Visit our homepage</Link>
            </p>
        </main>
    );
};

export default Missing;
