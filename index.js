window.onload = function () {
	const canvas = document.querySelector("canvas");
	const context = canvas.getContext("2d");
	const boundings = canvas.getBoundingClientRect();

	let randomColor =`#${Math.floor(Math.random()*16777215).toString(16)}`;

	class Square {
		constructor(x, y, dimentions, color){
			this.x = x;
			this.y = y;
			this.dimentions = dimentions;
			this.color = color;
		}
	
		draw(context) {
			context.fillStyle = this.color;
			context.beginPath();
			context.rect(this.x, this.y, this.dimentions, this.dimentions);
			context.lineWidth = 0.5;
			context.fill();
			context.stroke();
		};
	}

	class SquareWithNewColor extends Square {
		constructor(x, y, dimentions, color){
			super(x, y, dimentions, color);
		}

		changeColor() {
			this.color = randomColor;
		}
	}

	const squares = [];
	let currentSquare = null;

	const firstSquare = new Square(250, 250, 100, '#ffb6b9');
	const secondSquare = new SquareWithNewColor(100, 100, 100, '#5290c0');
	const therdSquare = new Square(400, 400, 100, '#63feb1');
	
	squares.push(firstSquare, secondSquare, therdSquare);

	const drawSquares = () => {
		context.clearRect(0, 0, canvas.width, canvas.height);

		for (let index = 0; index < squares.length; index++) {
			squares[index].draw(context);
		}
	}

	drawSquares();

	const isCursorInSquare = (mouseX, mouseY) => {
		for (let index = squares.length - 1; index >= 0; index--) {
			if(mouseX > squares[index].x &&
				mouseX < squares[index].x + squares[index].dimentions &&
				mouseY > squares[index].y &&
				mouseY < squares[index].y + squares[index].dimentions) {
				currentSquare = squares[index];	
				currentSquare instanceof SquareWithNewColor && currentSquare.changeColor()
			}
		}
	}

	canvas.addEventListener('mousedown', (event) => {
		const mouseDownX = event.clientX - boundings.left;
		const mouseDownY = event.clientY - boundings.top;

		isCursorInSquare(mouseDownX, mouseDownY);
	})

	canvas.addEventListener('mousemove', (event) => {
		const mouseMoveX = event.clientX - boundings.left;
		const mouseMoveY = event.clientY - boundings.top;

		if (currentSquare) {
			currentSquare.x = mouseMoveX;
			currentSquare.y = mouseMoveY;

			drawSquares();
		}
	})

	canvas.addEventListener('mouseup', () => {
		currentSquare = null;
	})
};
