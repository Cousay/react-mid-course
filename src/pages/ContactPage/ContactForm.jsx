import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";

const ContactForm = ({ handleFormSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    content: "",
  });

  const [error, setError] = useState({});

  const _onChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const _onSubmit = () => {
    const errorObject = {};

    if (!!!form.name) {
      errorObject.name = "Vui lòng nhập họ và tên";
    }
    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập Email";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng email";
    }

    if (!!!form.phone) {
      errorObject.phone = "Vui lòng nhập số điện thoại";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(form.phone)) {
      errorObject.phone = "Vui lòng nhập số điện thoại thuộc VN";
    }

    if (!!!form.topic) {
      errorObject.topic = "Vui lòng chọn chủ đề";
    }

    if (!!!form.content) {
      errorObject.content = "Vui lòng chọn nội dung";
    }

    setError(errorObject);

    if (Object.keys(errorObject).length > 0) {
      console.log("Submit Error", errorObject);
    } else {
      console.log("Submit Success", form);
      handleFormSubmit?.(form);
    }
  };

  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
      <Input
        name="name"
        label="Họ và Tên"
        required
        placeholder="Họ và Tên"
        error={error.name}
        onChange={_onChange}
      />
      <Input
        name="email"
        label="Email"
        required
        placeholder="Email"
        error={error.email}
        onChange={_onChange}
      />
      <Input
        name="phone"
        label="Phone"
        required
        placeholder="Phone"
        error={error.phone}
        onChange={_onChange}
      />

      <Input
        name="topic"
        label="Chủ đề cần hỗ trợ"
        required
        error={error.topic}
        value={form.topic}
        onChange={_onChange}
        renderInput={(inputProps) => {
          return (
            <Select
              options={[
                { value: "", label: "--" },
                { value: "react", label: "ReactJS" },
                { value: "responsive", label: "Web Responsive" },
              ]}
              {...inputProps}
            />
          );
        }}
      />

      <Input
        name="content"
        label="Nội Dung"
        required
        error={error.content}
        value={form.content}
        onChange={_onChange}
        renderInput={(inputProps) => {
          return <TextArea {...inputProps} />;
        }}
      />

      <div className="btncontrol">
        <Button variant="primary" onClick={_onSubmit}>
          {" "}
          Gửi{" "}
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
