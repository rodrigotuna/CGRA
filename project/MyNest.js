import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyRock} from './MyRock.js';

/**
* MyNest
* @method constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the nest
 * @param centerCoords - Coordinates of the center of the nest
*/
export class MyNest extends CGFobject {
    constructor(scene, radius, centerCoords) {
        super(scene);

        this.radius = radius;
        this.centerCoords = centerCoords;

        this.init();
    }
    /**
     * @method init
     * Initializes the useful nest variables
     */
    init(){
        this.numRocks = 0;
        this.rockArray = [];
        this.rockPosition = [];
        this.rockSize = [];
    }

    /**
     * @method addRock 
     * @param val rock to be added
     * Adds rock to the nest 
     */
    addRock(val){
        this.numRocks++;
        this.rockArray.push(val);
    }

    /**
     * @method addRandomRockPosition
     * Chooses a random position inside the nest for the rock to be placed in
     */
    addRandomRockPosition(){
        var r = Math.random() * this.radius;
        var theta = Math.random() * 2 * Math.PI;
        this.rockPosition.push(this.centerCoords[0] + r * Math.sin(theta), this.centerCoords[1], this.centerCoords[2] + r * Math.cos(theta));
    }
    /**
     * @method addRockSize
     * @param val rock size
     * Adds rock size to the nest
     */
    addRockSize(val){
        this.rockSize.push(val[0], val[1], val[2]);
    }

    /**
     * @method getRadius
     * @return Nest's radius
     */
    getRadius(){
        return this.radius;
    }

    /**
     * @method getCenterCoords
     * @return Nest's center coordinates
     */
    getCenterCoords(){
        return this.centerCoords;
    }

    /**
     * @method display
     * Displays the rocks inside the nest
     */
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