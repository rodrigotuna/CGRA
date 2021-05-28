import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @method constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    /**
     * @method init
     * Initializes the scene interface
     */	
    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.initKeys();
        return true;
    }
    /**
     * @method initKeys 
     * Initializes the keyboard keys process
     */
    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;

        // disable the processKeyboard function
        this.processKeyboard=function(){};

        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }

    /**
     * @method processKeyDown
     * @param event Keyboard event
     * Process a key press event
     */
    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    }

    /**
     * @method processKeyUp
     * @param event Keyboard event
     * Process a key release event
     */    
    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    }

    /**
     * @method isKeyPressed
     * @param keyCode Code of the key to check
     * @return  true if the key is pressed, false otherwise
     * Checks if a certain key is pressed
     */
    isKeyPressed(keyCode) {
        if( this.activeKeys[keyCode] === true && (keyCode == "keyL" || keyCode == "keyP")) {
            this.activeKeys[keyCode] = false;
            return true;
        }     
        return this.activeKeys[keyCode] || false;
    }
    

}