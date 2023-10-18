function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotive();

function cursor() {
  let crsr = document.querySelector('.cursor')
  let body = document.querySelector('.main')

  body > addEventListener("mousemove", function (dets) {
    crsr.style.left = dets.x + 'px'
    crsr.style.top = dets.y + 'px'
  })

}
cursor();

function animation(){
  
let tl = gsap.timeline()

tl.from(".nav h5,h4",{
  opacity:0,
  y:7,

},)
tl.from(".page1 h1,h2",{
  opacity:0,
  y:90,
},)
tl.from(".pg h5",{
  opacity:0,
  y:90,
},)
tl.from(".pg1 h5",{
  opacity:0,
  y:90,
},)
tl.from(".pg-footer h6",{
  opacity:0,
  y:90,
},)
tl.from(".circle",{
  opacity:0,
  y:90,
},)
}
animation();

let elem = document.querySelectorAll('.elem').forEach(function(elem){
  elem.addEventListener("mousemove",function(dets){
    var diff = dets.clientY - elem.getBoundingClientRect().top;
   gsap.to(elem.querySelector('img'),{
    opacity:1,
    ease:Power1,
    top:diff,
    left:dets.clientX
   })
  })
  elem.addEventListener("mouseleave",function(dets){
    var diff = dets.clientY - elem.getBoundingClientRect().top;
   gsap.to(elem.querySelector('img'),{
    opacity:0,
    
   })
  })
})
