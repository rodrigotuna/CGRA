import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyPlane} from './MyPlane.js'

  /**MyWaterSurface
   * @method constructor
   * @param scene - Reference to MyScene object
   * @param nDivs - Number of divisions in both directions of the WaterSurface
   * @param width - Width of the WaterSurface Plane
   * @param height - Height of the WaterSurface Plane
   */
export class MyWaterSurface extends CGFobject{
    constructor(scene, nDivs, width, height) {
        super(scene);

        this.nDivs = nDivs;
        this.width = width;
        this.height = height;

        this.init();
    }
    /**
     * @method init
     * Initializes the classes objects
    */
    init(){
        this.plane = new MyPlane(this.scene, this.nDivs, 0, 1, 0, 1);
    }

    /**
     * @method display
     * Displays the water surface
     */
    display(){
        this.scene.pushMatrix();
        this.scene.translate(0.0, 10.0, 0.0);
        this.scene.rotate(Math.PI/2, 1.0, 0.0, 0.0);
        this.scene.scale(this.width, this.height, 1.0);
        this.plane.display();
        this.scene.popMatrix();
    }
} 