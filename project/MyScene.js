import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { CGFcamera2 } from "./CGFcamera2.js";
import { MySphere } from "./MySphere.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyFish } from "./MyFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyWaterSurface } from "./MyWaterSurface.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPillarSet } from "./MyPillarSet.js";
import { MySeaWeedSet } from "./MySeaWeedSet.js";
import { MyNest } from "./MyNest.js";

/**
* MyScene
* @method constructor
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

        this.initTextures();
        this.initAppearances();
        this.initShaders();
        this.initObjects();

        //Initialize scene objects

        //Objects connected to MyInterface
        this.displayAxis = false;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera2(1.7, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    initAppearances(){
        this.rockAppearance = new CGFappearance(this);
        this.rockAppearance.setAmbient(0.41, 0.43, 0.55, 0.3);
        this.rockAppearance.setDiffuse(0.41, 0.43, 0.55, 1.0);
        this.rockAppearance.setSpecular(0.41, 0.43, 0.55, 0.8);
        this.rockAppearance.setShininess(15.0);

        this.pillarAppearance = new CGFappearance(this);
        this.pillarAppearance.setTexture(this.pillarTexture);
        this.pillarAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.sandAppearance = new CGFappearance(this);
        this.sandAppearance.setTexture(this.sandTexture);
        this.sandAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.surfaceAppearance = new CGFappearance(this);
        this.surfaceAppearance.setShininess(15.0);
        this.surfaceAppearance.setTexture(this.surfaceTexture);
        this.surfaceAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    }

    initTextures(){
        this.cubeTopTexture = new CGFtexture(this, 'images/underwater_cubemap/top.jpg');
        this.cubeBotTexture = new CGFtexture(this, 'images/underwater_cubemap/bottom.jpg');
        this.cubeBackTexture = new CGFtexture(this, 'images/underwater_cubemap/front.jpg');
        this.cubeLeftTexture = new CGFtexture(this, 'images/underwater_cubemap/left.jpg');
        this.cubeFrontTexture = new CGFtexture(this, 'images/underwater_cubemap/back.jpg');
        this.cubeRightTexture = new CGFtexture(this, 'images/underwater_cubemap/right.jpg');

        this.waterTexture = [this.cubeTopTexture, this.cubeBotTexture, this.cubeFrontTexture, this.cubeBackTexture, this.cubeRightTexture, this.cubeLeftTexture];
        
        this.pillarTexture = new CGFtexture(this, "images/woodtexture.jpg");

        this.sandTexture = new CGFtexture(this, "images/sand.png");
        this.sandMapTexture = new CGFtexture(this, "images/sandMap.png");

        this.surfaceTexture = new CGFtexture(this, "images/pier.jpg");
        this.surfaceMapTexture = new CGFtexture(this, "images/distortionmap.png");
    }

    initShaders(){
        this.sandShader = new CGFshader(this.gl, "shaders/sand.vert", "shaders/sand.frag");
        this.sandShader.setUniformsValues({ uSampler2: 1 });
        this.sandShader.setUniformsValues({ maxHeight: 1});

        this.seaweedShader = new CGFshader(this.gl, "shaders/seaweed.vert", "shaders/seaweed.frag");

        this.surfaceShader = new CGFshader(this.gl, "shaders/surface.vert", "shaders/surface.frag");
        this.surfaceShader.setUniformsValues({ uSampler2: 1 });
    }

    initObjects(){
        this.axis = new CGFaxis(this);
        this.cubeMap = new MyCubeMap(this, this.waterTexture);
        this.cylinder = new MyCylinder(this,60);
        this.seaFloor = new MySeaFloor(this, 100, 50, 50, 1);
        this.waterSurface = new MyWaterSurface(this, 100, 50, 50);
        this.rockSet = new MyRockSet(this, 99);
        this.pillarSet = new MyPillarSet(this);
        this.seaWeedSet = new MySeaWeedSet(this, 20, this.seaweedShader);
        this.fish = new MyFish(this);
        this.movingFish = new MyMovingFish(this, 0, 0, [0,3,0], this.fish);
        this.nest = new MyNest(this, 2.0, [14.1, -0.5, 4.3]);
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
            this.movingFish.accelerate(1.0);
        }

        if (this.gui.isKeyPressed("KeyS")){
            text+=" S ";
            keysPressed=true;
            this.movingFish.accelerate(-1.0);
        }

        if (this.gui.isKeyPressed("KeyA")){
            text+=" A ";
            keysPressed=true;
            this.movingFish.turn(Math.PI/24);
        } else {
            this.fish.stopLeftMovement();
        }

        if (this.gui.isKeyPressed("KeyD")){
            text+=" D ";
            keysPressed=true;
            this.movingFish.turn(-Math.PI/24);
        } else {
            this.fish.stopRightMovement();
        }

        if (this.gui.isKeyPressed("KeyR")){
            text+=" R ";
            keysPressed=true;
            this.movingFish.reset(this.rockSet);
        }

        if (this.gui.isKeyPressed("KeyP")){
            text+=" P ";
            keysPressed=true;
            this.movingFish.lift();
        }

        if (this.gui.isKeyPressed("KeyL")){
            text+=" L ";
            keysPressed=true;
            this.movingFish.drop();
        }

        if (this.gui.isKeyPressed("KeyC")){
            text+=" C ";
            keysPressed=true;
            this.movingFish.rockInteraction(this.rockSet, this.nest);
        }

        if (keysPressed)
                console.log(text);

    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.movingFish.update(t);
        this.movingFish.updateTime(t);
        this.fish.updateAnimation(t);

        this.surfaceShader.setUniformsValues({ timeFactor: t / 100 % 100});
        this.seaWeedSet.updateAnimation(t);
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

        this.cubeMap.display();

        this.pillarAppearance.apply();
        this.pillarSet.display();

        this.rockAppearance.apply();
        this.rockSet.display();
        this.nest.display();
        this.movingFish.display();

        this.sandAppearance.apply();
        this.setActiveShader(this.sandShader);
        this.sandMapTexture.bind(1);
        this.seaFloor.display();

        this.surfaceAppearance.apply();
        this.setActiveShader(this.surfaceShader);
        this.surfaceMapTexture.bind(1);
        this.waterSurface.display();
        
        this.setActiveShader(this.seaweedShader);
        this.seaWeedSet.display();

        this.setActiveShader(this.defaultShader);
        // ---- END Primitive drawing section
    }
}