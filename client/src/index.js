import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter,Route} from 'react-router-dom';


//Components
import Blog from './components/blog-main/Blog';
import SignUpSide from './components/blog-signin/SignInSide';
import Dashboard from './components/blog-admin/Dashboard';

const App = ()=>{
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact component = {Blog}/>
        <Route path="/main" component={Blog}/>
        <Route path="/login" component={SignUpSide}/>
        <Route path="/dash" component={Dashboard}/>
      </div>
    </BrowserRouter>
    )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();