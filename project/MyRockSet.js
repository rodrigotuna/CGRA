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
    }

    /**
     * @method init
     * Initializes the classes objects and useful parameters
    */
    init(){
        this.rockArray = [];
        this.rockPosition = [];
        this.rockSize = [];
        for(var i = 0; i < this.numRocks; i++){ //Creates rocks
            this.rockArray.push(new MyRock(this.scene, 10, 10));
            this.rockPosition.push(50 * Math.random() - 25, 1.0, 50 * Math.random() - 25);
            this.rockSize.push(0.02*Math.random() + 0.10, 0.02*Math.random() + 0.10, 0.02*Math.random() + 0.10);
        }
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
        for(var i = 0; i < this.numRocks; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.rockPosition[3*i], this.rockPosition[3*i + 1], this.rockPosition[3*i + 2]);
            this.scene.scale(this.rockSize[3*i], this.rockSize[3*i + 1], this.rockSize[3*i + 2]);
            this.rockArray[i].display();
            this.scene.popMatrix();
        }
    }


}