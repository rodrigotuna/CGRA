import {CGFobject} from '../lib/CGF.js';
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
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallegram = new MyParallelogram(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
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
            Math.sqrt(8.0)*(0.5/4),
            Math.sqrt(3.5*3.5/2) + 3*Math.sqrt(2.0)/4,
            0.0,
            1.0
          ];
      
          this.scene.pushMatrix();
          this.scene.multMatrix(trans);
          this.scene.setGreenAppearance();
          this.diamond.display();
          this.scene.popMatrix();
      
          this.scene.pushMatrix();
          this.scene.translate(Math.sqrt(2.0),Math.sqrt(2.0),0.0);
          this.scene.rotate(-Math.PI/4*5,0.0,0.0,1.0);
          this.scene.setBlueAppearance();
          this.triangleBig.display();
          this.scene.popMatrix();
      
          this.scene.pushMatrix();
          this.scene.translate(0.0,Math.sqrt(2.0)-0.8,0.0);
          this.scene.rotate(Math.PI/2,0.0,0.0,1.0);
          this.scene.setOrangeAppearance();
          this.triangleBig.display();
          this.scene.popMatrix();
      
          this.scene.pushMatrix();
          this.scene.translate(-Math.sqrt(2.0),0.0,0.0);
          this.scene.rotate(-3*Math.PI/4,0.0,0.0,1.0);
          this.scene.setPinkAppearance();
          this.triangle.display();
          this.scene.popMatrix();
      
          this.scene.pushMatrix();
          this.scene.translate(-2*Math.sqrt(2.0),-Math.sqrt(2.0),0.0);
          this.scene.rotate(Math.PI/4,0.0,0.0,1.0);
          this.scene.setRedAppearance();
          this.triangleSmall.display();
          this.scene.popMatrix();
      
          this.scene.pushMatrix();
          this.scene.scale(-1,1,1);
          this.scene.rotate(Math.PI/4,0.0,0.0,1.0);
          this.scene.translate(-3,-1,0);
          this.scene.setYellowAppearance();
          this.parallegram.display();
          this.scene.popMatrix();
      
          this.scene.pushMatrix();
          this.scene.translate(Math.sqrt(Math.sqrt(2.0) + 1.0),-2*Math.sqrt(2.0)-0.15,0.0);
          this.scene.rotate(3*Math.PI/4,0.0,0.0,1.0);
          this.scene.setPurpleAppearance();
          this.triangleSmall.display();
          this.scene.popMatrix();
    }
}
