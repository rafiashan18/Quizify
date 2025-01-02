
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route , ScrollRestoration} from 'react-router-dom';
import PublicLayout from './layout/publicLayout';
import Explore from './pages/Explore';
import AboutUs from './pages/AboutUs';
import SignUpPage from './components/checkAuth/SignUp';
import Login from './components/checkAuth/Login';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ContactUs from './pages/ContactUs';
import FeaturePage from './pages/FeaturePage';

const ScrollToTop = () => {
  const { pathname, key } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, key]); 

  return null;
};

function App() {

  return (
    <>

      <Router>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="features" element={<FeaturePage />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Route>

          {/* User Routes */}
          {/* <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
        </Route> */}

          {/* Admin Routes */}
          {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route> */}
        </Routes>
      </Router>

    </>
  )
}

export default App
