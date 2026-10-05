import test from 'node:test';
import assert from 'node:assert/strict';
import '../assets/gait.js';
const {leg,stride}=globalThis.AfricaGait;
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
test('knees keep both leg lengths and feet stay above the floor throughout the cycle',()=>{
 for(let i=0;i<1000;i++){
  const p=leg(i/1000);
  assert.ok(Math.abs(distance(p.hip,p.knee)-78)<1e-8);
  assert.ok(Math.abs(distance(p.knee,p.ankle)-76)<1e-8);
  assert.ok(p.ankle.y<=503);
  assert.ok(p.grounded||leg(i/1000+.5).grounded);
 }
});
test('a planted foot compensates body travel without sliding',()=>{
 const first=leg(.05),last=leg(.55);
 assert.equal(first.ankle.y,last.ankle.y);
 assert.ok(Math.abs(last.ankle.x-first.ankle.x-stride*.5)<1e-9);
});
test('stride wrap and stance-to-swing transitions are continuous',()=>{
 assert.ok(distance(leg(.999999).ankle,leg(0).ankle)<.001);
 assert.ok(distance(leg(.599999).ankle,leg(.600001).ankle)<.001);
});
