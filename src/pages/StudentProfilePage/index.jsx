import { NavLink, Navigate, Outlet } from "react-router-dom";
import tokenMethod from "../../utils/token";
import PATHS from "../../constants/paths";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

const StudentProfilePage = () => {
  if (!!!tokenMethod.get()) {
    return <Navigate to={PATHS.HOME} />;
  }

  const { profile, handleGetProfileCourse, handleGetProfilePayment } =
    useAuthContext();

  const { firstName, email, profileImage, phone, website, introduce } = profile || {};

  useEffect(() => {
    handleGetProfileCourse();
    handleGetProfilePayment();
  }, []);


  return (
    <div>
      {" "}
      <main className="mainwrapper profilepage">
        <div className="container">
          <div className="wrapper">
            <div className="sidebar">
              <div className="sidebar__info">
                <div className="useravatar">
                  <div className="avatar">
                    <div className="img">
                      <img
                        src={
                          profileImage ||
                          "/img/cfd-share-thumbnail-facebook.png"
                        }
                      />
                    </div>
                  </div>
                  <h3 className="title --t3">{firstName ? firstName : ""}</h3>
                </div>
              </div>
              <div className="sidebar__content">
                <h4>Giới thiệu</h4>
                <p className="description">
                 {introduce || "Happy"}
                </p>
                <ul>
                  <li>
                    <img src="/img/icon-mail-outline.svg" alt="icon" />
                    <span>{email ? email : ""}</span>
                  </li>
                  <li>
                    <img src="/img/icon-phone-outline.svg" alt="icon" />
                    <span>{phone}</span>
                  </li>
                  <li>
                    <img src="/img/icon-link.svg" alt="icon" />
                    <a href="#" target="_blank">
                      {website}
                    </a>
                  </li>
                </ul>
                <div className="social">
                  <a href="#">
                    <img src="/img/icon-fb-footer.svg" />
                  </a>
                  <a href="#">
                    <img src="/img/icon-linkedin-ft.svg" />
                  </a>
                  <a href="#">
                    <img src="/img/icon-ytb-ft.svg" />
                  </a>
                </div>
              </div>
            </div>
            <div className="tabwrap">
              <div className="tab">
                <div className="tab__title">
                  <NavLink end to={PATHS.PROFILE.INDEX}>
                    Thông tin cá nhân
                  </NavLink>
                  <NavLink to={PATHS.PROFILE.MY_COURSE}>
                    Khóa học của tôi
                  </NavLink>
                  <NavLink to={PATHS.PROFILE.MY_PAYMENT}>
                    Lịch sử thanh toán
                  </NavLink>
                </div>
                <div className="tab__content">
                  <Outlet />
                  {/* Thông tin cá nhân */}
                  {/* <MyInfo />

                  {/* Khoá học của tôi */}
                  {/* <MyCourse /> */}

                  {/* Lịch sử thanh thánh */}
                  {/* <MyPayment /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfilePage;
