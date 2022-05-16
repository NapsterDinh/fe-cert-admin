import React from "react";
import ReactDOM from "react-dom";

import { render } from "@testing-library/react";
import { store } from "../../../store";
import { Provider } from "react-redux";
import { translationMessages } from "../../../i18n";

import LanguageProvider from "../../core/LanguageProvider";
import RegisterPage from "./index";

it("should renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <>
      <Provider store={store}>
        <LanguageProvider messages={translationMessages} language={"en"}>
          <RegisterPage />
        </LanguageProvider>
      </Provider>
    </>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
