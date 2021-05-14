#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;
//uniform float randFactor;


void main() {
	vec4 color = vec4(0.38, 0.40, 0.18, 1.0);

	gl_FragColor = color;
}