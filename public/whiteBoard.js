//get canvas
const canvas = document.getElementById('canvas');
const eraser = document.getElementById('eraser');
const pen = document.getElementById('pen');

const container = document.querySelector('.container');

const btnHideShow = document.querySelector('.btn-hide-show');

window.addEventListener('load', () => {
	//specifing contex (envirement we will work in it (2d or 3d))
	const ctx = canvas.getContext('2d');
	ctx.strokeStyle = 'red';
	ctx.lineWidth = 10; //line width
	resizeCanvase();
	function resizeCanvase() {
		//resizing canvas
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;
	}
	//resize window event
	window.addEventListener('resize', resizeCanvase);

	//line drawing
	let drawing = false; // when mouse keydown  event triggered will be true

	canvas.addEventListener('mousedown', (e) => {
		socket.emit(
			'mousedown',
			e.clientX,
			e.clientY,
			ctx.strokeStyle,
			ctx.lineWidth,
		);
	});
	canvas.addEventListener('mouseup', (e) => {
		socket.emit('mouseup');
	});
	canvas.addEventListener('mousemove', (e) => {
		socket.emit('mousemove', e.clientX, e.clientY);
	});

	socket.on('_mousedown', (_drawing, x, y, strokeStyle, lineWidth) => {
		drawing = _drawing;
		ctx.strokeStyle = strokeStyle;
		ctx.lineWidth = lineWidth;
		ctx.beginPath();
		draw(x, y);
	});
	socket.on('_mouseup', (_drawing) => {
		drawing = _drawing;
		ctx.beginPath('false');
	});

	socket.on('_mousemove', (x, y) => {
		draw(x, y);
	});
	function draw(x, y) {
		if (!drawing) return;

		ctx.lineCap = 'round'; //line shape
		ctx.lineTo(x, y); //position

		ctx.stroke(); //visualize drawing
	}
	eraser.addEventListener('click', () => {
		ctx.lineWidth = 50; //line width
		ctx.strokeStyle = 'white';
	});
	pen.addEventListener('click', () => {
		ctx.lineWidth = 1; //line width
		ctx.strokeStyle = 'black';
	});
});

btnHideShow.addEventListener('click', () => {
	canvas.classList.toggle('hide');
	eraser.classList.toggle('hide');
	pen.classList.toggle('hide');
});
