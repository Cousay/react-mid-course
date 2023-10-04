import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import CoursePaymentItem from "../../components/CoursePaymentItem";
import { Empty } from "antd";

const MyPayment = () => {
  const { paymentInfo } = useAuthContext();
  console.log("paymentInfo", paymentInfo);

  return (
    <div className="tab__content-item" style = {{display: "block"}}>
      {!!!paymentInfo.length && (
        <Empty
          description="Không tìm thấy dữ liệu"
          style={{ margin: "0 auto" }}
        />
      )}
      {!!paymentInfo.length &&
        paymentInfo.map((item, index) => (
          <CoursePaymentItem
            key={item.id || new Date().getTime() + index}
            {...item}
            {...item.course}
          />
        ))}
    </div>
  );
};

export default MyPayment;
