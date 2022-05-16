import React from "react";
import EditorTutorial from "./features/ModulePage/EditorTutorial";

//basic page
const LockPage = React.lazy(() => import("./features/basic/Lock"));
const ServerErrorPage = React.lazy(() => import("./features/basic/ServerError"));
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

export const Routes = {
  // pages
  LockPage: { path: "/lock", exact: true, name: "Lock Page", element: LockPage },
  ServerErrorPage: { path: "/500", exact: true, name: "Server Error Page", element: ServerErrorPage },
  NotFoundPage: { path: "/404", exact: true, name: "Not Found Page", element: NotFoundPage },
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
    path: "/module",
    exact: true,
    name: "Module Management",
    element: ModulePage,
  },
  DetailModule: {
    path: "/module/:id/tutorial",
    exact: true,
    name: "Detail Module",
    element: DetailModule,
  },
  EditorTutorial: {
    path: ["/module/:id/tutorial/create", "/module/:id/tutorial/:idTutorial/edit"],
    exact: true,
    name: "Editor Tutorial",
    element: EditorTutorial,
  },
  QuestionPage: {
    path: "/question-management",
    exact: true,
    name: "Question Management",
    element: QuestionPage,
  },

};
