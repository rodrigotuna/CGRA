import {CGFobject} from '../lib/CGF.js';
/**
* MyCylinder
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
*/
export class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        var s = 0;
        var sOffset = 1/this.slices;

        for(var i = 0; i <= this.slices; i++){
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0 , -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0 , -Math.sin(ang));
            this.texCoords.push(s,1);
            this.texCoords.push(s,0);
            if(i > 0){
                this.indices.push(2*i, 2*i+1, 2*i-1);
                this.indices.push(2*i, 2*i-1, 2*(i-1));
            }
            s += sOffset;
            ang+=alphaAng;
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
