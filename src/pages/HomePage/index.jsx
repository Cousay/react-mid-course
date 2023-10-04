import CallRegister from "./CallRegister";
import CourseComing from "./CourseComing";
import Courses from "./Courses";
import Teacher from "./Teacher";
import FAQ from "./FAQ";
import Featured from "./Featured";
import Gallery from "./Gallery";
import Hero from "./Hero";
import Testimonial from "./Testimonial";
import axios from "axios";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { teamService } from "../../services/teamService";
import { questionService } from "../../services/questionService";
import { galleryService } from "../../services/galleryService";

const HomePage = () => {
  //COURSES HANDLING
  const { data: coursesData, loading: coursesLoading } = useQuery(
    courseService.getCourses
  );

  const courses = coursesData?.courses || [];

  const comingCourses = courses.filter((course) => {
    return course?.startDate && new Date(course.startDate) > new Date();
  });

  //TEAM HANDLING
  const { data: teamsData, loading: teamsLoading } = useQuery(
    teamService.getTeams
  );

  const teams = teamsData?.teams || [];

  const { data: questionsData, loading: questionsLoading } = useQuery(
    questionService.getQuestions
  );

  const questions = questionsData?.questions || [];

  const { data: galleriesData, loading: galleriesLoading } = useQuery(
    galleryService.getGalleries
  );
  const galleries = galleriesData?.galleries?.[0]?.images || [];

  return (
    <div>
      <main className="mainwrapper">
        <Hero />
        <CourseComing courses={comingCourses} loading={coursesLoading} />
        <Courses courses={courses} loading={coursesLoading} />
        <Teacher teachers={teams} loading={teamsLoading} />
        <Featured />

        <Testimonial />

        <FAQ questions={questions} loading={questionsLoading} />
        <Gallery galleries={galleries} loading={galleriesLoading} />
        <CallRegister />
      </main>
    </div>
  );
};

export default HomePage;
