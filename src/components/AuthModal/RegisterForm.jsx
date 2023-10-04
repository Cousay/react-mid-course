import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import { regrexRule, requireRule } from "../../utils/validate";
import { message } from "antd";
import { Link } from "react-router-dom";
import Button from "../Button";
import PATHS from "../../constants/paths";
import Input from "../Input";
import { MODAL_TYPE } from "../../constants/general";
import ComponentLoading from "../ComponentLoading";

const RegisterForm = () => {
  const { handleShowModal, handleCloseModal, handleRegister } =
    useAuthContext();
  const [loading, setLoading] = useState(false);
  const { form, register, validate } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    {
      name: [requireRule("Vui lòng nhập họ và tên")],
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      password: [requireRule("Vui lòng nhập mật khẩu")],
      confirmPassword: [
        requireRule("Vui lòng xác nhận mật khẩu"),
        (value, values) => {
          if (values.password && value !== values.password) {
            return "Xác nhận mật khẩu không đúng";
          }
          return false;
        },
      ],
    }
  );
  const _onSubmit = (e) => {
    e.preventDefault();
    const errObj = validate();
    if (Object.keys(errObj)?.length > 0) {
      console.log("Submit error", errObj);
    } else {
      setLoading(true);
      console.log("Submit success", form);

      if (typeof handleRegister === "function") {
        handleRegister?.(form, () => {
          setTimeout(() => {
            setLoading(false);
            message.success("Đăng ký thành công");
          }, 1000);
        });
      }
    }
  };

  return (
    <div
      className="modal__wrapper-content mdregister active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdlogin"
          onClick={() => handleShowModal(MODAL_TYPE.login)}
        >
          <strong>Đăng nhập</strong>
        </div>
      </div>
      <form onSubmit={_onSubmit} className="form">
        <Input
          label="Họ và tên"
          placeholder="Họ và tên"
          required
          {...register("name")}
        />
        <Input
          label="Email"
          placeholder="Email"
          required
          {...register("email")}
        />
        <Input
          label="Mật khẩu"
          placeholder="Mật khẩu"
          required
          type="password"
          {...register("password")}
        />
        <Input
          label="Xác nhận mật khẩu"
          placeholder="Xác nhận mật khẩu"
          required
          type="password"
          {...register("confirmPassword")}
        />
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý{" "}
          <Link
            className="color--primary"
            to={PATHS.PRIVACY}
            onClick={handleCloseModal}
          >
            Chính Sách Điều Khoản
          </Link>{" "}
          của CFD
        </p>
        <Button className="form__btn-register" type="submit">
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
