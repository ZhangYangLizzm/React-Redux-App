import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { PostsList } from './features/posts/PostsList'
import { AddPostFrom } from './features/posts/AddPostForm'

const SinglePostPage = lazy(() => import('./features/posts/SinglePostPage'))
const EditPostForm = lazy(() => import('./features/posts/EditPostForm'))
const UserList = lazy(() => import('./features/users/userList'))
const UserPage = lazy(() => import('./features/users/userPage'))
const NotificationsList = lazy(() =>
  import('./features/notifications/notificationList')
)
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <React.Fragment>
                  <AddPostFrom />
                  <PostsList />
                </React.Fragment>
              )}
            />
            <Route exact path="/posts/:postId" component={SinglePostPage} />
            <Route exact path="/editPost/:postId" component={EditPostForm} />
            <Route exact path="/users" component={UserList} />
            <Route exact path="/users/:userId" component={UserPage} />
            <Route exact path="/notifications" component={NotificationsList} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </Suspense>
  )
}

export default App
