import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { message } from "antd";
import tokenMethod from "../utils/token";
import { useNavigate } from "react-router-dom";
import PATHS from "../constants/paths";
import { orderService } from "../services/orderService";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showedModal, setShowedModal] = useState("");
  const [profile, setProfile] = useState({});
  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);

  useEffect(() => {
    if (!!tokenMethod.get()?.accessToken) {
      handleGetProfile();
      handleGetProfileCourse();
      handleGetProfilePayment();
    }
  }, []);

  const handleGetProfileCourse = async () => {
    try {
      const res = await orderService.getCourseHistories();
      const orderedCourses = res?.data?.data?.orders || [];
      setCourseInfo(orderedCourses);
    } catch (error) {
      console.log("getCourseHistories error", error);
    }
  };

  const handleGetProfilePayment = async () => {
    try {
      const res = await orderService.getPaymentHistories();
      const payments = res?.data?.data?.orders || [];
      setPaymentInfo(payments);
    } catch (error) {
      console.log("getPaymentHistories error", error);
    }
  };

  const handleShowModal = (modalType) => {
    setShowedModal(modalType || "");
  };

  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowedModal("");
  };

  const handleLogin = async (loginData, callback) => {
    //xử lí payload trước khi call api
    const payload = { ...loginData };
    //xử lí api
    try {
      const res = await authService.login(payload);
      console.log("res", res);

      if (res?.data?.data) {
        const { token: accessToken, refreshToken } = res.data.data || {};

        // store Token vào trong cookies hoặc local storage

        // localStorage.setItem(
        //   "token",
        //   JSON.stringify({
        //     accessToken,
        //     refreshToken,
        //   })
        // );

        tokenMethod.set({
          accessToken,
          refreshToken,
        });

        handleGetProfile();

        // close modal và thông báo thành công
        handleCloseModal();
        message.success("Đăng nhập thành công");
      } else {
        message.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      callback?.();
    }
  };

  const handleRegister = async (registerData, callback) => {
    const { name, email, password } = registerData || {};
    //xử lí payload trước khi call api
    const payload = {
      firstName: name,
      lastName: "",
      email,
      password,
    };
    //xử lí api
    try {
      const res = await authService.register(payload);
      console.log("res", res);
      if (res?.data?.data.id) {
        handleLogin({
          email,
          password,
        });
      } else {
        message.error("Đăng ký thất bại");
      }
    } catch (error) {
      console.log("error", error);
      message.error("Đăng ký thất bại");
    } finally {
      callback?.();
    }
  };

  const handleLogout = () => {
    tokenMethod.remove();
    navigate(PATHS.HOME);
    message.success("Tài khoản đã đăng xuất");
  };

  const handleGetProfile = async () => {
    try {
      const res = await authService.getProfile();
      if (res?.data?.data) {
        setProfile(res.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      const {
        firstName,
        email,
        password,
        facebookURL,
        introduce,
        phone,
        website,
      } = profileData;

      const payload = {
        firstName: firstName,
        lastName: "",
        email,
        password,
        facebookURL,
        introduce,
        phone,
        website,
      };
      const res = await authService.updateProfile(payload);
      if (res?.data?.data?.id) {
        message.success("Cập nhật thông tin thành công");
        handleGetProfile();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        showedModal,
        handleShowModal,
        handleCloseModal,
        handleLogin,
        handleRegister,
        handleLogout,
        profile,
        handleGetProfileCourse,
        handleGetProfilePayment,
        courseInfo,
        paymentInfo,
        handleUpdateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
