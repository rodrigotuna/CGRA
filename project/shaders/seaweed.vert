attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float timeFactor;

void main() {
    float y = aVertexPosition.y;
    vec3 offset = y*vec3(sin(0.5*timeFactor - y*6.28328), 0.0,  sin(0.3*timeFactor - y*6.28328));
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

    vTextureCoord = aTextureCoord;

}