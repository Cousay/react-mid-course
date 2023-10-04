import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseOrderPage from "./pages/CourseOrderPage";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetailPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import PaymentPage from "./pages/PaymentPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import Page404 from "./pages/404Page";
import PATHS from "./constants/paths";
import PrivateRoute from "./components/PrivateRoute";
import MyInfo from "./pages/StudentProfilePage/MyInfo";
import MyCourse from "./pages/StudentProfilePage/MyCourse";
import MyPayment from "./pages/StudentProfilePage/MyPayment";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        {/* <HomePage /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="course" element={<CoursesPage />} />
          <Route path="course/:courseSlug" element={<CourseDetailPage />} />
          <Route path="course-order/:courseSlug" element={<CourseOrderPage />} />

          <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            <Route path={PATHS.COURSE.ORDER} element={<CourseOrderPage />} />
            <Route path={PATHS.PROFILE.INDEX} element={<StudentProfilePage />}>
              <Route index end element={<MyInfo />} />
              <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
              <Route path={PATHS.PROFILE.MY_PAYMENT} element={<MyPayment />} />
            </Route>
          </Route>

          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:blogId" element={<BlogDetail />} />

          <Route path="payment-method" element={<PaymentPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="privacy" element={<PrivacyPage />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
