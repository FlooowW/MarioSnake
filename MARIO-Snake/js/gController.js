class GameController {

	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	init(){

		this.view = new GameView(this.x,this.y);
		this.game = new GameModel(this.x,this.y);

		this.game.init();

		this.game.bindView(this.updateView);
		this.game.bindGO(this.gameOver);

		this.view.bindSetKey(this.setLKeyCode);
		this.view.bindStart(this.start);
		this.view.bindGetScore(this.getScore);
		this.view.bindGetHighestScore(this.getHighestScore);

	}

	//REINIT THE MODEL

	reinit(){
		this.game.init();
		this.view.reinit();
	}

	//START/STOP the Game

	start = () => {

		this.game.update();
		this.ms=Date.now();
		this.clock=0;
		this.tick=0;
		this.gameSpeed=8;

		this.loop = setInterval(this.gameLoop, 50);

	}
	stop(){
		clearInterval(this.loop);
	}

	//TIMER LOOP

	gameLoop = () => {
		if(((Date.now()-this.ms)-(50*this.clock))>50){
			this.clock++;
		}
		if((this.clock%this.gameSpeed)==0){
			this.tick++;
			this.game.update();
		}
	}

	//UPDATE VIEW

	updateView = (matrix) => {
		this.view.update(matrix);
	}
	gameOver = () => {
		this.stop();
		this.view.showGameOver();
		console.log("GAME OVER!");
		this.reinit();
	}

	//Set direction from view to model

	setLKeyCode = (code) => {
		this.game.setLKeyCode(code);
	}

	//GETTERS

	getScore = () => {
		return this.game.score;
	}
	getHighestScore = () => {
		return this.game.getHighestScore();
	}


}
