import Carousel, { CarouselImage } from '../components/Carousel';
import CarouselImg1 from '../assets/images/carousel-01.jpg';
import CarouselImg2 from '../assets/images/carousel-02.jpg';
import CarouselImg3 from '../assets/images/carousel-03.jpg';
import { useMediaQuery } from 'react-responsive';

const CarouselSection = () => {
    const isMobileDevice = useMediaQuery({
        query: '(max-width: 1000px)',
    });
    return (
        <Carousel autoplay height='40rem' width='100%' slides={[
            <CarouselImage $fullWidth={isMobileDevice} src={CarouselImg2} />,
            <CarouselImage $fullWidth={isMobileDevice} src={CarouselImg1} />,
            <CarouselImage $fullWidth={isMobileDevice} src={CarouselImg3} />,
        ]} />
    );
};

export default CarouselSection;