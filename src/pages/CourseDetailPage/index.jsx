import { useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import useMutation from "../../hooks/useMutation";
import { useEffect } from "react";
import { courseService } from "../../services/courseService";
import { questionService } from "../../services/questionService";
import { formatCurrency, formatDate } from "../../utils/format";
import { ROLES } from "../../constants/roles";
import useDebounce from "../../hooks/useDebounce";
import PageLoading from "../../components/PageLoading";
import HeaderTop from "./HeaderTop";
import HeroSection from "./HeroSection";
import ContentDetailSection from "./ContentDetail";
import Featured from "./Featured";
import FAQ from "./FAQ";
import CoursesSection from "./Courses";

const CourseDetailPage = () => {
  const params = useParams();
  const { courseSlug } = params;
  const { data: questionsData, loading: questionLoading } = useQuery(
    questionService.getQuestions
  );
  const { data: courseData, loading: courseLoading } = useQuery(
    courseService.getCourses
  );
  const {
    data: courseDetailData,
    loading: courseDetailLoading,
    execute,
  } = useMutation(courseService.getCourseBySlug);

  useEffect(() => {
    if (courseSlug) execute(courseSlug || "", {});
  }, [courseSlug]);

  // Modify data
  const questions = questionsData?.questions || [];
  const courses = courseData?.courses || [];
  const orderLink = `/course-order/` + courseSlug;

  const { teams, startDate, price } = courseDetailData?.data || {};
  const modifiedProps = {
    ...courseDetailData?.data,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLES.teacher)),
    startDate: formatDate(startDate || ""),
    price: formatCurrency(price),
    orderLink,
  };

  const apiLoading = courseDetailLoading || questionLoading || courseLoading;

  const pageLoading = useDebounce(apiLoading, 500);

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <div>
      <HeaderTop {...modifiedProps} />
      <main className="mainwrapper coursedetailpage">
        <HeroSection {...modifiedProps} />
        <ContentDetailSection {...modifiedProps} />
        <Featured {...modifiedProps} />
        <FAQ questions={questions} loading={questionLoading} />
        <CoursesSection courses={courses} loading={courseLoading} />
      </main>
    </div>
  );
};

export default CourseDetailPage;
