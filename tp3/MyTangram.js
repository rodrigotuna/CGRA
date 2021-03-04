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

        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(0.8, 0.0, 0.0, 0.5);
        this.redMaterial.setDiffuse(0.8, 0.0, 0.0, 0.5);
        this.redMaterial.setSpecular(0.8, 0.0, 0.0, 1.0);
        this.redMaterial.setShininess(10.0);

        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.setAmbient(0.9, 0.4, 0.0, 0.5);
        this.orangeMaterial.setDiffuse(0.9, 0.4, 0.0, 0.5);
        this.orangeMaterial.setSpecular(0.9, 0.4, 0.0, 1.0);
        this.orangeMaterial.setShininess(10.0);

        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(0.9, 0.8, 0.0, 0.5);
        this.yellowMaterial.setDiffuse(0.9, 0.8, 0.0, 0.5);
        this.yellowMaterial.setSpecular(0.9, 0.8, 0.0, 1.0);
        this.yellowMaterial.setShininess(10.0);

        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setAmbient(0.2, 0.7, 0.9, 0.5);
        this.blueMaterial.setDiffuse(0.2, 0.7, 0.9, 0.5);
        this.blueMaterial.setSpecular(0.2, 0.7, 0.9, 1.0);
        this.blueMaterial.setShininess(10.0);

        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.setAmbient(0.5, 0.0, 0.5, 0.5);
        this.purpleMaterial.setDiffuse(0.5, 0.0, 0.5, 0.5);
        this.purpleMaterial.setSpecular(0.5, 0.0, 0.5, 1.0);
        this.purpleMaterial.setShininess(10.0);

        this.pinkMaterial = new CGFappearance(this.scene);
        this.pinkMaterial.setAmbient(0.8, 0.3, 0.4, 0.5);
        this.pinkMaterial.setDiffuse(0.8, 0.3, 0.4, 0.5);
        this.pinkMaterial.setSpecular(0.8, 0.3, 0.4, 1.0);
        this.pinkMaterial.setShininess(10.0);

        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.setAmbient(0.0, 0.8, 0.0, 0.5);
        this.greenMaterial.setDiffuse(0.0, 0.8, 0.0, 0.5);
        this.greenMaterial.setSpecular(0.0, 0.8, 0.0, 1.0);
        this.greenMaterial.setShininess(10.0);
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
          
          this.greenMaterial.apply();
          this.scene.pushMatrix();
          this.scene.multMatrix(trans);
          this.diamond.display();
          this.scene.popMatrix();
      
          this.blueMaterial.apply();
          this.scene.pushMatrix();
          this.scene.translate(Math.sqrt(2.0),Math.sqrt(2.0),0.0);
          this.scene.rotate(-Math.PI/4*5,0.0,0.0,1.0);
          this.triangleBig.display();
          this.scene.popMatrix();
      
          this.orangeMaterial.apply();
          this.scene.pushMatrix();
          this.scene.translate(0.0,2.0 - Math.sqrt(2.0),0.0);
          this.scene.rotate(Math.PI/2,0.0,0.0,1.0);
          this.triangleBig.display();
          this.scene.popMatrix();
      
          this.pinkMaterial.apply();
          this.scene.pushMatrix();
          this.scene.translate(-Math.sqrt(2.0),0.0,0.0);
          this.scene.rotate(-3*Math.PI/4,0.0,0.0,1.0);
          this.triangle.display();
          this.scene.popMatrix();
      
          this.redMaterial.apply();
          this.scene.pushMatrix();
          this.scene.translate(-2*Math.sqrt(2.0),-Math.sqrt(2.0),0.0);
          this.scene.rotate(Math.PI/4,0.0,0.0,1.0);
          this.triangleSmall.display();
          this.scene.popMatrix();
      
          this.yellowMaterial.apply();
          this.scene.pushMatrix();
          this.scene.scale(-1,1,1);
          this.scene.rotate(Math.PI/4,0.0,0.0,1.0);
          this.scene.translate(-3,-1,0);
          this.parallelogram.display();
          this.scene.popMatrix();
      
          this.purpleMaterial.apply();
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
