import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import {MyTriangle} from './MyTriangle.js';

/**
* MyFish
* @method constructor
 * @param scene - Reference to MyScene object
*/
export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        this.init();
        this.initMaterials();
    }

    /**
     * @method init
     * Initializes the fish shapes and useful variables
    */
    init(){
        this.triangle = new MyTriangle(this.scene);
        this.sphere = new MySphere(this.scene,20,20);
        this.tailAngle = 0.0;
        this.finAngle = 0.0;

        this.tailSpeed = 1;

        this.rightFinMoving = true; //Flag that activates/deactivates the right fin animation
        this.leftFinMoving = true; //Flag that activates/deactivates the left fin animation

        this.tailTilting = 0;
    }

    /**
     * @method updateAnimation
     * @param t Time
     * Updates the fish tail and fin animation
     */
    updateAnimation(t){
        this.tailAngle = Math.PI/9 * Math.sin(0.01*t*this.tailSpeed);
        this.finAngle = Math.PI/9 * Math.sin(0.005*t);
    }

    /**
     * @method initMaterials
     * Initializes the different fish materials, textures and shader
     */
    initMaterials(){
        this.fishAppearance = new CGFappearance(this.scene);
        this.fishAppearance.setAmbient(0.89, 0.45, 0.36, 0.3);
        this.fishAppearance.setDiffuse(0.89, 0.45, 0.36, 1.0);
        this.fishAppearance.setSpecular(0.89, 0.45, 0.36, 0.5);
        this.fishAppearance.setShininess(15.0);

        this.fishBody= new CGFappearance(this.scene);

        this.fishTexture = new CGFtexture(this.scene, "images/fishtexture.jpg");
        this.fishBody.setTexture(this.fishTexture);
        this.fishBody.setTextureWrap('REPEAT', 'REPEAT');
        
        this.fishEyeAppearance = new CGFappearance(this.scene);
        this.fishEyeAppearance.setAmbient(1.0, 1.0, 1.0, 0.3);
        this.fishEyeAppearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.fishEyeAppearance.setSpecular(1.0, 1.0, 1.0, 0.8);
        this.fishEyeAppearance.setShininess(15.0);
        
        this.fishEyeTexture = new CGFtexture(this.scene, "images/fisheyetexture.png");
        this.fishEyeAppearance.setTexture(this.fishEyeTexture);
        this.fishEyeAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.fishShader = new CGFshader(this.scene.gl, "shaders/fish.vert", "shaders/fish.frag");
    }

    /**
     * @method startRightMovement 
     * Updates the right movement variables to start the correspondent fin and tail animations
     */
    startRightMovement(){
        this.rightFinMoving = false;
        this.tailTilting = 1;
    }
    /**
     * @method startLeftMovement 
     * Updates the left movement variables to start the correspondent fin and tail animations
     */
    startLeftMovement() {
        this.leftFinMoving = false;
        this.tailTilting = -1;
    }
    /**
     * @method stopRightMovement 
     * Updates the right movement variables to stop the correspondent fin and tail animations
     */
    stopRightMovement(){
        this.rightFinMoving = true;
        this.tailTilting = 0;
    }
    /**
     * @method stopLeftMovement 
     * Updates the right movement variables to stop the correspondent fin and tail animations
     */
    stopLeftMovement() {
        this.leftFinMoving = true;
        this.tailTilting = 0;
    }
    /**
     * @method updateTailSpeed
     * @param val Speed Delta
     * Updates the tail speed animation according to the fish overall speed
     */
    updateTailSpeed(val){
        this.tailSpeed = val > 0 ? val : 1;
    }
    /**
     * @method display
     * Displays all the fish components
     */
    display(){
        this.fishAppearance.apply();
        //Fish Tail
        this.scene.pushMatrix();
        this.scene.translate(0.25,0.0,0.0);
        this.scene.rotate(this.tailAngle + this.tailTilting * Math.PI/6 , 0.0, 1.0, 0.0);
        this.scene.scale(0.15,0.15,0.15);
        this.scene.rotate(Math.PI/4, 0.0, 0.0, -1.0);
        this.triangle.display();
        this.scene.popMatrix();

        //Fish Upper Fin
        this.scene.pushMatrix();
        this.scene.translate(0.08,0.18,0.0);
        this.scene.scale(0.08,0.08,0.08);
        this.scene.rotate(Math.PI/2, 0.0, 0.0, 1.0);
        this.triangle.display();
        this.scene.popMatrix();

        //Fish Left Fin
        this.scene.pushMatrix();
        this.scene.translate(-0.06,-0.05,0.115);
        this.scene.scale(0.08,0.08,0.08);
        this.scene.rotate(Math.PI/6 + this.finAngle * this.leftFinMoving, -1.0, 0.0, 0.0);
        this.scene.translate(0.0, -2.0, 0.0);
        this.triangle.display();
        this.scene.popMatrix();

        //Fish Right Fin
        this.scene.pushMatrix();
        this.scene.translate(-0.06,-0.05,-0.115);
        this.scene.scale(0.08,0.08,0.08);
        this.scene.rotate(Math.PI/6 + this.finAngle * this.rightFinMoving, 1.0, 0.0, 0.0);
        this.scene.translate(0.0, -2.0, 0.0);
        this.triangle.display();
        this.scene.popMatrix();

        this.fishEyeAppearance.apply();

        //Fish Left Eye
        this.scene.pushMatrix();
        this.scene.translate(-0.125, 0.05, 0.09);
        this.scene.scale(0.035,0.035,0.035);
        this.scene.rotate(Math.PI/2, 1.0, 0.25, 0.50);
        this.sphere.display();
        this.scene.popMatrix();

        //Fish Right Eye
        this.scene.pushMatrix();
        this.scene.translate(-0.125, 0.05, -0.09);
        this.scene.scale(0.035,0.035,0.035);
        this.scene.rotate(Math.PI/2, -1.0, 0.25, 0.50);
        this.sphere.display();
        this.scene.popMatrix();

        this.fishBody.apply();
        this.scene.setActiveShader(this.fishShader);

        //Fish Body 
        this.scene.pushMatrix();
        this.scene.scale(0.25,0.20,0.125);
        this.scene.rotate(Math.PI/2, 0.0, 0.0, 1.0);
        this.sphere.display();
        this.scene.popMatrix();

    }


}
