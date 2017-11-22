
alertify.alert("Let us begin !");
	//Variables globales
var velocidad = 300;

var tamano = 10;
var codigoSpace = 32;


class objeto {
	constructor(){
		this.tamano = tamano;
	}
	choque(obj){
		var difx = Math.abs(this.x - obj.x);
		var dify = Math.abs(this.y - obj.y);
		if(difx >= 0 && difx < tamano && dify >= 0 && dify < tamano){
			return true;
		} else {
			return false;
		}
	}
}


class Cola extends objeto {
	constructor(x,y){
		super();
		this.x = x;
		this.y = y;
		this.siguiente = null;
	}
	
	dibujar(ctx){
		if(this.siguiente != null){
			this.siguiente.dibujar(ctx);
		}
		ctx.fillStyle = "#41d92d";
		ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
	}
	
	setxy(x,y){
		if(this.siguiente != null){
			this.siguiente.setxy(this.x, this.y);
		}
		this.x = x;
		this.y = y;
	}
	meter(){
		if(this.siguiente == null){
			this.siguiente = new Cola(this.x, this.y);
		} else {
			this.siguiente.meter();
		}
	}
	verSiguiente(){
		return this.siguiente;
	}
}


class Comida extends objeto {
	constructor(){
		super();
		this.x = this.generar();
		this.y = this.generar();
	}
	generar(){
		var num = (Math.floor(Math.random() * 59))*10;
		return num;
	}
	colocar(){
		this.x = this.generar();
		this.y = this.generar();
	}
	dibujar(ctx){
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
	}
}
//Objetos del juego
var cabeza = new Cola(20,20);
var comida = new Comida();
var ejex = true;
var ejey = true;
var xdir = 0;
var ydir = 0;
function movimiento(){
	var nx = cabeza.x+xdir;
	var ny = cabeza.y+ydir;
	cabeza.setxy(nx,ny);
}
function control(event){
	var cod = event.keyCode;
	if(ejex){
		if(cod == 38){
			ydir = -tamano;
			xdir = 0;
			ejex = false;
			ejey = true;
		}
		if(cod == 40){
			ydir = tamano;
			xdir = 0;
			ejex = false;
			ejey = true;
		}
		
	}
	if(ejey){
		if(cod == 37){
			ydir = 0;
			xdir = -tamano;
			ejey = false;
			ejex = true;
		}
		if(cod == 39){
			ydir = 0;
			xdir = tamano;
			ejey = false;
			ejex = true;
		}
		
	}
}

function pause(event)
{
	if (event.keyCode == 32) {alert("PAUSE");}
  
}
function redireccionar()
{
	location.href = "./index.html";
}
function findeJuego(){

	if (number == 100) 
	{
	xdir = 0;
	ydir = 0;
	ejex = false;
	ejey = false;
			var finish = new Audio('aud/finish.mp3');
			finish.play();
			alertify.alert("You have completed the game and learned the numbers from 1 to 100 in a fun way",function(e){
				if (e) {redireccionar();}
			});
	}else{
	xdir = 0;
	ydir = 0;
	ejex = true;
	ejey = true;
	cabeza = new Cola(20,20);
	comida = new Comida();
	var perdiste = new Audio('aud/perdiste.mp3');perdiste.play();
	alertify.alert("You lose !.. restart game", function(e){
		if (e) {
			redireccionar();
		}
	});
	}
	

//setInterval("redireccionar()",-1000);
}

function choquepared(){
	if(cabeza.x < 0 || cabeza.x > 590 || cabeza.y < 0 || cabeza.y > 590){
		findeJuego();
	}
}
function choquecuerpo(){
	var temp = null;
	try{
		temp = cabeza.verSiguiente().verSiguiente();
	}catch(err){
		temp = null;
	}
	while(temp != null){
		if(cabeza.choque(temp)){
			//fin de juego
			findeJuego();
			
		} else {
			temp = temp.verSiguiente();
		}
	}
}

function dibujar(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0, canvas.width, canvas.height);
	//aquí abajo va todo el dibujo
	cabeza.dibujar(ctx);
	comida.dibujar(ctx);
}
var number = 0;
var numletra ;
var audio;


