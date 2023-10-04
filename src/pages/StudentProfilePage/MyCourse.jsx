import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Empty } from "antd";
import CourseItem from "../../components/CourseItem";
import { COURSE_ITEM_TYPE } from "../../constants/general";

const MyCourse = () => {
  const { courseInfo } = useAuthContext();
  return (
    <div className="tab__content">
      <div className="courses__list">
        {!!!courseInfo.length && (
          <Empty
            description="Không tìm thấy dữ liệu"
            style={{ margin: "0 auto" }}
          />
        )}
        {!!courseInfo.length &&
          courseInfo.map((item, index) => (
            <CourseItem
              key={item.id || new Date().getTime() + index}
              type={COURSE_ITEM_TYPE.normal}
              {...item?.course}
            />
          ))}
      </div>
    </div>
  );
};

export default MyCourse;
