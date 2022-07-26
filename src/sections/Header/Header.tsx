import Section from '../../components/Section';
import Image from '../../components/Image';
import NamesSVG from '../../assets/vector/names.svg';
import HeaderNav from './HeaderNav';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    return (
        <Section
            centered
            gap='2rem'
        >
            <Link to='/'>
                <Image src={NamesSVG} $height='10rem' />
            </Link>
            {location.pathname === '/' && <HeaderNav />}
        </Section>
    );
};

export default Header;