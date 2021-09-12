import './App.css'
import {BrowserRouter as Switch, Route} from 'react-router-dom'
import TweetPage from './components/Twitter/TweetPage'
import YourTweetsPage from './components/Twitter/user/YourTweetsPage';
import LoginPage from './components/auth/LoginPage'
import HomePage from './components/HomePage'
import LogoutPage from './components/auth/LogoutPage'
import EditTweetPage from './components/Twitter/user/EditTweetPage';
import DeleteTweetPage from './components/Twitter/user/DeleteTweetPage'
import FeedPage from './components/Twitter/Feed/FeedPage'

function App() {
  let userData = localStorage.getItem("user")
  let loggedIn = false
  if(userData != null)loggedIn = true
  return (
    <div className="App">
      
      <Switch> 
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/login" exact>
          <LoginPage />
        </Route>

        <Route path="/logout" exact>
          <LogoutPage />
        </Route>

        <Route path="/tweet" exact render={() => (
            loggedIn ? (
             <TweetPage/>
          ) : (
            <LoginPage/>
          )
        )}/>

        <Route path="/feed" exact render={() => (
            loggedIn ? (
             <FeedPage/>
          ) : (
            <LoginPage/>
          )
        )}/>

        <Route path="/tweet/edit/:id" exact render={() => (
            loggedIn ? (
             <EditTweetPage />
          ) : (
            <LoginPage/>
          )
        )}/>

        <Route path="/tweet/delete/:id" exact render={() => (
            loggedIn ? (
             <DeleteTweetPage/>
          ) : (
            <LoginPage/>
          )
        )}/>
        <Route path="/your-tweets" exact render={() => (
            loggedIn ? (
              <YourTweetsPage />
          ) : (
            <LoginPage/>
          )
        )}/>

      </Switch>
    </div>
  );
}

export default App;
