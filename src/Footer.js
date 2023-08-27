import { useStoreState } from 'easy-peasy';

const Footer = () => {
    const postCount = useStoreState((state) => state.postCount);
    return (
        <footer className="Footer">
            <p>{postCount} Notes</p>
            <p className='footer-detail'>Created with 💓 by <span>Mohd Athar</span></p>
        </footer>
    );
};

export default Footer;
