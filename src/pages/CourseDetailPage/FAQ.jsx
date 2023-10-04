import React, { useEffect, useState } from "react";
import Accordion from "../../components/Accordion";

const FAQ = ({ questions = [], loading = false }) => {
  const modifiedQuestions =
    questions.map((item) => {
      const { id, question, answer } = item || {};
      return {
        id,
        title: question,
        content: answer,
      };
    }) || [];

  const commonQuestions = modifiedQuestions.slice(0, 6);
  const otherQuestions = modifiedQuestions.slice(6);

  return (
    <section className="faq --scpadding">
      <div className="container">
        <div className="faq__inner">
          <div className="heading --noline --center">
            <h2 className="heading__title title --t2">
              Câu hỏi <span className="color--primary">thường gặp</span>
            </h2>
          </div>
          <div className="faq__list">
            {!loading && (
              <Accordion data={commonQuestions} label="Thông tin chung" />
            )}
            {!loading && (
              <Accordion data={otherQuestions} label="Đăng ký, thanh toán" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
