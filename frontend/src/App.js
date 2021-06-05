import React from 'react';

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//components
import Register from './components/auth/register';
import Login from './components/auth/login';
import Header from './components/header';
import Footer from './components/footer';
import Profile from './components/profile';
import Video from './components/videoCall';
import Questions from './components/questions';
import Posts from './components/posts';

const App = () => {
	return (
		<div>
			<Router>
				<Header />
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/call" component={Video} />
					<Route exact path="/posts" component={Posts} />
				</Switch>
			</Router>
			{/* <Questions /> */}
			<Footer />
		</div>
	);
};

export default App;
