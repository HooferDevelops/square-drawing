var testCanvas = new engine.Canvas("testCanvas",_.Math.Vector2.new(480*1.5,270*1.5),false)

var mainFrame = new _.UI.Frame()
_.UI.UIRegistry.exportUI(mainFrame)
mainFrame.name = "squareTest"
mainFrame.position = _.Math.Vector2.new(0,0)
mainFrame.size = _.Math.Vector2.new(480*1.5,270*1.5-20)
mainFrame.color = "rgb(245,245,245)"
mainFrame.draggable = false
var creditsFrame = new _.UI.Frame()
creditsFrame.setParent(mainFrame)
creditsFrame.position = _.Math.Vector2.new(0,270*1.5-20)
creditsFrame.size = _.Math.Vector2.new(480*1.5/2,20)
var creditsLabel = new _.UI.Text()
creditsLabel.text = "made by Hoofer - hooferdevelops.github.io"
creditsLabel.setParent(creditsFrame)
creditsLabel.position = _.Math.Vector2.new(0,3)
creditsLabel.size = 12
creditsFrame.onMouse1Down(function(){
	window.open("https://hooferdevelops.github.io");
})
var sourceFrame = new _.UI.Frame()
sourceFrame.setParent(mainFrame)
sourceFrame.position = _.Math.Vector2.new((480*1.5)/2,270*1.5-20)
sourceFrame.size = _.Math.Vector2.new(480*1.5/2,20)
var sourceLabel = new _.UI.Text()
sourceLabel.text = "source code"
sourceLabel.setParent(sourceFrame)
sourceLabel.position = _.Math.Vector2.new(480*1.5/2-75,3)
sourceLabel.size = 12
creditsFrame.onMouse1Down(function(){
	window.open("https://github.com/HooferDevelops/square-drawing");
})


var coloredFrame
var downPosition
mainFrame.onMouse1Down(function(){
	downPosition = _.Mouse.getMousePos()
	coloredFrame = new _.UI.Frame()
	coloredFrame.position = downPosition
	coloredFrame.size = _.Math.Vector2.subtract(_.Mouse.getMousePos(),downPosition)
	coloredFrame.color = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
	coloredFrame.setParent(mainFrame)
})
mainFrame.onMouse1Up(function(){
	downPosition = null
})



_.Mouse.mouseMoved(function(position){
	if (coloredFrame && downPosition){
		coloredFrame.size = _.Math.Vector2.subtract(_.Mouse.getMousePos(),downPosition)
	}
})

testCanvas.setDrawState(function(){})