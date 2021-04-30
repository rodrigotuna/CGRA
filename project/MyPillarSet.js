import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyPillar} from './MyPillar.js';

export class MyPillarSet extends CGFobject {
    constructor(scene) {
        super(scene);

        this.init();
        this.initMaterials();
    }

    init(){
        this.pillarArray = [
            new MyPillar(this.scene, 3.0, 0.0),
            new MyPillar(this.scene, 3.0, -3.5),
            new MyPillar(this.scene, 20.0, 0.0),
            new MyPillar(this.scene, 20.0, -3.5),
        ]

    }
    initMaterials(){
        this.pillarAppearance = new CGFappearance(this.scene);

        this.pillarTexture = new CGFtexture(this.scene, "images/woodtexture.jpg");
        this.pillarAppearance.setTexture(this.pillarTexture);
        this.pillarAppearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){
        for(var i = 0; i < 4; i++){
          this.pillarArray[i].display();
        }
    }


}