import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import {MyTriangle} from './MyTriangle.js';

export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        this.init();
        this.initMaterials();
    }

    init(){
        this.triangle = new MyTriangle(this.scene);
        this.sphere = new MySphere(this.scene,20,20);
    }

    initMaterials(){

        this.finAppearance = new CGFappearance(this.scene);
        this.finAppearance.setAmbient(0.8, 0.0, 0.0, 0.5);
        this.finAppearance.setDiffuse(0.8, 0.0, 0.0, 0.5);
        this.finAppearance.setSpecular(0.8, 0.0, 0.0, 1.0);
        this.finAppearance.setShininess(10.0);

        this.bodyAppearance = new CGFappearance(this.scene);
        this.bodyAppearance.setAmbient(0.0, 0.8, 0.0, 0.5);
        this.bodyAppearance.setDiffuse(0.0, 0.8, 0.0, 0.5);
        this.bodyAppearance.setSpecular(0.0, 0.8, 0.0, 1.0);
        this.bodyAppearance.setShininess(10.0);


    }

    display(){
        this.bodyAppearance.apply();
        //Fish Body 
        this.scene.pushMatrix();
        this.scene.scale(0.25,0.20,0.125);
        this.sphere.display();
        this.scene.popMatrix();


        this.finAppearance.apply();
        //Fish Tail
        this.scene.pushMatrix();
        this.scene.translate(0.25,0.0,0.0);
        this.scene.scale(0.15,0.15,0.15);
        this.scene.rotate(Math.PI/4, 0.0, 0.0, -1.0);
        this.triangle.display();
        this.scene.popMatrix();

        //Fish Upper Fin
        this.scene.pushMatrix();
        this.scene.translate(0.08,0.18,0.0);
        this.scene.scale(0.08,0.08,0.08);
        this.scene.rotate(Math.PI/2, 0.0, 0.0, 1.0);
        this.triangle.display();
        this.scene.popMatrix();

        //Fish Left Fin
        this.scene.pushMatrix();
        this.scene.translate(-0.08,-0.05,0.115);
        this.scene.scale(0.08,0.08,0.08);
        this.scene.rotate(Math.PI/12, -1.0, 0.0, 0.0);
        this.scene.translate(0.0, -2.0, 0.0);
        this.triangle.display();
        this.scene.popMatrix();

        //Fish Right Fin
        this.scene.pushMatrix();
        this.scene.translate(-0.08,-0.05,-0.115);
        this.scene.scale(0.08,0.08,0.08);
        this.scene.rotate(Math.PI/12, 1.0, 0.0, 0.0);
        this.scene.translate(0.0, -2.0, 0.0);
        this.triangle.display();
        this.scene.popMatrix();

    }


}
