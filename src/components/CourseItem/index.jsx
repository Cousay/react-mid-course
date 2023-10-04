import React from "react";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { ROLES } from "../../constants/roles";
import { formatDate } from "../../utils/format";
import Button from "../Button";
import { COURSE_ITEM_TYPE } from "../../constants/general";

const CourseItem = ({
  type = COURSE_ITEM_TYPE.normal,
  image,
  slug,
  name,
  teams,
  startDate,
  tags,
}) => {
  const teacherInfo = teams?.find((item) => item.tags.includes(ROLES.teacher));

  const detailPath = PATHS.COURSE.INDEX + `/${slug}`;
  const orderPath = "/course-order" + `/${slug}`;

  if (type === COURSE_ITEM_TYPE.normal) {
    return (
      <div className="courses__list-item">
        <div className="img">
          <Link to={detailPath}>
            <img src={image} alt="Khóa học CFD" className="course__thumbnail" />
            <span className="course__img-badge badge">Offline | Online</span>
          </Link>
        </div>
        <div className="content">
          <p className="label">Front-End</p>
          <h3 className="title --t3">
            <Link to={detailPath}>Frontend Newbie</Link>
          </h3>
          <div className="content__info">
            <div className="user">
              <div className="user__img">
                <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
              </div>
              <p className="user__name">Trần Nghĩa</p>
            </div>
            <div className="price">
              <strong>4.500.000đ</strong>
            </div>
          </div>
          <div className="content__action">
            <Link to={orderPath} className="btn btn--primary">
              Đăng ký ngay
            </Link>
            <Link to={orderPath} className="btn btn--default">
              <img src="/img/icon-paper.svg" alt="icon paper" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="coursecoming__item">
      <div className="coursecoming__item-img">
        <Link to={detailPath}>
          <img src={image || ""} alt="Khóa học sắp ra mắt CFD" />
        </Link>
      </div>
      <div className="coursecoming__item-content">
        <p className="category label">Front-end</p>
        <h2 className="title --t2">
          <Link to={detailPath}>{name || ""}</Link>
        </h2>

        {teacherInfo?.id && (
          <div className="user">
            <div className="user__img">
              <img src={teacherInfo.image || ""} alt="Avatar teacher" />
            </div>
            <p className="user__name">{teacherInfo.name || ""} </p>
          </div>
        )}
        <div className="info">
          {startDate && (
            <div className="labeltext">
              <span className="label --blue">Ngày khai giảng</span>
              <p className="title --t2">{formatDate(startDate)}</p>
            </div>
          )}
          {tags?.length > 0 && (
            <div className="labeltext">
              <span className="label --blue">Hình thức học</span>
              <p className="title --t2">{tags.join(" | ")}</p>
            </div>
          )}
        </div>
        <div className="btnwrap">
          <Button link={orderPath}>Đăng Ký Học</Button>
          <Button link={detailPath} variant="border">
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
