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
			2, 5, 8,
			12, 15, 3, //x
			22, 13, 1,
			2, 8, 11,
			12, 3, 0, //x
			22, 1, 10,
			14, 23, 20,
			18, 21, 9, //x
			16, 19, 7,
			20, 17, 14,	
			18, 9, 6, //x
			16, 7, 4,
		];

		this.normals = [];

		for(var i = 0; i < 24; i+= 3){
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