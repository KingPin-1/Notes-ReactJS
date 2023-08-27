import { FaTabletAlt, FaMobileAlt, FaLaptop } from 'react-icons/fa';
import useWindowSize from './hooks/useWindowSize.js';

const Header = ({ title }) => {
    const { width } = useWindowSize();
    return (
        <header className="Header">
            <h3>{title}</h3>
            {width > 768 ? (
                width > 976 ? (
                    <FaLaptop />
                ) : (
                    <FaTabletAlt />
                )
            ) : (
                <FaMobileAlt />
            )}
        </header>
    );
};

export default Header;
