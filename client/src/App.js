import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from './components/Nav/Nav';
import HomePage from './pages/Home/HomePage';
import CreatePostPage from './pages/CreatePost/CreatePostPage';
import PostsPage from './pages/Posts/PostsPage';
import SinglePostPage from './pages/SinglePost/SinglePostPage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

import { AuthContext } from "./helpers/AuthContext"
import {useState, useEffect} from "react";
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Nav />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/createpost" component={CreatePostPage} />
            <Route path="/posts" component={PostsPage} />
            <Route path="/singlePost/:id" component={SinglePostPage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
