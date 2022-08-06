import GlobalStyle from './styles/GlobalStyle.styled';
import ResetStyle from './styles/Reset.styled';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import Header from './sections/Header/Header';
import Home from './pages/Home';
import Admin from './pages/Admin/Admin';
import Footer from './sections/Footer';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AdminContextProvider } from './contexts/AdminContext';

function App() {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AdminContextProvider>
          <Router basename={process.env.PUBLIC_URL}>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/admin' element={<Admin />} />
              </Routes>
            <Footer />
          </Router>
        </AdminContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
