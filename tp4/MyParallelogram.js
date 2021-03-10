import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			2, 0, 0,	//1
            3, 1, 0,	//2
			1, 1, 0,    //3
			0, 0, 0,	
			2, 0, 0,
            3, 1, 0,
            1, 1, 0
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 1, 2,
            2, 3, 0,
			6, 5, 4,
            4, 7, 6,
		];

		this.normals = [];
		for(var i = 0; i < 4; i++){
			this.normals.push(0,0,-1);
		}
		for(var i = 0; i < 4; i++){
			this.normals.push(0,0,1);
		}

		this.texCoords = [
			0.25,0.75,
			0.75, 0.75,
			1.0,1.0,
			0.5, 1.0,
			0.25,0.75,
			0.75, 0.75,
			1.0,1.0,
			0.5, 1.0
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}