/* LANDING PAGE SCROLLING */
const projectsDownTrigger = document.getElementById('scroll-to-projects');
const resumeDownTrigger = document.getElementById('scroll-to-resume');

const projectsDownPoint = document.getElementById('projects-down-point');
const resumeDownPoint = document.getElementById('resume-down-point');

const landingBottomTrigger = document.getElementById('landing-bottom-trigger');
const landingTopTrigger = document.getElementById('landing-top-trigger');
const landingTop = document.getElementById('landing-top-scroll-point');


projectsDownTrigger.addEventListener('click', (ev)=>{
  projectsDownPoint.scrollIntoView({
    behavior: 'smooth' 
  });
});

resumeDownTrigger.addEventListener('click', (ev)=>{
  resumeDownPoint.scrollIntoView({
    behavior: 'smooth' 
  });
});

landingBottomTrigger.addEventListener('click', (ev)=>{
  landingTop.scrollIntoView({
    behavior: 'smooth'
  });
});

landingTopTrigger.addEventListener('click', (ev)=>{
  landingTop.scrollIntoView({
    behavior: 'smooth'
  });
});