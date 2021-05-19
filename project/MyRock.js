import {CGFobject} from '../lib/CGF.js';

  /**MyRock
   * @method constructor
   * @param   scene - Reference to MyScene object
   * @param  slices - number of slices around Y axis
   * @param  stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
export class MyRock extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;

    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;
    var t = 0;
    var tInc = 1/this.latDivs;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      var s = 0;
      var sInc = 1/this.longDivs;

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        if(longitude == this.longDivs){
            this.vertices.push(this.vertices[3*latitude * latVertices], this.vertices[3*latitude * latVertices + 1], this.vertices[3*latitude * latVertices + 2])
        } else{
            var noise = 0.25*Math.random() + 0.875;
            var x = Math.cos(theta) * sinPhi;
            var y = cosPhi;
            var z = Math.sin(-theta) * sinPhi;
            this.vertices.push(noise*x, noise*y, noise*z);
        }

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        // May need some additional code also in the beginning of the function.
        this.texCoords.push(s,t);
        s += sInc;
      }
      phi += phiInc;
      t += tInc;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}