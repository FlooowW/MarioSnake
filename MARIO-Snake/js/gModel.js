function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
}

class GameModel {
	constructor(x,y){
		this.x=x;
		this.y=y;
	}

	init(){
		this.gameMatrix = [];
		for (var i = 0; i < this.x; i++) {
			this.gameMatrix[i]=new Array(this.y);
			for (var j = 0; j < this.y; j++) {
				if(i==0||j==0||i==(this.x-1)||j==(this.y-1))
					this.gameMatrix[i][j]=-1;
				else
					this.gameMatrix[i][j]=0;
			}
		}
		this.first=new Snake(5,7);
		this.last=new SnakeBody(5,6,this.first);
		this.fruits=new Array();

		this.score=0;

    this.lNewKeyCode=3;
		this.lKeyCode=3;
		
		this.generateFruit();
	}

	update(){
		this.checkRules();
		this.setMatrice();
		this.updateGView(this.gameMatrix);
	}

	setMatrice(){
		for (var i = 0; i < this.x; i++) {
			for (var j = 0; j < this.y; j++) {
				if(i==0||j==0||i==(this.x-1)||j==(this.y-1))
					this.gameMatrix[i][j]=-1;
				else
					this.gameMatrix[i][j]=0;
			}
		}

		var tmp = this.last;

		for (var i=0;i<this.fruits.length;i++){
			this.gameMatrix[this.fruits[i][0]][this.fruits[i][1]]=20;
		}

		do {
			this.gameMatrix[tmp.getX()][tmp.getY()]=tmp.getCode();
			tmp=tmp.getNextS();
		} while(tmp != null);
	}

	checkRules(){
		this.checkIfSnakeEatFruit();
		if(	this.first.getX()==0 ||
			this.first.getX()==this.x-1||
			this.first.getY()==0||
			this.first.getY()==this.y-1||
			this.checkIfSnakeEatSnake()){
        this.setHighestScore(this.score);
			  this.gameOver();
		}
	}

	checkIfSnakeEatSnake(){
		var tmp=false;
		var tmps = this.last;
		while(tmps.getCode() == 11) {
			if(this.first.getX()==tmps.getX() && this.first.getY()==tmps.getY()){
				tmp=true;
			}
			tmps=tmps.getNextS();
		}
		return tmp;
	}

	checkIfSnakeEatFruit(){
		var tmp=false;
		var tmpInt;
		for (var i=0;i<this.fruits.length;i++){
			if(this.fruits[i][0]==this.first.getX()&&this.fruits[i][1]==this.first.getY()){
				tmp=true;
				tmpInt=i;
			}
		}
		if(tmp){
			this.fruits.splice(tmpInt,1);
			this.last=new SnakeBody(this.last.getX(),this.last.getY(),this.last);
			this.last.getNextS().next(this.getDirection());
			this.score+=20;
			this.generateFruit();
		}
		else{
			this.last.next(this.getDirection());
		}
	}

	generateFruit(){
			var r1,r2;
			do{
				r1=getRandomInt(this.x-3)+1;
				r2=getRandomInt(this.y-3)+1;
			} while(this.gameMatrix[r1][r2]!=0);
			this.gameMatrix[r1][r2]=20;
			this.fruits.push([r1,r2]);
	}

  setLKeyCode = (code) => {
    if(this.lKeyCode!=(code-37-2)&&this.lKeyCode!=(code-37+2))
			this.lNewKeyCode=code-37;
  }
  getDirection = () => {
    this.lKeyCode=this.lNewKeyCode;
		return this.lKeyCode;
  }

	bindView(callback){
		this.updateGView=callback;
	}
	bindGO(callback){
		this.gameOver=callback;
	}

  setHighestScore = (score) => {
      if(this.getHighestScore()<score){
        setCookie('MarioHS',score,365);
      }
  }
  getHighestScore = () => {
    var tmp = getCookie('MarioHS');
    if(tmp == ""){
      return 0;
    }
    else {
      return tmp;
    }
  }
}



class Snake {
	constructor(x,y){
		this.x=x;
		this.y=y;
	}

	next(code){
		switch(code){
			case 1:
				this.y--;
				break;
			case 2:
				this.x++;
				break;
			case 3:
				this.y++;
				break;
			case 0:
				this.x--;
				break;
		}
	}
	getNextS(){return null;}

	getX(){return this.x;}
	getY(){return this.y;}
	getCode(){return 10;}

}

class SnakeBody extends Snake{
	constructor(x,y,nextS){
		super(x,y);
		this.nextS=nextS;
	}

	next(code){
		this.x=this.nextS.getX();
		this.y=this.nextS.getY();
		this.nextS.next(code);
	}
	getNextS(){return this.nextS;}
	getCode(){return 11;}
}
