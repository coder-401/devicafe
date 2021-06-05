import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//components
import Register from './components/auth/register';
import Login from './components/auth/login';
import Header from './components/header';
import Footer from './components/footer';
import Profile from './components/profile';
import Video from './components/videoCall';

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
				</Switch>
			</Router>
			<Footer />
		</div>
	);
};

export default App;
