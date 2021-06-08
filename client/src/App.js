import React from 'react';
import './App.css';

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//components
import Header from './components/header';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Profile from './components/profile';
import Home from './components/home';

// import Navigation from './components/navigation';
import Questions from './components/questions';
import Posts from './components/posts';
import Entrance from './components/entrance';
import Cafe from './components/cafe';

// import Footer from './components/footer';

const App = () => {
	return (
		<div>
			<Router>
				<Header />
				{/* <Navigation /> */}
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/questions" component={Questions} />
					<Route exact path="/community" component={Posts} />
					<Route exact path="/BookTable" component={Entrance} />
					<Route exact path="/cafe/:meetingId" component={Cafe} />
				</Switch>
				{/* <Footer /> */}
			</Router>
		</div>
	);
};

export default App;
