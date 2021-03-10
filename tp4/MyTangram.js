import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
	}
	
	init() {
        this.initMaterials();

        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
	}

    initMaterials(){
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/tangram.png');
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }
    display(){
        var trans = [
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            Math.sqrt(2.0)/4,
            Math.sqrt(2.0)*3.5/2 + 1,
            0.0,
            1.0
        ];
          
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.multMatrix(trans);
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2.0),0.0,0.0);
        this.scene.rotate(-3*Math.PI/4,0.0,0.0,1.0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-1,1,1);
        this.scene.rotate(Math.PI/4,0.0,0.0,1.0);
        this.scene.translate(-3,-1,0);
        this.parallelogram.display();
        this.scene.popMatrix();
    
        this.triangleBig.updateTexCoords([
        0.0, 0.0,
        1.0, 0.0,
        0.5, 0.5
        ]);
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2.0),Math.sqrt(2.0),0.0);
        this.scene.rotate(-Math.PI/4*5,0.0,0.0,1.0);
        this.triangleBig.display();
        this.scene.popMatrix();
    
        this.triangleBig.updateTexCoords([
            1.0, 0.0,
            0.5, 0.5,
            1.0, 1.0
        ]);
        this.scene.pushMatrix();
        this.scene.translate(0.0,2.0 - Math.sqrt(2.0),0.0);
        this.scene.rotate(Math.PI/2,0.0,0.0,1.0);
        this.triangleBig.display();
        this.scene.popMatrix();
    
        this.triangleSmall.updateTexCoords([
            0.25, 0.75,
            0.5, 0.5,
            0.75, 0.75
        ]);
        this.scene.pushMatrix();
        this.scene.translate(-2*Math.sqrt(2.0),-Math.sqrt(2.0),0.0);
        this.scene.rotate(Math.PI/4,0.0,0.0,1.0);
        this.triangleSmall.display();
        this.scene.popMatrix();
    
        this.triangleSmall.updateTexCoords([
            0.0, 0.0,
            0.25, 0.25,
            0.0, 0.5
        ]);
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2.0),-2*Math.sqrt(2.0),0.0);
        this.scene.rotate(3*Math.PI/4,0.0,0.0,1.0);
        this.triangleSmall.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangleSmall.enableNormalViz();
        this.triangleBig.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangleSmall.disableNormalViz();
        this.triangleBig.disableNormalViz();
    }
}
