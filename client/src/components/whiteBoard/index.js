import React from 'react';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './whiteBoard.css';
import ColorizeIcon from '@material-ui/icons/Colorize';
import { Card } from 'react-bootstrap';

const socket = io.connect('https://backenders-devecafe.herokuapp.com');

const WhiteBoard = () => {
	const [color, setcolor] = useState('black');
	const [size, setsize] = useState(3);
	const [shouldUpdateCanvasSize, setshouldUpdateCanvasSize] = useState(true);

	const whiteBoardSetting = { color, size };
	useEffect(() => {
		drawInCanvas();
		socket.on('canvas-data', (data) => {
			let image = new Image();
			let canvas = document.querySelector('#board');
			let ctx = canvas.getContext('2d');
			image.src = data;
			image.onload = () => {
				ctx.drawImage(image, 0, 0);
			};
		});
	});

	let timeout;
	function drawInCanvas() {
		var canvas = document.querySelector('#board');
		var ctx = canvas.getContext('2d');
		var sketch = document.querySelector('#sketch');
		if (shouldUpdateCanvasSize) {
			// eslint-disable-next-line
			canvas.width = sketch.offsetWidth;

			// eslint-disable-next-line
			canvas.height = sketch.offsetHeight;
		}

		function saveImage() {
			let base64ImageData = canvas.toDataURL('image/png');
			let image = new Image();
			image.src = base64ImageData;

			image.onload = () => {
				ctx.drawImage(image, 0, 0);
			};
			ctx.lineWidth = whiteBoardSetting.size;
			ctx.lineJoin = 'round';
			ctx.lineCap = 'round';
			ctx.strokeStyle = whiteBoardSetting.color;
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			// repaint everything
		}
		window.onresize = function () {
			saveImage();
		};
		var mouse = { x: 0, y: 0 };
		var last_mouse = { x: 0, y: 0 };

		/* Mouse Capturing Work */
		canvas.addEventListener(
			'mousemove',
			function (e) {
				last_mouse.x = mouse.x;
				last_mouse.y = mouse.y;

				mouse.x = e.pageX - this.offsetLeft;
				mouse.y = e.pageY - this.offsetTop;
			},
			false,
		);

		/* Drawing on Paint App */
		ctx.lineWidth = whiteBoardSetting.size;
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		ctx.strokeStyle = whiteBoardSetting.color;

		canvas.addEventListener(
			'mousedown',
			function (e) {
				canvas.addEventListener('mousemove', onPaint, false);
			},
			false,
		);

		canvas.addEventListener(
			'mouseup',
			function () {
				canvas.removeEventListener('mousemove', onPaint, false);
			},
			false,
		);

		const onPaint = function () {
			ctx.beginPath();
			ctx.moveTo(last_mouse.x, last_mouse.y);
			ctx.lineTo(mouse.x, mouse.y);
			ctx.closePath();
			ctx.stroke();
			if (timeout !== undefined) clearTimeout(timeout);
			timeout = setTimeout(() => {
				let base64ImageData = canvas.toDataURL('image/png');
				socket.emit('canvas-data', base64ImageData);
			}, 200);
		};
		return saveImage;
	}

	return (
		<React.Fragment>
			<br />
			<div className="sketch" id="sketch">
				<canvas className="board" id="board"></canvas>

				<div className="tool-wrapper">
					<Card>
						<Card.Header>
							<div className="tool-container">
								<ColorizeIcon
									style={{ fill: 'yellow' }}
									onClick={() => {
										var canvas = document.querySelector('#board');
										canvas.classList.remove('cursor');
										canvas.classList.add('pen');
										setsize(3);
										setshouldUpdateCanvasSize(false);
										setcolor('yellow');
									}}
								>
									red
								</ColorizeIcon>
								<ColorizeIcon
									style={{ fill: 'green' }}
									onClick={() => {
										var canvas = document.querySelector('#board');
										canvas.classList.remove('cursor');
										setsize(3);
										setshouldUpdateCanvasSize(false);
										setcolor('green');
									}}
								>
									red
								</ColorizeIcon>
								<ColorizeIcon
									style={{ fill: 'red' }}
									onClick={() => {
										var canvas = document.querySelector('#board');
										canvas.classList.remove('cursor');
										setsize(3);
										setshouldUpdateCanvasSize(false);
										setcolor('red');
									}}
								>
									red
								</ColorizeIcon>
								<ColorizeIcon
									style={{ fill: 'black' }}
									onClick={() => {
										var canvas = document.querySelector('#board');
										canvas.classList.remove('cursor');
										setsize(3);
										setshouldUpdateCanvasSize(false);
										setcolor('black');
									}}
								>
									black
								</ColorizeIcon>
								<button
									className="eraser"
									onClick={() => {
										var canvas = document.querySelector('#board');
										canvas.classList.add('cursor');

										setshouldUpdateCanvasSize(false);
										setsize(50);
										setcolor('white');
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-eraser"
										viewBox="0 0 16 16"
									>
										<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
									</svg>
								</button>
							</div>
						</Card.Header>
					</Card>
				</div>

				<br />
			</div>
		</React.Fragment>
	);
};

export default WhiteBoard;
