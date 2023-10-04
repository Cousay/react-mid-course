import React, { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import { regrexRule, requireRule } from "../../utils/validate";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";

const MyInfo = () => {
  const rules = {
    firstName: [requireRule("Vui lòng nhập tên")],
    email: [
      requireRule("Vui lòng nhập Email"),
      regrexRule("email", "Vui lòng nhập đúng định dạng Email"),
    ],
    phone: [
      requireRule("Vui lòng nhập số điện thoại"),
      regrexRule("phone", "Vui lòng nhập số điện thoại VN"),
    ],
    password: [requireRule("Vui lòng nhập mật khẩu")],
  };

  const { profile, handleUpdateProfile } = useAuthContext();
  const { form, setForm, register, validate } = useForm(
    {
      firstName: "",
      email: "",
      phone: "",
      password: "******",
      facebookURL: "",
      website: "",
      introduce: "",
    },
    rules
  );

  const _onSubmit = (e) => {
    e.preventDefault();
    const errorObject = validate();
    if (Object.keys(errorObject).length > 0) {
      console.log("Submit Error", errorObject);
    } else {
      handleUpdateProfile?.(form);
    }
  };
  useEffect(() => {
    if (profile) {
      setForm({ ...form, ...profile });
    }
  }, [profile]);

  const { firstName, email, profileImage } = profile;

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form action="#" className="form">
        <div className="form-container">
          <Input
            label="Họ và tên"
            required
            placeholder="Họ và tên"
            {...register("firstName")}
          />
          <Input
            label="Số điện thoại"
            required
            placeholder="Số điện thoại"
            {...register("phone")}
          />
        </div>
        <div className="form-container">
          <Input
            label="Email"
            required
            disabled
            placeholder="Email"
            {...register("email")}
          />
          <Input
            label="Mật khẩu"
            required
            disabled
            placeholder="Mật khẩu"
            {...register("password")}
          />
        </div>
        <Input
          label="Facebook URL"
          placeholder="Facebook URL"
          {...register("facebookURL")}
        />
        <Input label="Website" placeholder="Website" {...register("website")} />
        <Input
          label="Giới thiệu bản thân"
          renderInput={(inputProps) => {
            return <TextArea {...inputProps} />;
          }}
          {...register("introduce")}
        />
        <div className="form-group">
          <Button style={{ width: "100%" }} onClick={_onSubmit}>
            Gửi
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyInfo;
