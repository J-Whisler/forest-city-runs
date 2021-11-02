import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from './components/Nav/Nav';
import HomePage from './pages/Home/HomePage';
import CreatePostPage from './pages/CreatePost/CreatePostPage';
import PostsPage from './pages/Posts/PostsPage';
import SinglePostPage from './pages/SinglePost/SinglePostPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/createpost" component={CreatePostPage} />
          <Route path="/posts" component={PostsPage} />
          <Route path="/singlePost/:id" component={SinglePostPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
