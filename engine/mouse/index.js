engine.Mouse = class {
	static mousePosition = _.Math.Vector2.new(0,0)
	static mousePositionHooks = []
	static mouseDownHooks = []
	static mouseUpHooks = []

	static mousePositionHook(e){
		_.Mouse.mousePosition.x = e.clientX;
		_.Mouse.mousePosition.y = e.clientY;

		_.Mouse.mousePositionHooks.forEach((h)=>{
			var cpos = _.globalCanvas.canvasFrame.getBoundingClientRect();
			var gpos = _.Math.Vector2.new(_.Mouse.mousePosition.x,_.Mouse.mousePosition.y);

			try {
				if (gpos.x < cpos.right && gpos.y < cpos.bottom){
					h(_.Mouse.getMousePos());
				}
			} catch {}
		})
	}

	static mousePressHook(e){
		if (e.buttons >= 1){
			// down
			_.Mouse.mouseDownHooks.forEach((h)=>{
				try {
					h(e)
				} catch {}
			})
		} else {
			// up
			_.Mouse.mouseUpHooks.forEach((h)=>{
				try {
					h(e)
				} catch {}
			})
		}
	}

	static getMousePos() {
			var rect = _.globalCanvas.canvasFrame.getBoundingClientRect();
			return _.Math.Vector2.new(_.Mouse.mousePosition.x - rect.left,_.Mouse.mousePosition.y - rect.top);
	}

	static mouseMoved(func){
		if (!func)
			return console.warn("Didn't provide a function for mouse move invoke.");
		_.Mouse.mousePositionHooks.push(func)
	}

	static mouseButtonDown(func){
		_.Mouse.mouseDownHooks.push(func)
	}
	static mouseButtonUp(func){
		_.Mouse.mouseUpHooks.push(func)
	}
}
document.onmousedown = _.Mouse.mousePressHook
document.onmouseup = _.Mouse.mousePressHook
document.onmousemove = _.Mouse.mousePositionHook