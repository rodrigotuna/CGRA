import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyPlane} from './MyPlane.js'

export class MySeaFloor extends CGFobject{
    constructor(scene, nDivs, width, height, maxHeight) {
        super(scene);

        this.nDivs = nDivs;
        this.width = width;
        this.height = height;
        this.maxHeight = maxHeight;

        this.init();
        this.initMaterials();
    }

    init(){
        this.plane = new MyPlane(this.scene, this.nDivs, 0, 1, 0, 1);
    }

    initMaterials(){
        this.sandAppearance = new CGFappearance(this.scene);

        this.sandTexture = new CGFtexture(this.scene, "images/sand.png");
        this.sandMapTexture = new CGFtexture(this.scene, "images/sandMap.png");
        
        this.sandAppearance.setTexture(this.sandTexture);
        this.sandAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.sandShader = new CGFshader(this.scene.gl, "shaders/sand.vert", "shaders/sand.frag");
        this.sandShader.setUniformsValues({ uSampler2: 1 });
        this.sandShader.setUniformsValues({ maxHeight: this.maxHeight});
    }

    display(){
        this.sandAppearance.apply();
        this.scene.setActiveShader(this.sandShader);
        this.sandMapTexture.bind(1);

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, -1.0, 0.0, 0.0);
        this.scene.scale(this.width, this.height, 1.0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
} 