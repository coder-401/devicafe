import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import pic2 from './../../pics/2.jpg';
import pic3 from './../../pics/3.jpg';
import pic4 from './../../pics/4.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
	useEffect(() => {
		Aos.init({ duration: 2000 });
	}, []);

	return (
		<React.Fragment>
			<Carousel
				style={{
					position: 'absolute',
					top: '0',
					margin: '0',
					width: '100%',
					marginBottom: '30px',
				}}
			>
				<Carousel.Item
					interval={500}
					style={{ height: '800px', width: '100%' }}
				>
					<img
						className="d-block w-100"
						src={pic2}
						alt="Second slide"
						style={{ height: '800px', width: '100%' }}
					/>
					<Carousel.Caption>
						<p>
							Only those who dare to fail greatly can ever achieve greatly.{' '}
						</p>
						<h6>—Robert F. Kennedy</h6>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item
					interval={800}
					style={{ height: '800px', width: '100%' }}
				>
					<img
						className="d-block w-100"
						src={pic3}
						alt="Third slide"
						style={{ height: '800px', width: '100%' }}
					/>
					<Carousel.Caption>
						<h3>Your interview, made simple.</h3>
						<p>
							Do your interview, ask, help others and review your
							information.Mocky is a hassle-free, one stop solution for your
							need.
						</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item
					interval={1100}
					style={{ height: '800px', width: '100%' }}
				>
					<img
						className="d-block w-100"
						src={pic4}
						alt="Third slide"
						style={{ height: '800px', width: '100%' }}
					/>
					<Carousel.Caption>
						<h3>Practice your interview</h3>
						<p>
							Mocky offers a safe connection , easy to use right over your home{' '}
						</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>

			<div
				className="1st-sec"
				data-aos="fade-down"
				style={{ marginTop: '810px', textAlign: 'center' }}
			>
				<h3
					data-aos-easing="ease-in-back"
					data-aos-delay="300"
					data-aos-offset="0"
				>
					One site for <br /> a perfect interview
				</h3>
				<div
					data-aos="fade-right"
					style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}
				>
					<Card
						data-aos="fade-zoom-in"
						data-aos-easing="ease-in-back"
						data-aos-delay="200"
						data-aos-offset="0"
						style={{
							width: '18%',
							height: '300px',
							margin: '1%',
							padding: '1%',
							marginLeft: '8%',
						}}
					>
						<Card.Img
							style={{ width: '100%', height: '200px' }}
							variant="top"
							src="https://e3arabi.com/wp-content/uploads/2020/06/question-4105529_1920.jpg"
						/>
						<Card.Body>
							<Card.Title>Questions</Card.Title>
						</Card.Body>
					</Card>
					<Card
						data-aos="fade-zoom-in"
						data-aos-easing="ease-in-back"
						data-aos-delay="300"
						data-aos-offset="0"
						style={{
							width: '18%',
							height: '300px',
							margin: '1%',
							padding: '1%',
							marginLeft: '3%',
						}}
					>
						<Card.Img
							style={{ width: '100%', height: '200px' }}
							variant="top"
							src="https://www.glassdoor.com/employers/app/uploads/sites/2/2021/02/GoogleDrive_640X469_Oddball-Interview-Questions-Recruiters-Should-Ask-02.png"
						/>
						<Card.Body>
							<Card.Title>Interview</Card.Title>
						</Card.Body>
					</Card>
					<Card
						data-aos="fade-zoom-in"
						data-aos-easing="ease-in-back"
						data-aos-delay="250"
						data-aos-offset="0"
						style={{
							width: '18%',
							height: '300px',
							margin: '1%',
							padding: '1%',
							marginLeft: '3%',
						}}
					>
						<Card.Img
							style={{ width: '100%', height: '200px' }}
							variant="top"
							src="https://static.wixstatic.com/media/58e2ce_dff2ace432734e549f36aba465bbe931~mv2.jpg/v1/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01/LOGO.webp"
						/>
						<Card.Body>
							<Card.Title>Get table</Card.Title>
						</Card.Body>
					</Card>
					<Card
						data-aos="fade-zoom-in"
						data-aos-easing="ease-in-back"
						data-aos-delay="350"
						data-aos-offset="0"
						style={{
							width: '18%',
							height: '300px',
							margin: '1%',
							padding: '1%',
							marginLeft: '3%',
						}}
					>
						<Card.Img
							style={{ width: '100%', height: '200px' }}
							variant="top"
							src="https://ampjar.com/wp-content/uploads/2020/01/HERO-brand-community@2x-970x577.png"
						/>
						<Card.Body>
							<Card.Title>Ask and Answer</Card.Title>
						</Card.Body>
					</Card>
				</div>
			</div>
			<section
				className="2nd-sec"
				style={{ textAlign: 'center', margin: '0', marginTop: '5%' }}
			>
				<h1 data-aos="fade-up">
					Simplifying and improving the lives <br /> of <br />
					people across our world.
				</h1>

				<Container style={{ margin: '0', marginTop: '3%' }}>
					<Row>
						<Col style={{ marginRight: '0' }}>
							<img
								alt="img"
								data-aos="fade-right"
								data-aos-delay="300"
								src="https://careeradvisor.asia/wp-content/uploads/2020/03/119_Header_How-To-Prepare-For-An-Online-Job-Interview-1200x800.jpg"
								style={{
									width: '150%',
									zIndex: '3',
									height: '600px',
									marginRight: '0',
									marginLeft: '0',
								}}
							/>
						</Col>
						<Col data-aos="fade-left" data-aos-delay="300">
							<div
								style={{
									width: '100%',
									zIndex: '3',
									height: '600px',
									marginLeft: '50%',
									marginTop: '25%',
								}}
							>
								<h3>We Care About You</h3>
								<p>Do your research, Practice your answers and Stay calm.</p>
								<p>
									Mocky provide you a solid software interview questions that
									you can review and study
								</p>

								<br />
								<a href="/questions">Learn more</a>
							</div>
						</Col>
					</Row>
					<Row>
						<Col data-aos="fade-up" data-aos-delay="300">
							<div
								style={{
									width: '100%',
									zIndex: '3',
									height: '600px',
									marginRight: '50%',
									marginTop: '25%',
								}}
							>
								<h3>Manage Your Interview from home</h3>
								<p>
									You can book your private table.Mocky provide for you a
									private table.
								</p>
								<p>You can Navigate to the link below</p>

								<br />
								<a href="/bookTable">Learn more</a>
							</div>
						</Col>

						<Col style={{ marginRight: '0' }}>
							<img
								alt="img"
								data-aos="fade-down"
								data-aos-delay="300"
								src="https://s3media.freemalaysiatoday.com/wp-content/uploads/2020/05/online-interview_lifestyle-16052020.jpg"
								style={{
									width: '150%',
									zIndex: '3',
									height: '600px',
									marginLeft: '20%',
									marginTop: '25%',
									marginBottom: '25%',
								}}
							/>
						</Col>
					</Row>
					<Row>
						<Col style={{ marginRight: '0' }}>
							<img
								alt="img"
								data-aos="fade-right"
								data-aos-delay="300"
								src="https://careeradvisor.asia/wp-content/uploads/2020/03/119_Header_How-To-Prepare-For-An-Online-Job-Interview-1200x800.jpg"
								style={{
									width: '150%',
									zIndex: '3',
									height: '600px',
									marginRight: '0',
									marginLeft: '0',
								}}
							/>
						</Col>
						<Col data-aos="fade-left" data-aos-delay="300">
							<div
								style={{
									width: '100%',
									zIndex: '3',
									height: '600px',
									marginLeft: '50%',
									marginTop: '25%',
								}}
							>
								<h3>We Care About You</h3>
								<p>Do your research, Practice your answers and Stay calm.</p>
								<p>
									Mocky provide you a solid software interview questions that
									you can review and study
								</p>

								<br />
								<a href="/questions">Learn more</a>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</React.Fragment>
	);
};

export default Home;
