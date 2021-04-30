#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 filter = texture2D(uSampler2, vTextureCoord + 0.0025*vec2(timeFactor, timeFactor));

	vec4 color = texture2D(uSampler, vTextureCoord - 0.5*vec2(filter.r - 0.5, filter.g - 0.5));

	gl_FragColor = color;
}