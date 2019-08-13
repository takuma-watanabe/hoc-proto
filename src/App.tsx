import React from 'react';
import './App.css';
import MyComponent from './MyComponent';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const App: React.FC = () => {
  return (
    <Router>
      <Route
        exact path={'/test'}
        render={(props) =>
          <MyComponent
            headingAreaTitle={'heading area title'}
            headingAreaDescription={'heading area Description'}
            pageTitle={'this is page title'}
            hoge={'HOOOOOOOOOOOOOOOOOOOOO'}
            {...props}
          />
        }
      >
      </Route>
      <Route
        exact path={'/test2'}
        render={(props) =>
          <MyComponent
            headingAreaTitle={'TEST2'}
            headingAreaDescription={'TEST2 Description'}
            pageTitle={'TestPageTEST2'}
            hoge={'HOOOOOOOOOOOOOOOOOOOOO'}
            {...props}
          />
        }
      >
      </Route>
    </Router>
  )
}

export default App;
