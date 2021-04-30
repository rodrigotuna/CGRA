import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyCylinder} from './MyCylinder.js';
/**
* MyPillar
* @constructor
 * @param scene - Reference to MyScene object
 * @param xPos
 * @param zPos
*/
export class MyPillar extends CGFobject {
    constructor(scene, xPos, zPos) {
        super(scene);
        
        this.xPos = xPos;
        this.zPos = zPos;
        
        this.init();
        this.initMaterials();

    }
    init(){
        this.pillar = new MyCylinder(this.scene,20);
    }
    initMaterials(){
        this.pillarAppearance = new CGFappearance(this.scene);
        this.pillarAppearance.setAmbient(1.0, 1.0, 1.0, 0.3);
        this.pillarAppearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.pillarAppearance.setSpecular(1.0, 1.0, 1.0, 0.8);
        this.pillarAppearance.setShininess(15.0);

        this.pillarTexture = new CGFtexture(this.scene, "images/woodtexture.jpg");
        this.pillarAppearance.setTexture(this.pillarTexture);
        this.pillarAppearance.setTextureWrap('REPEAT', 'REPEAT');
    }
    display(){
        this.pillarAppearance.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(this.xPos, 0.0, this.zPos);
        this.scene.scale(0.5, 10.0, 0.5);
        this.pillar.display();
        this.scene.popMatrix();
    }
}
