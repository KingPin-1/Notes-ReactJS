import { useStoreState } from 'easy-peasy';

const Footer = () => {
    const postCount = useStoreState((state) => state.postCount);
    return (
        <footer className="Footer">
            <p>{postCount} Notes</p>
            <p className="footer-detail">
                Created with 💓 by{' '}
                <a
                    className="footerLink"
                    href="https://github.com/KingPin-1/"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Mohd Athar
                </a>
            </p>
        </footer>
    );
};

export default Footer;
