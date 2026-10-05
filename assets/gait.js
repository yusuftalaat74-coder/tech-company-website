// Two-link inverse kinematics. Coordinates are in the stick-figure SVG viewBox.
(function(scope){
 const stride=64,stance=.6,span=stride*stance;
 function leg(phase,hipX=94){
  const q=((phase%1)+1)%1,s=(q-stance)/(1-stance),grounded=q<stance;
  const ankle={x:hipX+(grounded?-span/2+q*stride:span/2-span*(s*s*(3-2*s))),y:503-(grounded?0:Math.sin(Math.PI*s)*26)};
  const hip={x:hipX,y:361},dx=ankle.x-hip.x,dy=ankle.y-hip.y,d=Math.hypot(dx,dy),upper=78,lower=76;
  const a=(upper*upper-lower*lower+d*d)/(2*d),h=Math.sqrt(Math.max(0,upper*upper-a*a));
  const knee={x:hip.x+a*dx/d-h*dy/d,y:hip.y+a*dy/d+h*dx/d};
  const path=`M${hip.x} ${hip.y} L${knee.x.toFixed(2)} ${knee.y.toFixed(2)} ${ankle.x.toFixed(2)} ${ankle.y.toFixed(2)}`;
  const foot=`M${ankle.x.toFixed(2)} ${ankle.y.toFixed(2)} h-22`;
  return{hip,knee,ankle,grounded,path,foot};
 }
 scope.AfricaGait={leg,stride};
})(typeof window==='undefined'?globalThis:window);
