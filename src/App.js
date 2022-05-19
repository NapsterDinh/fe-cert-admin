import React from 'react'
import { BrowserRouter } from "react-router-dom"
//core-styles
import 'app/scss/volt.scss'

//Pages
import HomePage from 'app/features/HomePage/HomePage'

//Components
import ScrollToTop from 'app/base/components/ScrollToTop'

const App = () => {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <HomePage />
    </BrowserRouter>
  );
}

export default App;
