import Header from "../../components/Header";
import PageLoading from "../../components/PageLoading";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MainContextProvider from "../../context/MainContext";
import Overlay from "../../components/Overlay";
import AuthModal from "../../components/AuthModal";
import AuthContextProvider from "../../context/AuthContext";

const MainLayout = ({ children }) => {
  return (
    <MainContextProvider>
      <AuthContextProvider>
        <PageLoading />
        <Header />
        <Navbar />
        <Overlay />

        {children}

        <Footer />
        <AuthModal />
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
