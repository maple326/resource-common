
export default class Bullet{
	constructor(left, top, angle){   //接收发射器传过来的值  

		this.create();
		this.left = left;
		this.top = top;
		this.bullet.style.left = left + 'px';   //粒子的位置和红色div的位置相同
		this.bullet.style.top = top + 'px';
	 
	 	
		let iSpeed = Math.floor(Math.random()*20 + 10);
		let iRad = Math.PI / 180  * angle;
		
		let iSpeedX = Math.cos(iRad) * iSpeed;  //计算水平方向的速度
		let iSpeedY = Math.sin(iRad) * iSpeed;
		
		this.iSpeedX = iSpeedX;
		this.iSpeedY = iSpeedY;
		
		this.move();
		
	};
	
	create(){
		 let oDiv = document.createElement('div');
		 
		 oDiv.className = 'bullet';
		 
		 document.body.appendChild(oDiv);
		 
		let r = Math.floor(Math.random()*255).toString(16),
			g = Math.floor(Math.random()*255).toString(16),
			b = Math.floor(Math.random()*255).toString(16);
		let color =  (r.length < 2 ? '0'+ r : r) + (g.length<2 ? '0'+ g: g) + (b.length < 2 ? '0' + b : b);
		
		 oDiv.style.background = '#' + color;
		 
		 this.bullet = oDiv;

	};
	
	move(){
		
		// 箭头函数改变this的指向
		let iTimer = setInterval(() => {
			this.bullet.style.left  = this.bullet.offsetLeft  + this.iSpeedX + 'px';
			this.bullet.style.top   = this.bullet.offsetTop   +  this.iSpeedY + 'px';
			
			if( this.bullet.offsetLeft < this.left - 140 
			    || this.bullet.offsetTop < this.top - 100 
			    || this.bullet.offsetLeft > document.documentElement.clientWidth-10
			    || this.bullet.offsetTop > this.top + 100 
			){
				clearInterval(iTimer);
				document.body.removeChild(this.bullet);
			}
		}, 50);
    };
};
