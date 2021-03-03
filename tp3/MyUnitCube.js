import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5,
			-0.5, -0.5, -0.5,
			-0.5, -0.5, -0.5,
			-0.5, 0.5, -0.5,
			-0.5, 0.5, -0.5,
			-0.5, 0.5, -0.5,
			0.5, 0.5, -0.5,	
			0.5, 0.5, -0.5,
			0.5, 0.5, -0.5,
			0.5, -0.5, -0.5,
			0.5, -0.5, -0.5,
			0.5, -0.5, -0.5,
			-0.5, -0.5, 0.5,
			-0.5, -0.5, 0.5,
			-0.5, -0.5, 0.5,
			-0.5, 0.5, 0.5,
			-0.5, 0.5, 0.5,
			-0.5, 0.5, 0.5,
			0.5, 0.5, 0.5,
			0.5, 0.5, 0.5,
			0.5, 0.5, 0.5,
			0.5, -0.5, 0.5,
			0.5, -0.5, 0.5,
			0.5, -0.5, 0.5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 3, 6, //z
			12, 15, 3, //x
			21, 12, 0, //y
			0, 6, 9, //z
			12, 3, 0, //x
			21, 0, 9, //y
			12, 21, 18, //z
			18, 21, 9, //x
			15, 18, 6, //y
			18, 15, 12, //z		
            18, 9, 6, //x
            15, 6, 3 //y
		];

		this.normals = [];

		for(var i = 0; i < 36; i+= 3){
			this.normals.push(2*this.vertices[3*i], 0, 0);
			this.normals.push(0,2*this.vertices[3*i+1],0);
			this.normals.push(0, 0, 2*this.vertices[3*i + 2]);
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}