engine.Math = {}

engine.Math.Vector2 = class {
	constructor(x,y){
		this.x = x || 0
		this.y = y || 0
		this.magnitude = Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))
	}
	// class functions
	toVector3(){
		return new _.Math.Vector3(this.x,this.y,0)
	}

	// statics
	static up(){
		return _.Math.Vector2.new(0,1)
	}
	static down(){
		return _.Math.Vector2.new(0,-1)
	}
	static left(){
		return _.Math.Vector2.new(-1,0)
	}
	static right(){
		return _.Math.Vector2.new(1,0)
	}
	static zero(){
		return _.Math.Vector2.new(0,0)
	}

	// operators
	static new(x,y){
		return new _.Math.Vector2(x,y)
	}
	static add(vec1,vec2){
		return _.Math.Vector2.new(vec1?.x+vec2?.x||0,vec1?.y+vec2?.y||0)
	}
	static subtract(vec1,vec2){
		return _.Math.Vector2.new(vec1?.x-vec2?.x||0,vec1?.y-vec2?.y||0)
	}
	static divide(vec1,vec2){
		return _.Math.Vector2.new(vec1?.x/vec2?.x||0,vec1?.y/vec2?.y||0)
	}
}

engine.Math.Vector3 = class {
	constructor(x,y,z){
		this.x = x
		this.y = y
		this.z = z
	}
	toVector2(){
		return new _.Math.Vector2(this.x,this.y,0)
	}
}