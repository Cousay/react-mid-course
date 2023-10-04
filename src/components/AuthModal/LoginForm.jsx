import useForm from "../../hooks/useForm";
import React, { useState } from "react";
import { regrexRule, requireRule } from "../../utils/validate";
import { useAuthContext } from "../../context/AuthContext";
import Input from "../Input";
import Button from "../Button";
import { message } from "antd";
import { MODAL_TYPE } from "../../constants/general";
import ComponentLoading from "../ComponentLoading";

const LoginForm = () => {

  // hal@gmail.com 123456

  const { handleShowModal, handleLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { form, register, validate } = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      password: [requireRule("Vui lòng nhập mật khẩu")],
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
      handleLogin?.(form, () => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    }
  };

  return (
    <div>
      <div
        className="modal__wrapper-content mdlogin active"
        style={{ position: "relative" }}
      >
        {loading && <ComponentLoading />}
        <div className="form__bottom">
          <p>Bạn chưa có tài khoản?</p>
          <div
            className="color--primary btnmodal"
            data-modal="mdregister"
            onClick={() => handleShowModal(MODAL_TYPE.register)}
          >
            <strong>Đăng ký</strong>
          </div>
        </div>

        <form onSubmit={_onSubmit} className="form">
          <Input
            label="Email"
            placeholder="Email"
            required
            {...register("email")}
          />
          <Input
            label="Mật Khẩu"
            placeholder="Password"
            required
            type="password"
            {...register("password")}
          />

          <Button className="form__btn-register" type="submit">
            Đăng nhập
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
