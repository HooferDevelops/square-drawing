engine.Canvas = class Canvas {
	constructor(canvasId,canvasSize,fullscreen){
		self = this
		this.canvasFrame = document.getElementById(canvasId) || console.error("Invalid Specified Canvas");
		this.canvasContext = this.canvasFrame.getContext("2d");
		this.canvasContext.imageSmoothingEnabled = false;
		this.fullscreenEnabled = fullscreen ? fullscreen : false;
		this.setSize(canvasSize?.x,canvasSize?.y);
		window.onresize = this.screenResized;
		_.globalCanvas = this;
	}

	draw(func){
		this.canvasContext.fillStyle = `rgba(245,255,255,255)`;
		this.canvasContext.fillRect(0,0,this.canvasWidth,this.canvasHeight);
		
		// ui drawing queue
		self = this
		function surfChildren(list){
			list.forEach((ele)=>{
				ele.render(self.canvasContext)
				if (ele?.children){
					surfChildren(ele.children)
				}
			})
		}

		surfChildren(_.globalUIList)
		//_.globalUIList.forEach((root)=>{
		//	root.render(this.canvasContext)
		//})

		if (func){
			func(this);
		}
	}

	setDrawState(func){
		self = this;
		function d(){
			requestAnimationFrame(d);
			self.draw(func);
		}
		d()
	}

	screenResized(){
		if (self.fullscreenEnabled){
			self.setSize(false,false);
		}
	}

	setSize(width,height){
		if (width || height){
			this.fullscreenEnabled = false;
		}
		this.canvasWidth = width ? width : (this.fullscreenEnabled ? window.innerWidth : 100);
		this.canvasHeight = height ? height : (this.fullscreenEnabled ? window.innerHeight : 100);
		this.canvasFrame.width = this.canvasWidth;
		this.canvasFrame.height = this.canvasHeight;
		//this.canvasContext.fillStyle = `rgba(240,255,255,255)`;
		//this.canvasContext.fillRect(0,0,this.canvasWidth,this.canvasHeight);
	}

	drawText(text,fontSize,vectorPosition){
		self.canvasContext.fillStyle = `rgba(0,0,0,255)`;
		this.canvasContext.font = `${fontSize || 12}px arial`;
		this.canvasContext.fillText(text, vectorPosition.x, vectorPosition.y);
	}


}