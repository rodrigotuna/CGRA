import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyCubeMap
 * @method constructor
 * @param scene - Reference to MyScene object
 * @param textureList - List of textures for each side of the cube
 */
export class MyCubeMap extends CGFobject {
	constructor(scene, textureList) {
		super(scene);
        this.init();
        this.textureList = textureList;
        this.initMaterials();

	}
	
    /**
     * @method init
     * Initializes the cube map plane
     */
	init() {
        this.quad = new MyQuad(this.scene);
    }

    /**
     * @method initMaterials
     * Initializes the default material appearance to set the different textures 
     */
    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.material.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.material.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.material.setEmission(1.0, 1.0, 1.0, 1.0);
        this.material.setShininess(10.0);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }
    /**
     * @method display
     * Displays the different cubemap faces
     */
    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(50,50,50);

        //Cubemap top face (+y)
        this.material.setTexture(this.textureList[0]);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        //Cubemap bottom face (-y)
        this.material.setTexture(this.textureList[1]);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        //Cubemap front face (+z)
        this.material.setTexture(this.textureList[2]);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.scene.rotate(-Math.PI,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Cubemap back face (-z)
        this.material.setTexture(this.textureList[3]);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.quad.display();
        this.scene.popMatrix();

        //Cubemap right face (+x)
        this.material.setTexture(this.textureList[4]);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Cubemap left face (-x)
        this.material.setTexture(this.textureList[5]);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.popMatrix();
    }
}