import React from 'react';
import './footer.css';

const Footer = () => {
	return (
		<React.Fragment>
			<footer className="container" id="footer">
				<div id="footerWrapper">
					<nav id="footerNav">
						<a href=""> Services</a>
						<a href="">About us</a>
					</nav>
					<div className="social-media-links">
						<a href="">
							<img
								src="https://www.pngkey.com/png/full/178-1787134_png-file-svg-github-icon-png.png"
								alt="github"
							/>
						</a>
						<a href="">
							<img
								src="https://img.icons8.com/ios/452/facebook-new.png"
								alt="facebook"
							/>
						</a>
						<a href="">
							<img
								src="https://seeklogo.net/wp-content/uploads/2015/09/twitter-icon-circle-logo-400x400.png"
								alt="twitter"
							/>
						</a>
					</div>
				</div>

				<div id="bottom">
					<div id="copyright">
						<a href="">
							<img src="" alt="logo" />
						</a>
						<p>
							All right reserved. The Backenders,
							<br /> a cooding team &copy; 2021
						</p>
					</div>
				</div>
			</footer>
		</React.Fragment>
	);
};

export default Footer;
