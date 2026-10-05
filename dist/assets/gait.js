// Two-link inverse kinematics. Coordinates are in the fashion SVG viewBox.
(function(scope){
 const stride=64,stance=.6,span=stride*stance;
 function leg(phase,hipX=94){
  const q=((phase%1)+1)%1,s=(q-stance)/(1-stance),grounded=q<stance;
  const ankle={x:hipX+(grounded?-span/2+q*stride:span/2-span*(s*s*(3-2*s))),y:503-(grounded?0:Math.sin(Math.PI*s)*26)};
  const hip={x:hipX,y:361},dx=ankle.x-hip.x,dy=ankle.y-hip.y,d=Math.hypot(dx,dy),upper=78,lower=76;
  const a=(upper*upper-lower*lower+d*d)/(2*d),h=Math.sqrt(Math.max(0,upper*upper-a*a));
  const knee={x:hip.x+a*dx/d-h*dy/d,y:hip.y+a*dy/d+h*dx/d};
  const normal=(a,b)=>{const l=Math.hypot(b.x-a.x,b.y-a.y);return{x:(b.y-a.y)/l,y:-(b.x-a.x)/l};};
  const n=normal(hip,knee),m=normal(knee,ankle),k={x:(n.x+m.x)/2,y:(n.y+m.y)/2};
  const point=(p,n,w)=>`${(p.x+n.x*w).toFixed(2)} ${(p.y+n.y*w).toFixed(2)}`;
  const path=`M${point(hip,n,5)} L${point(knee,k,3.5)} ${point(ankle,m,2.5)} M${point(hip,n,-5)} L${point(knee,k,-3.5)} ${point(ankle,m,-2.5)}`;
  const foot=`M${ankle.x+2.5} ${ankle.y} l5 9 q-10 5-29 0 l16-7 m10 7v5`;
  return{hip,knee,ankle,grounded,path,foot};
 }
 scope.AfricaGait={leg,stride};
})(typeof window==='undefined'?globalThis:window);
