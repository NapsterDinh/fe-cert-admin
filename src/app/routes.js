import React from "react";
import EditorTutorial from "./features/ModulePage/EditorTutorial";

//basic page
const LockPage = React.lazy(() => import("./features/basic/Lock"));
const ServerErrorPage = React.lazy(() =>
  import("./features/basic/ServerError")
);
const NotFoundPage = React.lazy(() => import("./features/basic/NotFound"));
const LoginPage = React.lazy(() => import("./features/basic/Login"));

//main page
const Dashboard = React.lazy(() =>
  import("app/features/DashboardPage/DashboardPage")
);
const CoursePage = React.lazy(() =>
  import("app/features/CoursePage/CoursePage")
);
//tutorial
const ModulePage = React.lazy(() =>
  import("app/features/ModulePage/ModulePage")
);
const DetailModule = React.lazy(() =>
  import("app/features/ModulePage/DetailModule")
);
const QuestionPage = React.lazy(() =>
  import("app/features/QuestionPage/QuestionPage")
);
const ExamPage = React.lazy(() => import("app/features/ExamPage/ExamPage"));
const SectionPage = React.lazy(() =>
  import("app/features/SectionPage/SectionPage")
);
const NewExamPage = React.lazy(() =>
  import("app/features/ExamPage/NewExamPage/NewExamPage")
);
const NewSectionPage = React.lazy(() =>
  import("app/features/SectionPage/NewSectionPage/NewSectionPage")
);

const LessonsPage = React.lazy(() =>
  import("app/features/LessonsPage/LessonsPage")
);

const AddNewLessonsPage = React.lazy(() =>
  import("app/features/LessonsPage/AddNewLessonsPage")
);

const ServicePage = React.lazy(() =>
  import("app/features/ServicePage/ServicePage")
);

const StatementPage = React.lazy(() =>
  import("app/features/StatementPage/StatementPage")
);

const UserPage = React.lazy(() =>
  import("app/features/UserPage/UserPage")
);


export const Routes = {
  // pages
  LockPage: {
    path: "/lock",
    exact: true,
    name: "Lock Page",
    element: LockPage,
  },
  ServerErrorPage: {
    path: "/500",
    exact: true,
    name: "Server Error Page",
    element: ServerErrorPage,
  },
  NotFoundPage: {
    path: "/404",
    exact: true,
    name: "Not Found Page",
    element: NotFoundPage,
  },
  LoginPage: { path: "/login", exact: true, name: "Login", element: LoginPage },
  DashboardPage: {
    path: "/",
    exact: true,
    name: "Dashboard",
    element: Dashboard,
  },
  Course: {
    path: "/course",
    exact: true,
    name: "Course Management",
    element: CoursePage,
  },
  //tutorial
  ModulePage: {
    path: "/topic-management",
    exact: true,
    name: "Topic Management",
    element: ModulePage,
  },
  DetailModule: {
    path: "/topic/:id/document",
    exact: true,
    name: "Detail Topic",
    element: DetailModule,
  },
  EditorTutorial: {
    path: [
      "/topic/:id/document/create",
      "/topic/:id/document/:idTutorial/edit",
    ],
    exact: true,
    name: "Editor Document",
    element: EditorTutorial,
  },
  QuestionPage: {
    path: "/question-management",
    exact: true,
    name: "Question Management",
    element: QuestionPage,
  },
  ExamPage: {
    path: "/exam-management",
    exact: true,
    name: "Exam Management",
    element: ExamPage,
  },
  SectionPage: {
    path: "/section-management",
    exact: true,
    name: "Section Management",
    element: SectionPage,
  },
  NewExamPage: {
    path: ["/exam-management/add", "/exam-management/:idExam"],
    exact: true,
    name: "Create a new exam",
    element: NewExamPage,
  },
  NewSectionPage: {
    path: ["/section-management/add", "/section-management/:idSection"],
    exact: true,
    name: "Create a new section",
    element: NewSectionPage,
  },
  LessonsPage: {
    path: "/lessons-management",
    exact: true,
    name: "Lessons Management",
    element: LessonsPage,
  },
  AddNewLessonsPage: {
    path: "/lessons-management/add",
    exact: true,
    name: "Add Lessons Management",
    element: AddNewLessonsPage,
  },
  ServicePage: {
    path: "/service-management",
    exact: true,
    name: "Service Management",
    element: ServicePage,
  },
  StatementPage: {
    path: "/statement-management",
    exact: true,
    name: "Statement Management",
    element: StatementPage,
  },
  UserPage: {
    path: "/user-management",
    exact: true,
    name: "User Management",
    element: UserPage,
  },
};
