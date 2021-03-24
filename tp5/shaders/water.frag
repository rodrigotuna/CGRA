#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform float timeFactor;


uniform sampler2D uSampler;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord + vec2(timeFactor*.01, timeFactor*.01));
	gl_FragColor = color;
}