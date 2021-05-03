#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(uSampler2, vTextureCoord);

	if(filter.r > 0.05){
		color = filter * color * 1.8;
	}

	gl_FragColor = color;
}