import Section from '../../components/Section';
import Image from '../../components/Image';
import NamesSVG from '../../assets/vector/names.svg';
import HeaderNav from './HeaderNav';
import FloralPatternPNG from '../../assets/images/floral-pattern.png';

const Header = () => {
    return (
        <Section
            as='header'
            centered
            backgroundImage={FloralPatternPNG}
            gap='2rem'
        >
            <Image src={NamesSVG} $height='10rem' />
            <HeaderNav />
        </Section>
    );
};

export default Header;