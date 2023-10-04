import React from "react";
import { useEffect } from "react";
import { useMainContext } from "../../context/MainContext";

const HeaderHamburger = () => {
  const { isShowNavbar, handleShowNavbar } = useMainContext();

  useEffect(() => {
    if (!isShowNavbar) {
      $("body").removeClass("menu-show");
    } else {
      $("body").addClass("menu-show");
    }
  }, [isShowNavbar]);

  const _toggleMenu = (e) => {
    e.stopPropagation();

    handleShowNavbar(!isShowNavbar);
  };
  return (
    <div
      onClick={_toggleMenu}
      className={`header__humburger ${!isShowNavbar ? "" : "--close"}`}
    >
      <div className="header__humburger-button">
        <span />
        <span />
        <span />
      </div>
      <div className="header__humburger-text">
        <span>Menu</span>
        <span>Đóng</span>
      </div>
    </div>
  );
};

export default HeaderHamburger;
