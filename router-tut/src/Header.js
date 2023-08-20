import { FaTabletAlt, FaMobileAlt, FaLaptop } from 'react-icons/fa';

const Header = ({ title, width }) => {
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
