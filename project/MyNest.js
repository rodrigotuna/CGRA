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

    init(){
        this.numRocks = 0;
        this.rockArray = [];
        this.rockPosition = [];
        this.rockSize = [];
    }

    addRock(val){
        this.numRocks++;
        this.rockArray.push(val);
    }

    addRandomRockPosition(){
        var r = Math.random() * this.radius;
        var theta = Math.random() * 2 * Math.PI;
        this.rockPosition.push(this.centerCoords[0] + r * Math.sin(theta), this.centerCoords[1], this.centerCoords[2] + r * Math.cos(theta));
    }

    addRockSize(val){
        this.rockSize.push(val[0], val[1], val[2]);
    }

    getRadius(){
        return this.radius;
    }

    getCenterCoords(){
        return this.centerCoords;
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