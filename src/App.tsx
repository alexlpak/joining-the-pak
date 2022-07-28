import GlobalStyle from './styles/GlobalStyle.styled';
import ResetStyle from './styles/Reset.styled';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import Header from './sections/Header/Header';
import OurStorySection from './sections/OurStory';
import CarouselSection from './sections/Carousel';
import DetailsSection from './sections/Details';
import RegistrySection from './sections/Registry';
import RSVPSection from './sections/RSVP/RSVP';
import Footer from './sections/Footer';

function App() {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <CarouselSection />
        <OurStorySection />
        <DetailsSection />
        <RegistrySection />
        <RSVPSection />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
