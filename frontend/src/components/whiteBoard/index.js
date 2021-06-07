import React from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

const WhiteBoard = () => {
	useEffect(() => {
		drawInCanvas();
		socket.on('canvas-data', (data) => {
			let image = new Image();
			let canvas = document.querySelector('#board');
			let ctx = canvas.getContext('2d');

			image.src = data;
			ctx.drawImage(image, 0, 0);
		});
	});

	let timeout;

	function drawInCanvas() {
		var canvas = document.querySelector('#board');
		var ctx = canvas.getContext('2d');

		var sketch = document.querySelector('#sketch');
		var sketch_style = getComputedStyle(sketch);
		canvas.width = parseInt(sketch_style.getPropertyValue('width'));
		canvas.height = parseInt(sketch_style.getPropertyValue('height'));

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
		ctx.lineWidth = 5;
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		ctx.strokeStyle = 'blue';

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
			if (timeout != undefined) clearTimeout(timeout);
			timeout = setTimeout(() => {
				let base64ImageData = canvas.toDataURL('image/png');
				socket.emit('canvas-data', base64ImageData);
			}, 200);
		};
	}

	return (
		<div className="sketch" id="sketch">
			<canvas className="board" id="board"></canvas>
		</div>
	);
};

export default WhiteBoard;
