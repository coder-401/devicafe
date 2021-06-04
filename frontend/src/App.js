import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Header from './components/header';
import Footer from './components/footer';
import Profile from './components/profile';

const App = () => {
	return (
		<div>
			<Router>
				<Header />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/profile" component={Profile} />
			</Router>
			<Footer />
		</div>
	);
};

export default App;
