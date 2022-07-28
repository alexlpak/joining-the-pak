import styled from 'styled-components';
import CarouselImage01 from '../assets/images/carousel-01.jpg';
import CarouselImage03 from '../assets/images/carousel-03.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';

interface CarouselImageProps {
    $src: string;
};

const CarouselImage = styled.div<CarouselImageProps>`
    background-image: url(${({ $src }) => $src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: 100%;
    height: 50rem;
    width: 100%;
`;

const CarouselSection = () => {
    return (
        <Swiper
            autoplay={{
                delay: 5000
            }}
            loop={true}
            style={{
                width: '100%'
            }}
            modules={[Autoplay]}
        >
            <SwiperSlide>
                <CarouselImage $src={CarouselImage01} />
            </SwiperSlide>
            <SwiperSlide>
                <CarouselImage $src={CarouselImage03} />
            </SwiperSlide>
        </Swiper>
    );
};

export default CarouselSection;