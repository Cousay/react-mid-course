import { NavLink } from "react-router-dom";

const Navbar = () => {
  // const contextValue = useMainContext();

  // console.log("contextValue", contextValue);

  return (
    <div>
      <nav className="navbar">
        <ul className="navbar__main">
          <li className="navbar__link">
            <NavLink to="/" className="navbar__item ">
              Trang chủ
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to="/about" className="navbar__item">
              Về CFD Circle
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to="/course" className="navbar__item">
              Khóa học
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to="/blog" className="navbar__item">
              Bài viết
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to="/contact" className="navbar__item">
              Liên hệ
            </NavLink>
          </li>
        </ul>
        <div className="navbar__overlay" />
      </nav>
    </div>
  );
};

export default Navbar;
