import { useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm";
import ContactSidebar from "./ContactSidebar";
import ContactTitle from "./ContactTitle";
import { useState } from "react";
import axios from "axios";
import useMutation from "../../hooks/useMutation";
import HomePage from "../HomePage";

const ContactPage = () => {
  const navigate = useNavigate();

  const { execute, data, error, loading } = useMutation((payload) =>
    axios.post("https://cfdcourses.cfdcircle.vn/api/v1/subscribes", payload)
  );

  const handleFormSubmit = async (formData) => {
    const payload = {
      name: formData.name || "",
      title: formData.title || "",
      email: formData.email || "",
      description: formData.content || "",
      phone: formData.phone || "",
    };
    execute?.(payload, {
      onSuccess: () => {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      },
    });
    // try {
    //   const res = axios.post(
    //     "https://cfdcourses.cfdcircle.vn/api/v1/subscribes",
    //     payload
    //   );
    //   console.log("res", res);
    //   if (res.data) {
    //     alert(" thành công ");
    //   }
    // } catch (error) {
    //   console.log("error", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div>
      <main className="mainwrapper contact --ptop">
        <div className="container">
          <ContactTitle />
        </div>
        <div className="contact__content">
          <div className="container">
            <div className="wrapper">
              <ContactSidebar />
              <ContactForm handleFormSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
