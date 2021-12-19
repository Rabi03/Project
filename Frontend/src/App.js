import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./styles/project.root.scss";
import ChatApp from "./pages/ChatApp/pages/App";

import Context from "./components/Context/Context";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import Friends from "./pages/Friends/Friends";
import Groups from "./pages/Groups/Groups";
import Saved from "./pages/Saved/Saved";
import IntroPage from "./pages/IntroPage/IntroPage";
import ProjectStore from "./pages/ProjectStore/ProjectStore";
import ProjectDetails from "./pages/ProjectStore/ProjectDetails";
import { AuthProvider, AuthContext } from "./Context/Auth";
import AuthRoute from "./Util/AuthRoute";
import IntroRoute from "./Util/IntroRoute";
import { useContext } from "react";

export default function App() {
  const [NotificationID, setNotificationID] = useState(0);
  const { user } = useContext(AuthContext);
  return (
    <AuthProvider>
      <Context.Provider value={{ NotificationID, setNotificationID }}>
        <Router>
          <Switch>
            <AuthRoute path='/' exact component={IntroPage} />
            <IntroRoute path='/home' exact component={Dashboard} />
            <IntroRoute path='/profile/:id' exact component={Profile} />
            <IntroRoute path='/friends' exact component={Friends} />
            <IntroRoute path='/groups' exact component={Groups} />
            <IntroRoute path='/store' exact component={ProjectStore} />
            <Route path='/store/:projectID' exact component={ProjectDetails} />
            <IntroRoute path='/saved' exact component={Saved} />
            <Route path='/rooms/:roomId' exact component={ChatApp} />
          </Switch>
        </Router>
      </Context.Provider>
    </AuthProvider>
  );
}
