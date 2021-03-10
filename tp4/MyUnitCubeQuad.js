import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, textureList) {
		super(scene);
        this.init();
        this.textureList = textureList;
        this.initMaterials();

	}
	
	init() {
        this.quad = new MyQuad(this.scene);
    }
    
    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/default.png');
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){

        this.material.setTexture(this.textureList[0]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();
    
        this.material.setTexture(this.textureList[1]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI,1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        this.material.setTexture(this.textureList[2]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.updateTexCoords([
            0, 0,
            0, 1,
            1, 0,
            1, 1
        ])
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        this.material.setTexture(this.textureList[3]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.updateTexCoords([
            0, 1,
            0, 0,
            1, 1,
            1, 0
        ])
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        this.material.setTexture(this.textureList[4]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.updateTexCoords([
            0, 0,
            1, 0,
            0, 1,
            1, 1
        ])
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        this.material.setTexture(this.textureList[5]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.updateTexCoords([
            0, 1,
			1, 1,
			0, 0,
			1, 0
        ])
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.quad.display();
        this.scene.popMatrix();
    }
}