import React from 'react';
import CarouselSection from '../sections/Carousel';
import OurStorySection from '../sections/OurStory';
import DetailsSection from '../sections/Details';
import RegistrySection from '../sections/Registry';
import RSVPSection from '../sections/RSVP/RSVP';

const Home: React.FC = () => {
    return (
        <>
            <CarouselSection />
            <OurStorySection />
            <DetailsSection />
            <RegistrySection />
            <RSVPSection />
        </>
    );
};

export default Home;