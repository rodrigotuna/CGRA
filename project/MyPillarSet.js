import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyPillar} from './MyPillar.js';
/**
* MyPillarSet
* @method constructor
 * @param scene - Reference to MyScene object
*/
export class MyPillarSet extends CGFobject {
    constructor(scene) {
        super(scene);

        this.init();
    }

    init(){
        this.pillarArray = [
            new MyPillar(this.scene, 3.0, 0.0),
            new MyPillar(this.scene, 3.0, -3.5),
            new MyPillar(this.scene, 20.0, 0.0),
            new MyPillar(this.scene, 20.0, -3.5),
        ]

    }

    display(){
        for(var i = 0; i < 4; i++){
          this.pillarArray[i].display();
        }
    }


}