import styled from 'styled-components';
import Section from '../components/Section';
import CarouselImage from '../assets/images/carousel-01.jpg';

const CarouselStyled = styled.div`
    background-image: url(${CarouselImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: 100%;
    width: 100%;
    height: 35rem;
`;

const CarouselSection = () => {
    return (
        <CarouselStyled />
    );
};

export default CarouselSection;