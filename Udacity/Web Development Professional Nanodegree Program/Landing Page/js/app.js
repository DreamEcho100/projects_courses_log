/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const nav = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildingNav = () => {
	// Building the nav content
	sections.forEach(section => {
		let navContent = "";
		const sectionID = section.id;
		const sectionDataNav = section.dataset.nav;

		navContent = `<li><a class="nav__link" href="#${sectionID}">${sectionDataNav}</a></li>`;
		// appending all elements to the nav
		nav.innerHTML += navContent;
	});
};
//debugger
buildingNav();

// Add class 'active' to section when near top of viewport

const sectionActive = () => {
	sections.forEach(section => {
		const sectionOffset = section.getBoundingClientRect();
		const limit = document.body.clientHeight * 0.06;

		if (sectionOffset.top < limit && sectionOffset.top >= (limit * -1) ) {
			section.classList.add("your-active-class");
		} else if (section.classList.contains("your-active-class")) {
			section.classList.remove("your-active-class");
		}
	});
}

window.addEventListener("scroll", sectionActive);
// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

const scrollingToTarget = () => {

    const elems = document.querySelectorAll('.navbar__menu a');
    elems.forEach((elem, idx) => {
    	elem.addEventListener("click", (e) => {
    		e.preventDefault();
			sections[idx].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    	})
    });

};

scrollingToTarget();

// Set sections as active


