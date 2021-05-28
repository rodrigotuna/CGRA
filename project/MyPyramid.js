import {CGFobject} from '../lib/CGF.js';
/**
* MyPyramid
* @method constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyPyramid extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    /**
    * @method initBuffers
    * Initializes the pyramid buffers
    */    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var height = 0;
            var deltaH = 1.0/this.stacks;

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            //Constructs the stacks of a face
            for(var j = 0; j <= this.stacks; j++){
                this.vertices.push((1-height)*ca, height, -(1-height)*sa);
                this.vertices.push((1-height)*caa, height, -(1-height)*saa);

                this.normals.push(...normal);
                this.normals.push(...normal);

                if(j == 0) continue;

                this.indices.push((this.stacks + 1)*2*i + 2*(j-1), (this.stacks + 1)*2*i + 2*(j-1) + 1, (this.stacks + 1)*2*i + 2*j + 1);
                this.indices.push((this.stacks + 1)*2*i + 2*(j-1), (this.stacks + 1)*2*i + 2*j + 1, (this.stacks + 1)*2*i + 2*j);

                height += deltaH;
            }   

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


