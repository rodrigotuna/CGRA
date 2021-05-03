import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyPyramid} from './MyPyramid.js';
/**
* Myseaweed
* @constructor
 * @param scene - Reference to MyScene object
 * @param xPos
 * @param zPos
*/
export class MySeaWeed extends CGFobject {
    constructor(scene, xPos, zPos, size) {
        super(scene);
        
        this.xPos = xPos;
        this.zPos = zPos;
        this.size = size;
        
        this.init();
        this.initMaterials();

    }
    init(){
        this.seaweed = new MyPyramid(this.scene, 4, 20);
        this.heights = [];
        for(var i = 0; i < this.size; i++){
            this.heights.push(Math.random()*0.7 + 0.8);
        }
    }
    initMaterials(){
        this.seaweedAppearance = new CGFappearance(this.scene);
        this.seaweedAppearance.setAmbient(0.38, 0.40, 0.18, 0.3);
        this.seaweedAppearance.setDiffuse(0.38, 0.40, 0.18, 1.0);
        this.seaweedAppearance.setSpecular(0.38, 0.40, 0.18, 0.8);
        this.seaweedAppearance.setShininess(15.0);
    }
    display(){
        this.seaweedAppearance.apply();
        
        var angle = 0;
        var inc = 2*Math.PI/this.size;


        for(var i = 0; i < this.size; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.xPos + 0.2*Math.cos(angle), 1.0, this.zPos + 0.2*Math.sin(angle));
            this.scene.scale(0.1,  this.heights[i], 0.1);
            this.scene.rotate(Math.PI/2, 0.0, 1.0, 0.0);
            this.seaweed.display();
            this.scene.popMatrix();
            angle += inc;
        }
    }
}