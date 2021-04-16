import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Textures
        this.cubeTopTexture = new CGFtexture(this, 'images/demo_cubemap/top.png');
        this.cubeBotTexture = new CGFtexture(this, 'images/demo_cubemap/bottom.png');
        this.cubeBackTexture = new CGFtexture(this, 'images/demo_cubemap/front.png');
        this.cubeLeftTexture = new CGFtexture(this, 'images/demo_cubemap/left.png');
        this.cubeFrontTexture = new CGFtexture(this, 'images/demo_cubemap/back.png');
        this.cubeRightTexture = new CGFtexture(this, 'images/demo_cubemap/right.png');

        this.mountainTexture = [this.cubeTopTexture, this.cubeBotTexture, this.cubeFrontTexture, this.cubeBackTexture, this.cubeRightTexture, this.cubeLeftTexture];

        this.sunsetTopTexture = new CGFtexture(this, 'images/sunset/py.png');
        this.sunsetBotTexture = new CGFtexture(this, 'images/sunset/ny.png');
        this.sunsetBackTexture = new CGFtexture(this, 'images/sunset/nz.png');
        this.sunsetLeftTexture = new CGFtexture(this, 'images/sunset/nx.png');
        this.sunsetFrontTexture = new CGFtexture(this, 'images/sunset/pz.png');
        this.sunsetRightTexture = new CGFtexture(this, 'images/sunset/px.png');

        this.sunsetTexture = [this.sunsetTopTexture, this.sunsetBotTexture, this.sunsetFrontTexture, this.sunsetBackTexture, this.sunsetRightTexture, this.sunsetLeftTexture];

        this.mapTexture = new CGFtexture(this, 'images/earth.jpg');

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.movingObject = new MyMovingObject(this,0, 0, [0,0,0]);
        this.cubeMap = new MyCubeMap(this);
        this.cylinder = new MyCylinder(this,60);

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
        this.defaultAppearance.setShininess(120);
        

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.sphereAppearance.setShininess(120);
        this.sphereAppearance.setTextureWrap('REPEAT', 'REPEAT')

        this.objectList = {'Moving Pyramid': 0, 'Cylinder': 1, 'Sphere': 2};
        this.landscapeList = {'Mountains': 0 , 'Sunset': 1};
        
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1.0;
        this.speedFactor = 1.0;
        this.selectedObject = 0;
        this.selectedLandscape = 0;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    checkKeys()  {
        var text="Keys pressed: ";
        var keysPressed=false;

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            keysPressed=true;
            this.movingObject.accelerate(1*this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyS")){
            text+=" S ";
            keysPressed=true;
            this.movingObject.accelerate(-1*this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyA")){
            text+=" A ";
            keysPressed=true;
            this.movingObject.turn(Math.PI/12*this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyD")){
            text+=" D ";
            keysPressed=true;
            this.movingObject.turn(-Math.PI/12*this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyR")){
            text+=" R ";
            keysPressed=true;
            this.movingObject.reset();
        }

        if (keysPressed)
                console.log(text);

    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.movingObject.update();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.sphereAppearance.setTexture(this.mapTexture);
        this.sphereAppearance.apply();
        // ---- BEGIN Primitive drawing section

        if(this.selectedObject == 0) this.movingObject.display();
        if(this.selectedObject == 1) this.cylinder.display();
        if(this.selectedObject == 2) this.incompleteSphere.display();
        
        this.cubeMap.textureList = (this.selectedLandscape == 1) ? this.sunsetTexture : this.mountainTexture ;
        this.cubeMap.display();
        
        //this.cylinder.display();

        // ---- END Primitive drawing section
    }
}