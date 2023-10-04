import { useEffect, useState } from "react";
import Button from "../../components/Button";
import FormOrder from "./FormOrder";
import InfoOrder from "./InfoOrder";
import PaymentOrder from "./PaymentOrder";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../utils/format";
import useMutation from "../../hooks/useMutation";
import { courseService } from "../../services/courseService";
import { ROLES } from "../../constants/roles";
import useForm from "../../hooks/useForm";
import { useAuthContext } from "../../context/AuthContext";
import { regrexRule, requireRule } from "../../utils/validate";
import { message } from "antd";
import { orderService } from "../../services/orderService";
import PATHS from "../../constants/paths";

const CourseOrderPage = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const { data: courseDetailData, execute: executeCourseDetail } = useMutation(
    courseService.getCourseBySlug
  );

  useEffect(() => {
    if (courseSlug) executeCourseDetail(courseSlug, {});
  }, [courseSlug]);

  const { teams, price, tags } = courseDetailData?.data || {};

  const {
    profile,
    courseInfo,
    handleGetProfileCourse,
    handleGetProfilePayment,
  } = useAuthContext();


  const isAlreadyOrder =
    courseInfo?.some((item) => item?.course?.slug === courseSlug) || false;

  // Child props
  const InfoOrderProps = {
    ...courseDetailData?.data,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLES.teacher)) || {},
    price: formatCurrency(price),
  };

  const {
    firstName: profileName,
    email: profileEmail,
    phone: profilePhone,
  } = profile || {};

  // Handle profile form
  const { form, register, validate, setForm } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      type: "",
    },
    {
      name: [requireRule("Vui lòng nhập tên")],
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      phone: [
        requireRule("Vui lòng nhập phone"),
        regrexRule("phone", "Vui lòng nhập đúng định dạng phone"),
      ],
      type: [requireRule("Vui lòng chọn hình thức học")],
    }
  );

  useEffect(() => {
    if (isAlreadyOrder && courseInfo?.length > 0) {
      const orderedCourse = courseInfo?.find(
        (item) => item?.course?.slug === courseSlug
      );
      setForm({
        name: orderedCourse.name || "",
        email: profileEmail || "",
        phone: orderedCourse.phone || "",
        type: orderedCourse.type || "",
      });
      setPaymentMethod(orderedCourse.paymentMethod);
    } else {
      setForm({
        name: profileName || "",
        email: profileEmail || "",
        phone: profilePhone || "",
        type: "",
      });
    }
  }, [profileName, profileEmail, profilePhone, isAlreadyOrder, courseInfo]);

  //Handle Payment
  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentMethodChange = (payment) => {
    setPaymentMethod(payment);
  };

  const { loading: orderLoading, execute: orderCourse } = useMutation(
    orderService.orderCourse
  );

  const _onOrder = () => {
    const profileError = validate();

    if (Object.keys(profileError).length > 0) {
      console.log("profileError", profileError);
    } else {
      if (paymentMethod) {
        const payload = {
          name: form?.name,
          phone: form?.phone,
          course: courseDetailData?.data?.id,
          type: form.type,
          paymentMethod,
        };
        orderCourse(payload, {
          onSuccess: async () => {
            message.success("Đăng ký thành công!");
            await handleGetProfileCourse();
            await handleGetProfilePayment();
            navigate(PATHS.PROFILE.MY_COURSE);
          },
          onFail: () => {
            message.error("Đăng ký thất bại!");
          },
        });
      } else {
        message.error("Vui lòng chọn phương thức thanh toán");
      }
    }
  };

  return (
    <div>
      {" "}
      <main className="mainwrapper --ptop">
        <section className="sccourseorder">
          <div className="container small">
            <InfoOrder {...InfoOrderProps} />
            <FormOrder
              register={register}
              types={tags || []}
              disabled={isAlreadyOrder}
            />
            <PaymentOrder
              handleChange={handlePaymentMethodChange}
              selectedPayment={paymentMethod}
              disabled={isAlreadyOrder}
            />
            {/* addclass --processing khi bấm đăng ký */}
            <Button
              onClick={_onOrder}
              disabled={isAlreadyOrder}
              loading={orderLoading}
              style={{ width: "100%" }}
            >
              <span>
                {isAlreadyOrder
                  ? "Đã đăng ký khoá học này"
                  : "Đăng ký khoá học"}
              </span>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CourseOrderPage;
