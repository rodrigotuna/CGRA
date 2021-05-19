import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyRock} from './MyRock.js';


  /**MyRockSet
   * @method constructor
   * @param scene - Reference to MyScene object
   * @param numRocks - Number of rocks in a set 
   */
export class MyRockSet extends CGFobject {
    constructor(scene, numRocks) {
        super(scene);

        this.numRocks = numRocks;

        this.init();
        this.initMaterials();
    }

    init(){
        this.rockArray = [];
        this.rockPosition = [];
        this.rockSize = [];
        for(var i = 0; i < this.numRocks; i++){
            this.rockArray.push(new MyRock(this.scene, 10, 10));
            this.rockPosition.push(50 * Math.random() - 25, 1.0, 50 * Math.random() - 25);
            this.rockSize.push(0.02*Math.random() + 0.10, 0.02*Math.random() + 0.10, 0.02*Math.random() + 0.10);
        }
    }
    initMaterials(){
        this.rockAppearance = new CGFappearance(this.scene);
        this.rockAppearance.setAmbient(0.41, 0.43, 0.55, 0.3);
        this.rockAppearance.setDiffuse(0.41, 0.43, 0.55, 1.0);
        this.rockAppearance.setSpecular(0.41, 0.43, 0.55, 0.8);
        this.rockAppearance.setShininess(15.0);
    }

    getRockPositions(){
        return this.rockPosition;
    }

    getRockAppearance(){
        return this.rockAppearance;
    }

    removeRock(val){
        this.numRocks--;
        return this.rockArray.splice(val,1);
    }

    removeRockPosition(val){
        return this.rockPosition.splice(val,3);
    }

    removeRockSize(val){
        return this.rockSize.splice(val,3);
    }

    addRock(val){
        this.numRocks++;
        this.rockArray.push(val);
    }

    addRockPosition(val){
        this.rockPosition.push(val[0], val[1], val[2]);
    }

    addRockSize(val){
        this.rockSize.push(val[0], val[1], val[2]);
    }

    display(){
        this.rockAppearance.apply();

        for(var i = 0; i < this.numRocks; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.rockPosition[3*i], this.rockPosition[3*i + 1], this.rockPosition[3*i + 2]);
            this.scene.scale(this.rockSize[3*i], this.rockSize[3*i + 1], this.rockSize[3*i + 2]);
            this.rockArray[i].display();
            this.scene.popMatrix();
        }
    }


}