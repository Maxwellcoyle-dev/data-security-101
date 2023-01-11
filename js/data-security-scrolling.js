/* DATA SECURITY 101 SCROLLING */

const scrollDownTrigger = document.getElementById('scroll-down');

const scrollUpTrigger = document.getElementById('data-home-bottom-trigger');
const scrollUpPoint = document.getElementById('data-top-scroll-point');

const scrollDownPoint = document.getElementById('scroll-down-point');


scrollDownTrigger.addEventListener('click', (ev)=>{
  scrollDownPoint.scrollIntoView({
    behavior: 'smooth' 
  });
});

scrollUpTrigger.addEventListener('click', (ev)=>{
  scrollUpPoint.scrollIntoView({
    behavior: 'smooth'
  });
});