import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Public
import Home from './pages/HomePages/Home'
import PublicLayout from './layout/PublicLayout';
import AboutUs from './pages/HomePages/AboutUs';
import ContactUs from './pages/HomePages/ContactUs';
import FeaturePage from './pages/HomePages/FeaturePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
// user side 
import UserLayout from './layout/UserLayout';
import Dashboard from './pages/UsersidePages/Dashboard';
import ActivityPage from './pages/UsersidePages/ActivityPage';
import LeaderboardPage from './pages/UsersidePages/LeaderboardPage';
import UserSettingsPage from './pages/UsersidePages/UserSettingsPage'

//Admin Side

// AOS 
import 'aos/dist/aos.css'; 
import AOS from 'aos';

const ScrollToTop = () => {
  const { pathname, key } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, key]);

  return null;
};

function App() {

  useEffect(
    ()=>{
      AOS.init();
      AOS.refresh()
    },[]
  )

  return (
    <>

      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="features" element={<FeaturePage />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Route>

          {/* User Routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/user/activity" element={< ActivityPage />} />
            <Route path="/user/leaderboard" element={<LeaderboardPage />} />
            <Route path="/user/settings" element={< UserSettingsPage />} />
          </Route>

          {/* Admin Routes */}
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
            <Route path="/user/quiz-list" element={< QuizList />} />
            <Route path='/user/quiz-form/' element={<QuizCreator/>}/>
            <Route path='/user/quiz-form/:id' element={<QuizCreator/>}/>
        </Route> */}
        </Routes>
      </Router>

    </>
  )
}

export default App
