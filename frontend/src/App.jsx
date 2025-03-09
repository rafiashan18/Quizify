import Home from './screens/userScreens/Home'
import PublicLayout from './layout/PublicLayout';
import AboutUs from './screens/userScreens/AboutUs';
import ContactUs from './screens/userScreens/ContactUs';
import FeaturePage from './screens/userScreens/FeaturePage';
import SignUpScreen from './screens/userScreens/SignUpScreen';
import LoginScreen from './screens/userScreens/LoginScreen';

// user side 
// import Sidebar from './components/userComponents/Sidebar';
import UserLayout from './layout/UserLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
// import Dashboard from './screens/dashboards/userDashboard/Dashboard';
// import Dashboard from './screens/dashboards/userDashboardScreens/UserDashboardScreen'
// import UserSettingsPage from './screens/UserSettingsPage'
// import DisplayAllQuizesScreen from './screens/dashboards/userDashboardScreens/DisplayAllQuizesScreen';
import DisplayAllQuizesScreen from './screens/dashboards/userDashboardScreens/DisplayAllQuizesScreen';
import QuizHistory from './components/userComponents/QuizHistory';
import QuizOverviewScreen from './screens/dashboards/userDashboardScreens/QuizOverviewScreen';
// import PlayQuizScreen from './screens/dashboards/userDashboardScreens/PlayQuizScreen';

// AOS 
import 'aos/dist/aos.css'; 
import AOS from 'aos'; 

// react Toastify
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//Admin 
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './screens/dashboards/adminDashboardScreens/AdminDashboard';
import ManageUsersScreen from './screens/dashboards/adminDashboardScreens/ManageUsersScreen';
import DisplayQuizesScreen from './screens/dashboards/adminDashboardScreens/DisplayQuizesScreen';
import CreateQuizScreen from './screens/dashboards/adminDashboardScreens/CreateQuizScreen';

//Protected Route
import ProtectedRoute from './components/commonComponents/ProtectedRoute';
import QuizDetailsScreens from './screens/dashboards/adminDashboardScreens/QuizDetailsScreen';
import ProfileScreen from './screens/dashboards/adminDashboardScreens/ProfileScreen';
import PlayQuizScreen from './screens/dashboards/userDashboardScreens/PlayQuizScreen';
import UserDashboardScreen from './screens/dashboards/userDashboardScreens/UserDashboardScreen';

const ScrollToTop = () => {
  const { pathname, key } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, key]);

  return null;
};



function App() {

  useEffect(
    () => {
      AOS.init();
      AOS.refresh()
      
    }, []
  )

  return (
    <>

      <Router>
        <ScrollToTop />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="features" element={<FeaturePage />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Route>

          {/* User Routes */}

          <Route path="/user" element={
            <ProtectedRoute requiredRole="user">
              <UserLayout />
             </ProtectedRoute> 
          }>
            
            <Route index element={<UserDashboardScreen />} />
            <Route path="available-quizes" element={<DisplayAllQuizesScreen />} />
            <Route path="quiz-history" element={<QuizHistory />} />
            <Route path="play-quiz/:id" element={<QuizOverviewScreen />} />
            <Route path="play-start/:id" element={<PlayQuizScreen />} />
            <Route path="/user/settings" element={<ProfileScreen />} />

          </Route>

          {/* Admin Routes */}
          <Route path="/admin"
         
           element={
            <ProtectedRoute requiredRole="admin">
           <AdminLayout />
            </ProtectedRoute >
           }>

            <Route index element={<AdminDashboard />} />
            <Route path='/admin/create-quiz' element={< CreateQuizScreen />} />
            <Route path='/admin/edit-quiz/:id' element={< QuizDetailsScreens />} />
            <Route path='/admin/view-users' element={<ManageUsersScreen />} />
            <Route path='/admin/display-quizes' element={<DisplayQuizesScreen />} />
            <Route path='/admin/settings' element={<ProfileScreen />} />

          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
