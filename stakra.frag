// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return 2.*fract(sin(dot(st.xy,
                         vec2(132.9898,78.233)))*
        43758.5453123) - 1.;
}

float distance2 (vec2 a, vec2 b) {
    float x = distance(a,b);
    x = pow(clamp(x,0.,1.),.1);
    return x;
}

float sinH(float val) {
    float s = 0.;
    for (float i = 0.; i< 4.; i++) {
        float j = i*2. + 1.;
    	s += sin(j*val)/j;
    }
 return s;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.x;
    st = st * 2. - 1.;

    float c = 100.;
    float c2 = c;
    float c3 = c;
    float c4 = c;
    const float scale = 1.3;
    float u_time2 = u_time + 15.;
    const float speed = .5;
    const float points =5.;
    for (float i = 1.; i<= points; i++) {
        c *= distance2(vec2(sin(speed*random(vec2(i,-1.))*u_time)*scale*random(vec2(i,1.)),
                            cos(speed*random(vec2(i,-2.))*u_time)*scale*random(vec2(i,2.))),st);

  		c2 *= distance2(vec2(sin(speed*random(vec2(i,-1.))*u_time2)*scale*random(vec2(i,1.)),
                            cos(speed*random(vec2(i,-2.))*u_time2)*scale*random(vec2(i,2.))),st);

        c3 *= distance2(vec2(sin(speed*random(vec2(i,-3.))*u_time)*scale*random(vec2(i,3.)),
                            cos(speed*random(vec2(i,-4.))*u_time)*scale*random(vec2(i,4.))),st);

  		c4 *= distance2(vec2(sin(speed*random(vec2(i,-3.))*u_time2)*scale*random(vec2(i,3.)),
                            cos(speed*random(vec2(i,-4.))*u_time2)*scale*random(vec2(i,4.))),st);

    }
    c -= c2;
    c = c +1. / 2.;
    c3 -= c4;
    c3 = c3 +1. /2.;
    //c += c3;
    //c3 -= c4;
    //c *= distance(u_mouse/u_resolution,st);
 	float mix_denom = 40. + sin(u_time/2.)*1.;
    vec3 colorA = vec3((50.0 )/255.,70.0/255.,70.0/255.);
    vec3 colorB = vec3(150.0/255.,130.0/255.,150.0/255.);
    vec3 colorC = vec3(10.0/255.,0.0/255.,13.0/255.);
    vec3 colorD = vec3(100.0/255.,100.0/255.,135.0/255.);




    vec3 finalc = mix(colorA, colorB,c);
    vec3 finalc2 = mix(colorC, colorD,c3);

    vec3 finalc3 = finalc + finalc2;
        finalc3 = clamp(finalc3,0.1,.9);
    gl_FragColor = vec4(vec3(finalc3),1.) ;
}
