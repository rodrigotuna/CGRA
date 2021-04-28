import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyPlane} from './MyPlane.js'

export class MySeaFloor extends CGFobject{
    constructor(scene, nDivs, minS, maxS, minT, maxT, offset) {
        super(scene);

        this.nDivs = nDivs;
        this.minS = minS;
        this.maxS = maxS;
        this.minT = minT;
        this.maxT = maxT;
        this.offset = offset;

        this.init();
        this.initMaterials();
    }

    init(){
        this.plane = new MyPlane(this.scene, this.nDivs, this.minS, this.maxS, this.minT, this.maxT);
    }

    initMaterials(){
        this.sandAppearance = new CGFappearance(this.scene);
        this.sandAppearance.setAmbient(1.0, 1.0, 1.0, 0.3);
        this.sandAppearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.sandAppearance.setSpecular(1.0, 1.0, 1.0, 0.8);
        this.sandAppearance.setShininess(15.0);

        this.sandTexture = new CGFtexture(this.scene, "images/sand.png");
        this.sandMapTexture = new CGFtexture(this.scene, "images/sandMap.png");
        
        this.sandAppearance.setTexture(this.sandTexture);
        this.sandAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.sandShader = new CGFshader(this.scene.gl, "shaders/sand.vert", "shaders/sand.frag");
        this.sandShader.setUniformsValues({ uSampler2: 1 });
    }

    display(){
        this.sandAppearance.apply();
        this.scene.setActiveShader(this.sandShader);
        this.sandMapTexture.bind(1);

        this.scene.pushMatrix();
        this.scene.scale(8.0, 1.0, 8.0);
        this.scene.rotate(Math.PI/2, -1.0, 0.0, 0.0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
} 