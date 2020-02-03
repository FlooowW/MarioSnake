class GameView {
	constructor(x,y){

		this.x=x;
		this.y=y;

		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");

		this.ctx.canvas.width=(this.x*37+2);
		this.ctx.canvas.height=((this.y+2)*37+44);

		this.init();
	}

	init() {
		document.onkeydown = (evt) => {
			if(evt.which>=37 && evt.which<=40)
				this.setLKeyCode(evt.which);
		};
		document.getElementById('play').onclick = () => {
			document.getElementById('menu').style.display = 'none';
			document.getElementById('m1').style.display = 'none';
			this.startGame();
		}

		this.score=0;
	}

	reinit() {
		this.score=0;
		this.highestScore=0;
	}

	redraw(){
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);

		this.ctx.fillStyle = 'rgb(10,10,10,0.6)';
        this.ctx.fillRect(1, 1, this.x*37, 20);
		this.ctx.strokeStyle = 'rgb(20,190,20)';
        this.ctx.strokeRect(1, 1, this.x*37, 20);

        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = 'rgb(20,190,20)';
		this.ctx.fillText("Score: "+this.getScore(), (this.x-3)*37, 18);
		this.ctx.fillText("Highest Score: "+this.getHighestScore(), 37, 18);

        this.ctx.fillStyle = 'rgb(10,10,10,0.6)';
        this.ctx.fillRect(2, 42, this.x*37, this.y*37);

        this.ctx.beginPath();

        for (var i = 0; i < (this.y+1); i++) {
    		this.ctx.moveTo(0, i*37+42);
    		this.ctx.lineTo(this.x*37+2, i*37+42);
        }

        for (var i = 0; i < (this.x+1); i++) {
    		this.ctx.moveTo(i*37+1, 42);
    		this.ctx.lineTo(i*37+1, this.y*37+42);
        }

        this.ctx.strokeStyle='rgb(10,200,10,0.3)';
        this.ctx.stroke();

        for (var i = 0; i < this.matrix.length; i++) {
        	for (var j = 0; j < this.matrix[0].length; j++) {
        		switch(this.matrix[i][j]){
        			case -1:
        				var img = new Image();
						img.src = 'img/mario/block.png';
						this.ctx.drawImage(img,i*37,j*37+41);
        				break;
        			case 10:
        				var img = new Image();
						img.src = 'img/mario/bot.png';
						this.ctx.drawImage(img,i*37,j*37+41);
        				break;
        			case 11:
						var img = new Image();
						img.src = 'img/mario/next.png';
						this.ctx.drawImage(img,i*37,j*37+41);
        				break;
        			case 20:
        				var img = new Image();
						img.src = 'img/mario/piece.png';
						this.ctx.drawImage(img,i*37,j*37+41);
        				break;
        		}
        	}
        }
	}

	showMenu(){

	}

	showGameOver(){
		document.getElementById('menu').style.display = 'flex';
		document.getElementById('m2').style.display = 'block';
	}

	update(matrix){
		this.matrix=matrix;
		this.redraw();
	}

	bindSetKey = (callback) => {
		this.setLKeyCode=callback;
	}

	bindStart = (callback) => {
		this.startGame=callback;
	}

	bindGetScore = (callback) => {
		this.getScore=callback;
	}
	bindGetHighestScore = (callback) => {
		this.getHighestScore=callback;
	}
}
