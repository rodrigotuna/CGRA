import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTangram } from "./MyTangram.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallegram = new MyParallelogram(this);
    this.triangleSmall = new MyTriangleSmall(this);
    this.triangleBig = new MyTriangleBig(this);
    this.tangram = new MyTangram(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayDiamond = false;
    this.displayTriangle = false;
    this.displayParallelogram = false;
    this.displayTriangleSmall = false;
    this.displayTriangleBig = false;
    this.displayTangram = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 0.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setBlueAppearance() {
    this.setAmbient(0.2, 0.7, 0.9, 1.0);
    this.setDiffuse(0.2, 0.7, 0.9, 1.0);
    this.setSpecular(0.2, 0.7, 0.9, 1.0);
    this.setShininess(10.0);
  }
  setRedAppearance() {
    this.setAmbient(0.8, 0.0, 0.0, 1.0);
    this.setDiffuse(0.8, 0.0, 0.0, 1.0);
    this.setSpecular(0.8, 0.0, 0.0, 1.0);
    this.setShininess(10.0);
  }
  setGreenAppearance() {
    this.setAmbient(0.0, 0.8, 0.0, 1.0);
    this.setDiffuse(0.0, 0.8, 0.0, 1.0);
    this.setSpecular(0.0, 0.8, 0.0, 1.0);
    this.setShininess(10.0);
  }
  setYellowAppearance() {
    this.setAmbient(0.9, 0.8, 0.0, 1.0);
    this.setDiffuse(0.9, 0.8, 0.0, 1.0);
    this.setSpecular(0.9, 0.8, 0.0, 1.0);
    this.setShininess(10.0);
  }
  setPinkAppearance() {
    this.setAmbient(0.8, 0.3, 0.4, 1.0);
    this.setDiffuse(0.8, 0.3, 0.4, 1.0);
    this.setSpecular(0.8, 0.3, 0.4, 1.0);
    this.setShininess(10.0);
  }
  setPurpleAppearance() {
    this.setAmbient(0.5, 0.0, 0.5, 1.0);
    this.setDiffuse(0.5, 0.0, 0.5, 1.0);
    this.setSpecular(0.5, 0.0, 0.5, 1.0);
    this.setShininess(10.0);
  }
  setOrangeAppearance() {
    this.setAmbient(0.9, 0.4, 0.0, 1.0);
    this.setDiffuse(0.9, 0.4, 0.0, 1.0);
    this.setSpecular(0.9, 0.4, 0.0, 1.0);
    this.setShininess(10.0);
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

<<<<<<< HEAD
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
      Math.sqrt(3.5*3.5/2) + 1,
      0.0,
      1.0
    ];

    this.pushMatrix();
    this.multMatrix(trans);
    this.diamond.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(Math.sqrt(2.0),Math.sqrt(2.0),0.0);
    this.rotate(-Math.PI/4*5,0.0,0.0,1.0);
    this.triangleBig.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(0.0,Math.sqrt(2.0)-0.8,0.0);
    this.rotate(Math.PI/2,0.0,0.0,1.0);
    this.triangleBig.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-Math.sqrt(2.0),0.0,0.0);
    this.rotate(-3*Math.PI/4,0.0,0.0,1.0);
    this.triangle.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-2*Math.sqrt(2.0),-Math.sqrt(2.0),0.0);
    this.rotate(Math.PI/4,0.0,0.0,1.0);
    this.triangleSmall.display();
    this.popMatrix();

    this.pushMatrix();
    this.scale(-1,1,1);
    this.rotate(Math.PI/4,0.0,0.0,1.0);
    this.translate(-3,-1,0);
    this.parallegram.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(Math.sqrt(Math.sqrt(2.0) + 1.0),-2*Math.sqrt(2.0)-0.15,0.0);
    this.rotate(3*Math.PI/4,0.0,0.0,1.0);
    this.triangleSmall.display();
    this.popMatrix();
    
=======
>>>>>>> 34ff4b84e12508ed3981b31e4d883902bd137341
    // ---- BEGIN Primitive drawing section
    
    if(this.displayDiamond) this.diamond.display();
    if(this.displayTriangle) this.triangle.display();
    if(this.displayParallelogram) this.parallegram.display();
    if(this.displayTriangleSmall) this.triangleSmall.display();
    if(this.displayTriangleBig) this.triangleBig.display();
    if(this.displayTangram) this.tangram.display();

    // ---- END Primitive drawing section
  }
}