function main(){
	choquecuerpo();
	choquepared();
	dibujar();
	movimiento();
	
	if(cabeza.choque(comida)){
		var snakeaudio = new Audio('aud/snake.mp3');snakeaudio.play();
		comida.colocar();
		cabeza.meter();
		number = number + 1;
		var mostrar = number;
		document.getElementById("Mostrarnumero").innerHTML = mostrar;

	
		if (number == 1) {numletra = "One"; var audio = new Audio('aud/1.mp3');
			audio.play(); } 
		if (number == 2) {numletra = "Two"; var audio = new Audio('aud/2.mp3');
			audio.play();  }
		if (number == 3) {numletra = "Three"; var audio = new Audio('aud/3.mp3');
			audio.play(); }
		if (number == 4) {numletra = "Four"; var audio = new Audio('aud/4.mp3');
			audio.play(); }
		if (number == 5) {numletra = "Five"; var audio = new Audio('aud/5.mp3');
			audio.play(); }
		if (number == 6) {numletra = "Six"; var audio = new Audio('aud/6.mp3');
			audio.play(); }
		if (number == 7) {numletra = "Seven"; var audio = new Audio('aud/7.mp3');
			audio.play(); }
		if (number == 8) {numletra = "Eight"; var audio = new Audio('aud/8.mp3');
			audio.play(); }
		if (number == 9) {numletra = "Nine"; var audio = new Audio('aud/9.mp3');
			audio.play(); }
		if (number == 10) {numletra = "Ten";var audio = new Audio('aud/10.mp3');
			audio.play(); setInterval("main()", velocidad= 288); }

		if (number == 11) {numletra = "Eleven"; var audio = new Audio('aud/11.mp3');
			audio.play();}
		if (number == 12) {numletra = "Twelve"; var audio = new Audio('aud/12.mp3');
			audio.play();}
		if (number == 13) {numletra = "Thirteen";var audio = new Audio('aud/13.mp3');
			audio.play();}
		if (number == 14) {numletra = "Fourteen";var audio = new Audio('aud/14.mp3');
			audio.play();}
		if (number == 15) {numletra = "Fifteen";var audio = new Audio('aud/15.mp3');
			audio.play();}
		if (number == 16) {numletra = "Sixteen";var audio = new Audio('aud/16.mp3');
			audio.play();}
		if (number == 17) {numletra = "Seventeen";var audio = new Audio('aud/17.mp3');
			audio.play();}
		if (number == 18) {numletra = "Eighteen";var audio = new Audio('aud/18.mp3');
			audio.play();}
		if (number == 19) {numletra = "Nineteen";var audio = new Audio('aud/19.mp3');
			audio.play();}
		if (number == 20) {numletra = "Twenty";var audio = new Audio('aud/20.mp3');
			audio.play();setInterval("main()", velocidad= 286); }

		if (number == 21) {numletra = "Twenty-One";var audio = new Audio('aud/21.mp3');
			audio.play();}
		if (number == 22) {numletra = "Twenty-Two";var audio = new Audio('aud/22.mp3');
			audio.play();}
		if (number == 23) {numletra = "Twenty-Three";var audio = new Audio('aud/23.mp3');
			audio.play();}
		if (number == 24) {numletra = "Twenty-Four";var audio = new Audio('aud/24.mp3');
			audio.play();}
		if (number == 25) {numletra = "Twenty-Five";var audio = new Audio('aud/25.mp3');
			audio.play();}
		if (number == 26) {numletra = "Twenty-Six";var audio = new Audio('aud/26.mp3');
			audio.play();}
		if (number == 27) {numletra = "Twenty-Seven";var audio = new Audio('aud/27.mp3');
			audio.play();}
		if (number == 28) {numletra = "Twenty-Eight";var audio = new Audio('aud/28.mp3');
			audio.play();}
		if (number == 29) {numletra = "Twenty-Nine";var audio = new Audio('aud/29.mp3');
			audio.play();}
		if (number == 30) {numletra = "Thirty";var audio = new Audio('aud/30.mp3');
			audio.play();setInterval("main()", velocidad= 284);}

		if (number == 31) {numletra = "Thirty-One"; var audio = new Audio('aud/31.mp3');
			audio.play();}
		if (number == 32) {numletra = "Thirty-Two";var audio = new Audio('aud/32.mp3');
			audio.play();}
		if (number == 33) {numletra = "Thirty-Three";var audio = new Audio('aud/33.mp3');
			audio.play();}
		if (number == 34) {numletra = "Thirty-Four";var audio = new Audio('aud/34.mp3');
			audio.play();}
		if (number == 35) {numletra = "Thirty-Five";var audio = new Audio('aud/35.mp3');
			audio.play();}
		if (number == 36) {numletra = "Thirty-Six";var audio = new Audio('aud/36.mp3');
			audio.play();}
		if (number == 37) {numletra = "Thirty-Seven";var audio = new Audio('aud/37.mp3');
			audio.play();}
		if (number == 38) {numletra = "Thirty-Eight";var audio = new Audio('aud/38.mp3');
			audio.play();}
		if (number == 39) {numletra = "Thirty-Nine";var audio = new Audio('aud/39.mp3');
			audio.play();}
		if (number == 40) {numletra = "Forty"; var audio = new Audio('aud/40.mp3');
			audio.play();}

		if (number == 41) {numletra = "Forty-One"; var audio = new Audio('aud/41.mp3');
			audio.play();}
		if (number == 42) {numletra = "Forty-Two"; var audio = new Audio('aud/42.mp3');
			audio.play();}
		if (number == 43) {numletra = "Forty-Three"; var audio = new Audio('aud/43.mp3');
			audio.play();}
		if (number == 44) {numletra = "Forty-Four"; var audio = new Audio('aud/44.mp3');
			audio.play();}
		if (number == 45) {numletra = "Forty-Five"; var audio = new Audio('aud/45.mp3');
			audio.play();}
		if (number == 46) {numletra = "Forty-Six"; var audio = new Audio('aud/46.mp3');
			audio.play();}
		if (number == 47) {numletra = "Forty-Seven"; var audio = new Audio('aud/47.mp3');
			audio.play();}
		if (number == 48) {numletra = "Forty-Eight"; var audio = new Audio('aud/48.mp3');
			audio.play();}
		if (number == 49) {numletra = "Forty-Nine"; var audio = new Audio('aud/49.mp3');
			audio.play();}
		if (number == 50) {numletra = "Fifty"; var audio = new Audio('aud/50.mp3');
			audio.play();setInterval("main()", velocidad= 282);}

		if (number == 51) {numletra = "Fifty-One"; var audio = new Audio('aud/51.mp3');
			audio.play();}
		if (number == 52) {numletra = "Fifty-Two"; var audio = new Audio('aud/52.mp3');
			audio.play();}
		if (number == 53) {numletra = "Fifty-Three"; var audio = new Audio('aud/53.mp3');
			audio.play();}
		if (number == 54) {numletra = "Fifty-Four"; var audio = new Audio('aud/54.mp3');
			audio.play();}
		if (number == 55) {numletra = "Fifty-Five"; var audio = new Audio('aud/55.mp3');
			audio.play();}
		if (number == 56) {numletra = "Fifty-Six"; var audio = new Audio('aud/56.mp3');
			audio.play();}
		if (number == 57) {numletra = "Fifty-Seven"; var audio = new Audio('aud/57.mp3');
			audio.play();}
		if (number == 58) {numletra = "Fifty-Eight"; var audio = new Audio('aud/58.mp3');
			audio.play();}
		if (number == 59) {numletra = "Fifty-Nine"; var audio = new Audio('aud/59.mp3');
			audio.play();}
		if (number == 60) {numletra = "Sixty";var audio = new Audio('aud/60.mp3');
			audio.play();setInterval("main()", velocidad= 280);}

		if (number == 61) {numletra = "Sixty-One";var audio = new Audio('aud/61.mp3');
			audio.play();}
		if (number == 62) {numletra = "Sixty-Two";var audio = new Audio('aud/62.mp3');
			audio.play();}
		if (number == 63) {numletra = "Sixty-Three";var audio = new Audio('aud/63.mp3');
			audio.play();}
		if (number == 64) {numletra = "Fixty-Four";var audio = new Audio('aud/64.mp3');
			audio.play();}
		if (number == 65) {numletra = "Sixty-Five";var audio = new Audio('aud/65.mp3');
			audio.play();}
		if (number == 66) {numletra = "Sixty-Six";var audio = new Audio('aud/66.mp3');
			audio.play();}
		if (number == 67) {numletra = "Sixty-Seven";var audio = new Audio('aud/67.mp3');
			audio.play();}
		if (number == 68) {numletra = "Sixty-Eight";var audio = new Audio('aud/68.mp3');
			audio.play();}
		if (number == 69) {numletra = "Sixty-Nine";var audio = new Audio('aud/69.mp3');
			audio.play();}
		if (number == 70) {numletra = "Seventy";var audio = new Audio('aud/70.mp3');
			audio.play();}

		if (number == 71) {numletra = "Seventy-One";var audio = new Audio('aud/71.mp3');
			audio.play();}
		if (number == 72) {numletra = "Seventy-Two";var audio = new Audio('aud/72.mp3');
			audio.play();}
		if (number == 73) {numletra = "Seventy-Three";var audio = new Audio('aud/73.mp3');
			audio.play();}
		if (number == 74) {numletra = "Seventy-Four";var audio = new Audio('aud/74.mp3');
			audio.play();}
		if (number == 75) {numletra = "Seventy-Five";var audio = new Audio('aud/75.mp3');
			audio.play();}
		if (number == 76) {numletra = "Seventy-Six";var audio = new Audio('aud/76.mp3');
			audio.play();}
		if (number == 77) {numletra = "Seventy-Seven";var audio = new Audio('aud/77.mp3');
			audio.play();}
		if (number == 78) {numletra = "Seventy-Eight";var audio = new Audio('aud/78.mp3');
			audio.play();}
		if (number == 79) {numletra = "Seventy-Nine";var audio = new Audio('aud/79.mp3');
			audio.play();}
		if (number == 80) {numletra = "Eighty";var audio = new Audio('aud/80.mp3');
			audio.play();}

		if (number == 81) {numletra = "Eighty-One";var audio = new Audio('aud/81.mp3');
			audio.play();}
		if (number == 82) {numletra = "Eighty-Two";var audio = new Audio('aud/82.mp3');
			audio.play();}
		if (number == 83) {numletra = "Eighty-Three";var audio = new Audio('aud/83.mp3');
			audio.play();}
		if (number == 84) {numletra = "Eighty-Four";var audio = new Audio('aud/84.mp3');
			audio.play();}
		if (number == 85) {numletra = "Eighty-Five";var audio = new Audio('aud/85.mp3');
			audio.play();}
		if (number == 86) {numletra = "Eighty-Six";var audio = new Audio('aud/86.mp3');
			audio.play();}
		if (number == 87) {numletra = "Eighty-seven";var audio = new Audio('aud/87.mp3');
			audio.play();}
		if (number == 88) {numletra = "Eighty-Eight";var audio = new Audio('aud/88.mp3');
			audio.play();}
		if (number == 89) {numletra = "Eighty-Nine";var audio = new Audio('aud/89.mp3');
			audio.play();}
		if (number == 90) {numletra = "Ninety";var audio = new Audio('aud/90.mp3');
			audio.play();setInterval("main()", velocidad= 278);}

		if (number == 91) {numletra = "Ninety-One";var audio = new Audio('aud/91.mp3');
			audio.play();}
		if (number == 92) {numletra = "Ninety-Two";var audio = new Audio('aud/92.mp3');
			audio.play();}
		if (number == 93) {numletra = "Ninety-Three";var audio = new Audio('aud/93.mp3');
			audio.play();}
		if (number == 94) {numletra = "Ninety-Four";var audio = new Audio('aud/94.mp3');
			audio.play();}
		if (number == 95) {numletra = "Ninety-Five";var audio = new Audio('aud/95.mp3');
			audio.play();}
		if (number == 96) {numletra = "Ninety-Six";var audio = new Audio('aud/96.mp3');
			audio.play();}
		if (number == 97) {numletra = "Ninety-Seven";var audio = new Audio('aud/97.mp3');
			audio.play();}
		if (number == 98) {numletra = "Ninety-Eight";var audio = new Audio('aud/98.mp3');
			audio.play();}
		if (number == 99) {numletra = "Ninety-Nine";var audio = new Audio('aud/99.mp3');
			audio.play();}
		if (number == 100) {numletra = "One Hundred" ;var audio = new Audio('aud/100.mp3');
			audio.play(); findeJuego();  }

		document.getElementById("Mostrarnumerol").innerHTML = numletra;

	}

}

setInterval("main()", velocidad);
