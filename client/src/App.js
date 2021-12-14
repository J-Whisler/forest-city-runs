import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from './components/Nav/Nav';
import HomePage from './pages/Home/HomePage';
import CreatePostPage from './pages/CreatePost/CreatePostPage';
import PostsPage from './pages/Posts/PostsPage';
import SinglePostPage from './pages/SinglePost/SinglePostPage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { AuthContext } from "./helpers/AuthContext";
import {ListOfPostsContext} from "./helpers/ListOfPostsContext";


import {useState, useEffect} from "react";
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState({
    username: "", 
    id: 0, 
    status: false
  });

  const [listOfPosts, setListOfPosts] = useState({})
  // const [isLiked, setIsLiked] = useState()

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            ...authState, 
            status: false
          });
        } else {
          setAuthState({
            username: response.data.username, 
            id: response.data.id, 
            status: true
          });
        }
      });
      
     
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <ListOfPostsContext.Provider value={{ listOfPosts, setListOfPosts }}>
          {/* <isLikedContext.Provider value={{ isLiked, setIsLiked }}> */}
            <Router>
            <Nav />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/createpost" component={CreatePostPage} />
              <Route path="/posts" component={PostsPage} />
              <Route path="/singlePost/:id" component={SinglePostPage} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/profile/:id" component={ProfilePage} />
              <Route path="*" exact component={PageNotFound} />
            </Switch>
          </Router>
          {/* </isLikedContext.Provider>     */}
        </ListOfPostsContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
