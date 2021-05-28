import {CGFobject} from '../lib/CGF.js';
/**
* MyCylinder
* @method constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
*/
export class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    
    /**
    * @method initBuffers
    * Initializes the cylinder buffers
    */    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        var s = 0;
        var sInc = 1/this.slices;

        for(var i = 0; i <= this.slices; i++){
            var x = Math.cos(ang);
            var z = -Math.sin(ang);

            this.vertices.push(x, 0, z);
            this.vertices.push(x, 1, z);
            this.normals.push(x, 0 , z);
            this.normals.push(x, 0 , z);
            this.texCoords.push(s,1);
            this.texCoords.push(s,0);
            if(i > 0){
                this.indices.push(2*i, 2*i+1, 2*i-1);
                this.indices.push(2*i, 2*i-1, 2*(i-1));
            }
            s += sInc;
            ang+=alphaAng;
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
