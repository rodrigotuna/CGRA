#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;


uniform float timeFactor;
uniform float randFactor;


void main() {
	vec4 color = vec4(0.38, 0.40, 0.18, 1.0) * randFactor;

	gl_FragColor = color;
}