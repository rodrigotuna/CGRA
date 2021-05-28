import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyPlane} from './MyPlane.js'

  /**MySeaFloor
   * @method constructor
   * @param scene - Reference to MyScene object
   * @param nDivs - Number of divisions in both directions of the SeaFloor
   * @param width - Width of the SeaFloor Plane
   * @param height - Height of the SeaFloor Plane
   * @param maxHeight - Maximum Height of the Sand in the SeaFloor
   */
export class MySeaFloor extends CGFobject{
    constructor(scene, nDivs, width, height, maxHeight) {
        super(scene);

        this.nDivs = nDivs;
        this.width = width;
        this.height = height;
        this.maxHeight = maxHeight;

        this.init();
    }

    init(){
        this.plane = new MyPlane(this.scene, this.nDivs, 0, 1, 0, 1);
    }
    

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, -1.0, 0.0, 0.0);
        this.scene.scale(this.width, this.height, 1.0);
        this.plane.display();
        this.scene.popMatrix();
    }
} 