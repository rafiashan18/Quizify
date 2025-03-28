import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
//public / client
import Home from './screens/userScreens/Home'
import PublicLayout from './layout/PublicLayout';
import AboutUs from './screens/userScreens/AboutUs';
import ContactUs from './screens/userScreens/ContactUs';
import FeaturesScreen from './screens/userScreens/FeaturesScreen';
import SignUpScreen from './screens/userScreens/SignUpScreen';
import LoginScreen from './screens/userScreens/LoginScreen';

// user side 
import UserLayout from './layout/UserLayout';
import DisplayAllQuizesScreen from './screens/dashboards/userDashboardScreens/DisplayAllQuizesScreen';
import QuizHistoryScreen from './screens/dashboards/userDashboardScreens/QuizHistoryScreen';
import QuizOverviewScreen from './screens/dashboards/userDashboardScreens/QuizOverviewScreen';

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
import MessageScreen from './screens/dashboards/adminDashboardScreens/MessageScreen';

//Protected Route
import ProtectedRoute from './components/Common/ProtectedRoute';
import QuizDetailsScreens from './screens/dashboards/adminDashboardScreens/QuizDetailsScreen';
import ProfileScreen from './screens/dashboards/adminDashboardScreens/ProfileScreen';
import PlayQuizScreen from './screens/dashboards/userDashboardScreens/PlayQuizScreen';
import UserDashboardScreen from './screens/dashboards/userDashboardScreens/UserDashboardScreen';
import ViewAllCategoryQuizesScreen from './screens/dashboards/userDashboardScreens/ViewAllCategoryQuizesScreen';
import CheckoutScreen from './screens/dashboards/userDashboardScreens/CheckoutScreen';
import PaymentSuccessfulScreen from './screens/dashboards/userDashboardScreens/PaymentSuccessfulScreen';

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
            <Route path="features" element={<FeaturesScreen />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/payment-success" element={<PaymentSuccessfulScreen />} />

          </Route>

          {/* User Routes */}

          <Route path="/user" element={
            <ProtectedRoute requiredRole="user">
              <UserLayout />
             </ProtectedRoute> 
          }>
            
            <Route index element={<UserDashboardScreen/>} />
            <Route path="available-quizes" element={<DisplayAllQuizesScreen />} />
            <Route path="view-category-quizes/:category/:type" element={<ViewAllCategoryQuizesScreen />} />
            <Route path="quiz-history" element={<QuizHistoryScreen />} />
            <Route path="play-quiz/:id" element={<QuizOverviewScreen />} />
            <Route path="play-start/:id" element={<PlayQuizScreen />} />
            <Route path="/user/settings" element={<ProfileScreen />} />
            <Route path="purchase-quiz/:quizId/:amount" element={<CheckoutScreen/>}/>
            {/* <Route path="payment-success" element={<PaymentSuccessfulScreen/>}/> */}
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
            <Route path='/admin/messages' element={<MessageScreen />} />

          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
