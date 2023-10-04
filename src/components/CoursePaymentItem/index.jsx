import React from "react";
import { PAYMENT_METHOD_LABELS } from "../../constants/general";
import { formatCurrency, formatDate } from "../../utils/format";

const CoursePaymentItem = ({ paymentMethod, price, updatedAt, title }) => {
  return (
    <div>
      {" "}
      <div className="itemhistory">
        <div className="name">{title}</div>
        <div className="payment">{PAYMENT_METHOD_LABELS[paymentMethod]}</div>
        <div className="date">{formatDate(updatedAt)}</div>
        <div className="money">{formatCurrency(price)} VNĐ</div>
      </div>
    </div>
  );
};

export default CoursePaymentItem;
