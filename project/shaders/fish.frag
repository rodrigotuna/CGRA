#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 vFinalColor;

uniform sampler2D uSampler;

void main() {
	if (vTextureCoord.t < 0.4){
		gl_FragColor =  vec4(0.89, 0.45, 0.36, 1.0) * vFinalColor * 2.0;
	} else {
		vec4 textureColor = texture2D(uSampler, vTextureCoord);
		gl_FragColor = textureColor * vFinalColor * 2.0; 
	}
}
