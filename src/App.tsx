import React from 'react'
import { BrowserRouter as Router, Route, RouteComponentProps } from "react-router-dom"
import './App.css'
import MyComponent from './MyComponent'
import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'


const App: React.FC = () => {


  prefix.reg(log);
  prefix.apply(log, {
    template: '[%t] %l (%n):',
    levelFormatter(level) {
      return level.toUpperCase();
    },
    nameFormatter(name) {
      return name || 'global';
    },
    timestampFormatter(date) {
      return date.toISOString();
    },
  });


    // prefix.apply(log, {
  //   format(level, name, timestamp) {
  //     return `[${timestamp}] ${level.toUpperCase()} ${name}:`
  //   },
  // })
  log.enableAll();
  log.setLevel(log.levels.DEBUG)
  log.trace('trace log')

  window.addEventListener('error', function(event) {
    log.error('onError' , event)
  });

  window.addEventListener("unhandledrejection", function (event) {
    log.error("onUnhandledrejection", event)
  });

  return (
    <Router>
      <Route
        exact path={'/test'}
        render={(props: RouteComponentProps) =>
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
