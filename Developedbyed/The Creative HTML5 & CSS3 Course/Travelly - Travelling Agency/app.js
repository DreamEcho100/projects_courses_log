const scrollThroughThePage = document.querySelectorAll(".scrollThroughThePage");
const mainHead = document.getElementById("main-head");
const footerHead = document.getElementById("footer-head");
const heroSection = document.querySelector(".hero");
let prevScrollvalue = 0;
const smoothScrollingToTarget = () => {

    window.addEventListener("scroll", () => {
        if ((document.body.scrollTop > 1 ||
             document.documentElement.scrollTop > 1) &&
            (document.body.scrollTop > prevScrollvalue ||
             document.documentElement.scrollTop > prevScrollvalue) &&
            (document.body.scrollTop > mainHead.getBoundingClientRect().height ||
             document.documentElement.scrollTop > mainHead.getBoundingClientRect().height)) {
            mainHead.classList.add("hide");
        } else {
            mainHead.classList.remove("hide");
        }
        prevScrollvalue = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    });

    scrollThroughThePage.forEach((link, idx) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();            
            const targetElem = document.getElementById(`${link.text}`);
            targetElem.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            //window.addEventListener('scroll', scrollingStopped, false)
        });
    });

    /*[mainHead, footerHead].forEach(items => {
        const itemsHeadNavLinks = items.querySelectorAll("nav ul li a");
        itemsHeadNavLinks.forEach((link, idx) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();            
                const targetElem = document.getElementById(`${link.text}`);
                targetElem.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                //window.addEventListener('scroll', scrollingStopped, false)
            });
        });
    });*/

    document.getElementById("scrollToTop").addEventListener("click", () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    document.getElementById("book-now-btn").addEventListener("click", () => {
        document.getElementById("contact").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });    

};

/*function scrollingStopped() {
    setTimeout( () => {
        window.scrollBy(0, -(navHeight.getBoundingClientRect().height));
        console.log('Scrolling has stopped.');
        window.removeEventListener('scroll', scrollingStopped);
    }, 66)
}*/


document.addEventListener("DOMContentLoaded", () => {
	smoothScrollingToTarget();
});
