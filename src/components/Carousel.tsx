import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

interface CarouselWrapperProps {
    $width: string;
    $height: string;
    $backgroundColor?: string;
};

const CarouselWrapper = styled.div<CarouselWrapperProps>`
    width: 100%;
    max-width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    position: relative;
    overflow: hidden;
    user-select: none;
`;

interface CarouselSlideProps {
    $currentSlide: number;
    $index: number;
    $width: string;
    $roundedEdges?: boolean;
};

const CarouselSlide = styled.div<CarouselSlideProps>`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: ${({ $width }) => $width};
    height: 100%;
    position: absolute;
    ${({ $roundedEdges }) => $roundedEdges && css`
        overflow: hidden;
        border-radius: .5rem;
    `};
    transform: ${({ $currentSlide, $index }) => `translateX(${100 * ($index - $currentSlide)}%)`};
    transition: all 0.5s;
`;

interface CarouselImageProps {
    $fullWidth?: boolean;
};

export const CarouselImage = styled.img<CarouselImageProps>`
    height: 100%;
    ${({ $fullWidth }) => $fullWidth && css`
        width: 100%;
        object-fit: cover;  
    `};
    user-select: none;
    pointer-events: none;
`;

interface CarouselButtonProps {
    $direction: 'left' | 'right';
};

const CarouselButtonWrapper = styled.div<CarouselButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    position: absolute;
    background-color: white;
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    opacity: 50%;
    ${({ $direction }) => $direction === 'left' && css`
        left: 1rem;
    `};
    ${({ $direction }) => $direction === 'right' && css`
        right: 1rem;
    `};
    top: 50%;
    transform: translateY(-50%);
    padding: 1rem;
    z-index: 999;
    &:hover {
        cursor: pointer;
    };
`;

interface CarouselProps {
    height?: string;
    width?: string;
    slides: React.ReactNode[];
    arrows?: boolean;
    autoplay?: boolean;
    interval?: number;
    roundedEdges?: boolean;
    backgroundColor?: string;
};

const Carousel: React.FC<CarouselProps> = ({ slides, interval, backgroundColor, roundedEdges, width, autoplay, height, arrows }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const incrementSlide = () => {
        setCurrentSlide((current) => {
            const maxIndex = slides.length - 1;
            if (current < maxIndex) return current + 1;
            else if (current === maxIndex) return 0;
            else return current;
        });
    };

    const decrementSlide = () => {
        setCurrentSlide((current) => {
            const maxIndex = slides.length - 1;
            if (current > 0) return current - 1;
            else if (current === 0) return maxIndex;
            else return current;
        });
    };

    useEffect(() => {
        if (autoplay) {
            const timer = setInterval(() => {
                incrementSlide();
            }, interval || 5000);
    
            return () => {
                clearInterval(timer);
            };
        };
        // eslint-disable-next-line
    }, [autoplay, interval, currentSlide]);

    return (
        <CarouselWrapper $backgroundColor={backgroundColor} $height={height || '30rem'} $width={width || '800px'}>
            {arrows && <CarouselButtonWrapper $direction='left' onClick={() => decrementSlide()}>
                <FontAwesomeIcon icon={faCaretLeft} />
            </CarouselButtonWrapper>}
            {slides.map((slide, index) => {
                return (
                    <CarouselSlide $roundedEdges={roundedEdges} $width={width || '800px'} key={`slide-${index}`} $index={index} $currentSlide={currentSlide}>
                        {slide}
                    </CarouselSlide>
                );
            })}
            {arrows && <CarouselButtonWrapper $direction='right'  onClick={() => incrementSlide()}>
                <FontAwesomeIcon icon={faCaretRight} />
            </CarouselButtonWrapper>}
        </CarouselWrapper>
    );
};

export default Carousel;