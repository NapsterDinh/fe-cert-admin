import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { Routes } from "app/routes";

//image,icon
//pages
//components
import PreloaderNoProps from "app/base/components/PreloaderNoProps";
import RouteWithLoader, {
  RouteWithSidebar,
} from "app/base/utils/routeConfig";
import NotFound from "../basic/NotFound";
import LockPage from "../basic/Lock";
import ServerError from "../basic/ServerError";

const HomePage = () => (
  <Suspense fallback={PreloaderNoProps}>
    <Switch>
      {/* RouteWithLoader */}
      <RouteWithLoader
        exact={Routes.LoginPage.exact}
        path={Routes.LoginPage.path}
        component={Routes.LoginPage.element}
      />

      {/* RouteWithSideBar */}

      <RouteWithSidebar
        exact={Routes.Course.exact}
        path={Routes.Course.path}
        component={Routes.Course.element}
      />

      <RouteWithSidebar
        exact={Routes.EditorTutorial.exact}
        path={Routes.EditorTutorial.path}
        component={Routes.EditorTutorial.element}
      />

      <RouteWithSidebar
        exact={Routes.ModulePage.exact}
        path={Routes.ModulePage.path}
        component={Routes.ModulePage.element}
      />
      <RouteWithSidebar
        exact={Routes.DetailModule.exact}
        path={Routes.DetailModule.path}
        component={Routes.DetailModule.element}
      />

      <RouteWithSidebar
        exact={Routes.DashboardPage.exact}
        path={Routes.DashboardPage.path}
        component={Routes.DashboardPage.element}
      />

      <RouteWithSidebar
        exact={Routes.QuestionPage.exact}
        path={Routes.QuestionPage.path}
        component={Routes.QuestionPage.element}
      />

      <Route component={NotFound} />
      <Route exact={Routes.LockPage.exact} path={Routes.LockPage.path} component={LockPage} />
      <Route exact={Routes.ServerErrorPage.exact} path={Routes.ServerErrorPage.path} component={ServerError} />
    </Switch>
  </Suspense>
);

export default HomePage;