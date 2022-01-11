let PIECES=[];
let SELECTED_PIECE=null;



var canvas = document.getElementById("canvas");
var a_context = canvas.getContext("2d");


const height = 150;
const widthGlobal = 150;

const addFiguresList = () => {
	const figuresArray = ['150', '200', '250', '300', '350', '400', '450', '500', '550'];	
	const figuresList = document.getElementById('figure-list');

	return figuresArray.map((item) => {
		const figure = document.createElement('div');

		figure.className = `figure ${item}`;
		figure.textContent = item;
		figure.dataset.size = item;

		return figuresList.appendChild(figure);
	});	
}

addFiguresList();

class DrawFigure {
	constructor(x1, y1, xSize, ySize){
		this.x1 = x1;
		this.y1 = y1;
		this.xSize = xSize;
		this.ySize = ySize;
	}

	draw(context){
		context.fillStyle = '#ffb6b9';
		context.beginPath();
		context.rect(this.x1, this.y1, this.xSize, this.ySize);
		context.lineWidth = 0.5;
		context.fill();
		context.stroke();
	}
}


const figures = [];

const loadData = () => {
	// a_context.clearRect(0, 0, canvas.width, canvas.height);
	
	figures.forEach(figure => {
		const newFigure = new DrawFigure(figure.x, figure.y, figure.xSize, figure.ySize);
		newFigure.draw(a_context);
	})
};

const dragndrop = (event, selectedFigure) => {
	console.log(event);
	const width = event.path[0].dataset.size;
	console.log(width);

	if (event.target.classList.contains('figure') || selectedFigure) {
		let x = event.clientX;
		let y = event.clientY;
		let xSize =  width / Math.sqrt(2);
		let ySize = height / Math.sqrt(2);
		let figureType = '';

		if (selectedFigure) {
			figureType = selectedFigure.type;

			figures.splice(figures.indexOf(selectedFigure), 1);

			xSize = x - selectedFigure.x - (width * 2);
			ySize = y - selectedFigure.y;

			loadData();
		} else figureType = event.target.classList[0];

		dragFigure = document.createElement('div');
		dragFigure.classList.add(figureType);
		dragFigure.classList.add('drag');
		dragFigure.style.left = x - xSize + 'px';
		dragFigure.style.top = y - ySize + 'px';
		document.body.appendChild(dragFigure);
			console.log(xSize);

	const mouseMove = (event) => {
		let x = event.clientX;
		let y = event.clientY;
		dragFigure.style.left = x - ySize + 'px';
		dragFigure.style.top = y - ySize + 'px';
	};

	document.addEventListener('mousemove', mouseMove);

	const mouseUp = (event) => {
		dragFigure.remove();
		document.removeEventListener('mousemove', mouseMove);

		let canvasX = event.clientX - (width * 2);
		let canvasY = event.clientY;

		if (canvasX > 0 && canvasX < canvas.width && canvasY > 0 && canvasY < canvas.height) {
			figures.forEach(figure => {
				figure.selected = false
			});

			dragFigure.selected = true;

			figures.push({type: 'figure', x: canvasX - xSize, y: canvasY - ySize, selected: true});
			
			const newFigure = new DrawFigure(canvasX - xSize,  canvasY - ySize, xSize, ySize);
			newFigure.draw(a_context);

			console.log(newFigure);

			loadData();
			figureType = null;
		}

		document.removeEventListener('mouseup', mouseUp);
	}

	document.addEventListener('mouseup', mouseUp);
}
}

	const selectFigure = (event) => {
        let x = event.offsetX;
        let y = event.offsetY;

        let selectedFigure = figures.find(figure => {
            if (figure.x + figure.x > x
                && figure.x <= x
                && figure.y + height > y
                && figure.y <= y) {
                return figure
            }
        });

        if (selectedFigure) {
            dragndrop(event, selectedFigure)
        } else {
            figures.forEach(figure => figure.selected = false)
        }
    };

	const figureToDelete = (event) => {
        if (event.key === "Backspace" || event.key === 'Delete') {
            let figureToDelete = figures.find(figure => figure.selected === true);
            figures.splice(figures.indexOf(figureToDelete), 1);
            loadData();
        }
    };


	canvas.addEventListener('mousedown', selectFigure);
    document.addEventListener('mousedown', dragndrop);
    document.addEventListener('keydown', figureToDelete);
