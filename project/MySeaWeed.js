import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyPyramid} from './MyPyramid.js';
/**
* Myseaweed
* @constructor
 * @param scene - Reference to MyScene object
 * @param xPos - X coordinate
 * @param zPos - Z coordinate
 * @param size - Number of leaves in each seaweed
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
        this.seaweedShader = new CGFshader(this.scene.gl, "shaders/seaweed.vert", "shaders/seaweed.frag");
        this.seaweedShader.setUniformsValues({ randFactor: 0.7*Math.random() + 0.7});
    }

    updateAnimation(t){
        this.timeFactor = t;
        this.seaweedShader.setUniformsValues({ timeFactor: this.timeFactor / 100 % 100});
    }


    display(){
        this.scene.setActiveShader(this.seaweedShader);
        
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

        this.scene.setActiveShader(this.scene.defaultShader);
    
    }
}