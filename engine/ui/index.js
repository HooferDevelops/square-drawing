engine.UI = {}

engine.UI.UIRegistry = class {
	constructor(){
	}
	static exportUI(ui){
		_.globalUIList = [ui]
	}
}

engine.UI.Frame = class {
	constructor(){
		this.name = "Frame"
		this.size = _.Math.Vector2.new(100,50)
		this.color = "rgb(178, 191, 181)"
		this.position = _.Math.Vector2.new(0,0)
		this.draggable = false
	}

	isMouseInComponent(){
			var mousePosition = _.Mouse.getMousePos()
			var minimumRegion = this.getContextPosition()
			var maximumRegion = _.Math.Vector2.add(this.getContextPosition(), this.size)
			return mousePosition.x >= minimumRegion.x
					&& mousePosition.y >= minimumRegion.y
					&& mousePosition.x <= maximumRegion.x
					&& mousePosition.y <= maximumRegion.y;
	}

	onMouse1Down(func){
		var self = this
		_.Mouse.mouseButtonDown(function(e){
			if (e.button != 0){
				return
			}
			if (self.isMouseInComponent()){
				if (self.draggable){
					self.holdingOffset = _.Math.Vector2.subtract(_.Mouse.getMousePos(), self.position)
				}
				self.isHoldingDown = true
				func(self)
			}
		})
	}

	onMouse1Up(func){
		var self = this
		_.Mouse.mouseButtonUp(function(){
			if (self.isHoldingDown){
				self.isHoldingDown = false
				func(self)
			}
		})
	}

	getContextPosition(){
		var position = this.position
		if (this.parent?.position){
			position = _.Math.Vector2.add(position, this.parent.position)
		}
		return position
	}

	setParent(classElement){
		if (!classElement.children){
			classElement.children = []
		}
		classElement.children.push(this)
		this.parent = classElement
	}

	render(ctx){
		if (this.draggable && this.isHoldingDown && this.holdingOffset){
			this.position = _.Math.Vector2.subtract(_.Mouse.getMousePos(), this.holdingOffset)
		}
		var position = this.position
		if (this.parent?.position){
			position = _.Math.Vector2.add(position,  this.parent.position)
		}
		ctx.fillStyle = `${this.color}`;
		ctx.fillRect(position.x,position.y,this.size.x,this.size.y);
	}
}

engine.UI.Text = class {
	constructor(){
		this.name = "Text"
		this.text = "Default Text"
		this.color = "#000"
		this.size = 12
		this.position = _.Math.Vector2.new(0,0)
	}

	setParent(classElement){
		if (!classElement.children){
			classElement.children = []
		}
		classElement.children.push(this)
		this.parent = classElement
	}

	render(ctx){
		ctx.fillStyle = `${this.color}`;
		ctx.font = `${this.size}px arial`;
		var position = this.position
		if (this.parent?.position){
			position = _.Math.Vector2.add(position,  this.parent.position)
		}
		position = _.Math.Vector2.add(position, _.Math.Vector2.new(0,this.size))
		ctx.fillText(this.text, position.x, position.y);
	}
}