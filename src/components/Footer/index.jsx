import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="content">
            <div className="content-item">
              <h3 className="label">Thông tin</h3>
              <ul>
                <li>
                  <Link to={PATHS.ABOUT}>Về CFD Circle</Link>
                </li>
                <li>
                  <Link to={PATHS.COURSE}>Khóa học</Link>
                </li>
                <li>
                  <Link to={PATHS.BLOG}>Bài viết</Link>
                </li>
              </ul>
            </div>
            <div className="content-item">
              <h3 className="label">Hỗ trợ</h3>
              <ul>
                <li>
                  <Link to={PATHS.CONTACT}>Trung tâm hỗ trợ</Link>
                </li>
                <li>
                  <Link to={PATHS.PAYMENT}>Phương thức thanh toán</Link>
                </li>
                <li>
                  <Link to={PATHS.PRIVACY}>Chính sách và điều khoản</Link>
                </li>
              </ul>
            </div>
            <div className="content-item">
              <h3 className="label">Kết nối</h3>
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/groups/cfdteam"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i>
                      <img src="/img/icon-cfd-footer.svg" />
                    </i>
                    <span>Cộng đồng</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/cfdcircle"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i>
                      <img src="/img/icon-fb-footer.svg" />
                    </i>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/cfdcircle"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i>
                      <img src="/img/icon-ytb-ft.svg" />
                    </i>
                    <span>Youtube</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="content-item">
              <h3 className="label">Liên hệ</h3>
              <ul>
                <li>
                  <a
                    href="https://goo.gl/maps/RnCAPv3CBjUgTUFd8"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i>
                      <img src="/img/icon-address.svg" />
                    </i>
                    <span>
                      666/46/29 Ba Tháng Hai, phường 14, quận 10, TPHCM
                    </span>
                  </a>
                </li>
                <li>
                  <a href="tel:0989596913">
                    <i>
                      <img src="/img/icon-phone.svg" />
                    </i>
                    <span>(+84) 98 9596 913</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@cfdcircle.vn">
                    <i>
                      <img src="/img/icon-mail.svg" />
                    </i>
                    <span>info@cfdcircle.vn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="bottom">
            <div className="copyright">
              <img src="/img/icon-footer-copy.svg" />
              <span>© 2023 CFD Circle</span>
            </div>
            <a href="./" target="_blank" className="logobct">
              <img src="/img/logo-bo-cong-thuong.png" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
