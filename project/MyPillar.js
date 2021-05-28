import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyCylinder} from './MyCylinder.js';
/**
* MyPillar
* @method constructor
 * @param scene - Reference to MyScene object
 * @param xPos - X coordinate of the Pillar
 * @param zPos - Z coordinate of the Pillar
*/
export class MyPillar extends CGFobject {
    constructor(scene, xPos, zPos) {
        super(scene);
        
        this.xPos = xPos;
        this.zPos = zPos;
        
        this.init();
    }
    /**
     * @method init
     * Initializes the pillar cylinder
     */    
    init(){
        this.pillar = new MyCylinder(this.scene,20);
    }
    /**
     * @method display
     * Displays the pillar
     */
    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.xPos, 0.0, this.zPos);
        this.scene.scale(0.5, 10.0, 0.5);
        this.pillar.display();
        this.scene.popMatrix();
    }
}
