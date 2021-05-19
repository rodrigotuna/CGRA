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
        this.timeFactor = 0;

        this.init();
        this.initMaterials();
    }

    init(){
        this.plane = new MyPlane(this.scene, this.nDivs, 0, 1, 0, 1);
    }

    initMaterials(){
        this.surfaceAppearance = new CGFappearance(this.scene);
        this.surfaceAppearance.setShininess(15.0);

        this.surfaceTexture = new CGFtexture(this.scene, "images/pier.jpg");
        this.surfaceMapTexture = new CGFtexture(this.scene, "images/distortionmap.png");
        
        this.surfaceAppearance.setTexture(this.surfaceTexture);
        this.surfaceAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.surfaceShader = new CGFshader(this.scene.gl, "shaders/surface.vert", "shaders/surface.frag");
        this.surfaceShader.setUniformsValues({ uSampler2: 1 });
    }

    updateAnimation(t){
        this.timeFactor = t;
        this.surfaceShader.setUniformsValues({ timeFactor: this.timeFactor / 100 % 100});
    }

    display(){
        this.surfaceAppearance.apply();
        this.scene.setActiveShader(this.surfaceShader);
        this.surfaceMapTexture.bind(1);

        this.scene.pushMatrix();
        this.scene.translate(0.0, 10.0, 0.0);
        this.scene.rotate(Math.PI/2, 1.0, 0.0, 0.0);
        this.scene.scale(this.width, this.height, 1.0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
} 