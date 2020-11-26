/*

Alexandre Martignier
2 months ago
Reply
Link
At the time I'm watching this course section, GSAP have released their new plugins for scroll based animation called scrollTrigger. I found it a lot more simple to use than ScrollMagic and, because gsap made it, it's super easy to combinate with gsap.timeline. I strongly recommand you to check this awesome plugin and try to replace it in this tutorial.

https://greensock.com/docs/v3/Plugins/ScrollTrigger

First good point : instead of having 4 differents imports of javascript (scrollmagic+scrollmagic indicators + scrollmagic gsap + gsap) you end up with only 2 javascript :

    script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"
    script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/ScrollTrigger.min.js"

Then it's super easy to add timeline that is triggered by scroll. Here is my code for this tutorial (and the next because scroll trigger is already included).

const slides = document.querySelectorAll(".slide");
const nav = document.querySelector(".nav-header");

slides.forEach((slide) => {
  const img = slide.querySelector("img");
  const imgReveal = slide.querySelector(".reveal-img");
  const textReaveal = slide.querySelector(".reveal-text");
  const tl = new gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power2.inOut",
    },
    scrollTrigger: {
      trigger: slide,
      start: "top center",
      markers: true,
      toggleActions: "play none none reverse",
    },
  });
  tl.fromTo(img, { scale: 2 }, { scale: 1 })
    .fromTo(imgReveal, { x: "0%" }, { x: "100%" }, "-=1")
    .fromTo(textReaveal, { x: "0%" }, { x: "100%" }, "-=0.75")
    .fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
});
*/
let controller, slideScene, pageScene, detailScene;
function animateSlides() {
  // Init Controller
  controller = new ScrollMagic.Controller();
  // Select some things
  const sliders = document.querySelectorAll(".slide");
  // Loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-txt");
    // GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" }
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    // Create Scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false
    })
    .setTween(slideTl)
    /*.addIndicators({
      colorStart: "white",
      colorTrigger: "red",
      name: "slide"
    })*/
    .addTo(controller);

    // Create new Animation
    const pageTl = gsap.timeline();
    const nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    nextSlide === "end" ? null : pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0 });
    nextSlide === "end" ? null : pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    // Create new Scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
    /*.addIndicators({
      colorStart: "white",
      colorTrigger: "red",
      name: "slide"
    })*/
    .setPin(slide, { pushFollowers: false })
    .setTween(pageTl)
    .addTo(controller);
  });

}

let mouse = document.querySelector(".cursor");
let mouseTxt = mouse.querySelector("span");
let burger = document.querySelector(".burger");

function cursor(e) {
	mouse.style.top = `${e.pageY}px`;
	mouse.style.left = `${e.pageX}px`;
}

function activeCursor(e) {
	let item = e.target;
	if (item.id === "logo" || item.classList.contains("burger")) {
		mouse.classList.add("nav-active");
		mouse.style.mixBlendMode = "screen";
	} else  {
		mouse.classList.remove("nav-active");
		mouse.style.mixBlendMode = "none";
	}

	if (item.classList.contains("explore")) {
		mouse.classList.add("explore-active");
		gsap.to(".title-swipe", 1, {y: "0%"});
		mouseTxt.innerText = "Tap";
	} else {
		mouse.classList.remove("explore-active");
		mouseTxt.innerText = "";
		gsap.to(".title-swipe", 1, {y: "100%"});
	}
}

function navToggle(e) {
	if (!e.target.classList.contains("active")) {
		mouse.style.borderColor = "black";
		e.target.classList.add("active");
		gsap.to(".line1", 0.5, {rotate: "45", y: 5, background: "black"});
		gsap.to(".line2", 0.5, {rotate: "-45", y: -5, background: "black"});
		gsap.to("#logo", {color: "black"});
		gsap.to(".nav-bar", 0.5, {clipPath: "circle(2500px at 100% -10%)"});
		document.body.classList.add("hide");
	} else {
		mouse.style.borderColor = "white";
		e.target.classList.remove("active");
		gsap.to(".line1", 0.5, {rotate: "0", y: 0, background: "white"});
		gsap.to(".line2", 0.5, {rotate: "0", y: 0, background: "white"});
		gsap.to("#logo", {color: "white"});
		gsap.to(".nav-bar", 0.5, {clipPath: "circle(50px at 100% -10%)"});
		document.body.classList.remove("hide");

	}
		
}

function detailAnimation() {
  // Init Controller
  controller = new ScrollMagic.Controller();
  // Select some things
  const sliders = document.querySelectorAll(".detail-slide");
  // Loop over each slide
  sliders.forEach((slide, index, slides) => {
    // GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 1/*, ease: "power2.inOut" */}
    });
    
    const nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    // slideTl.fromTo(slide, { opacity: 0}, { opacity: 1});
    nextSlide === "end" ? null : (
      slideTl.fromTo(slide, { opacity: 1}, { opacity: 0}),
      slideTl.fromTo(nextImg, { opacity: 0}, { opacity: 1}, "-=1"),
      slideTl.fromTo(nextImg, { x: "50%"}, { x: "0%"})
    );
    
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
    /*.addIndicators({
      colorStart: "white",
      colorTrigger: "red",
      name: "slide"
    })*/
    .setTween(slideTl)
    .addTo(controller);
  });
}

const logo = document.querySelector("#logo");
// Barba Page Transitions
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        logo.href = "./index.html";
        animateSlides();
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      }
    },
    {
      namespace: "fashion",
      beforeEnter() {
        logo.href = "../index.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      }
    }
  ],
  transitions: [
    {
      leave({current, next}) {
        let done = this.async();
        // Scroll To The Top
        window.scrollTo(0, 0);
        // An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(".nav-header", 1, { y: "0%" }, { y: "-100%"});
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0, onComplete: done }, "-=0.25");
        tl.fromTo(".swipe", 0.75, {x: "-100%"}, {x: "0%", onComplete: done }, "-=0.5");
      },
      enter({current, next}) {
        let done = this.async();
        // An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(".swipe", 0.75, {x: "0%"}, {x: "-100%", stagger: 0.25, onComplete: done }, "-=0.25");
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1, onComplete: done });
        tl.fromTo(".nav-header", 1, { y: "-100%" }, { y: "0%"}, "-=0.5");
      },
    }
  ]
});

//

burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);