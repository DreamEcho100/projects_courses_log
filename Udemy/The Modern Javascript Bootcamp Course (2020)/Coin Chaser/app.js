const avatar = document.querySelector("#player");
const coin = document.querySelector("#coin");
const score = document.querySelector("#score");

let play = {
	speed: (avatar.offsetWidth / 2), 
	ready: true,
	score: -50
}

let keys = ["keydown", "keyUp", "keyhold"];
catchCoin(avatar, coin);

keys.forEach((item) => {
    document.addEventListener(item, function (e) {
	    if (play.ready) {
	    	let key = e.key;
			if (key === "ArrowUp" && avatar.offsetTop > (score.offsetTop + score.offsetHeight)) {
				avatar.style.top = `${(avatar.offsetTop) - play.speed}px`;
			}
			if (key === "ArrowDown") {
				avatar.style.top = `${(avatar.offsetTop) + play.speed}px`;
				if (avatar.offsetTop) {}
			}
			if (key === "ArrowLeft") {
				avatar.style.left = `${(avatar.offsetLeft) - play.speed}px`;
				avatar.style.transform = "scale(-1, 1)";
			}
			if (key === "ArrowRight") {
				avatar.style.left = `${(avatar.offsetLeft) + play.speed}px`;
				avatar.style.transform = "scale(1, 1)";
			}
			inTheGame(avatar);
			avatar.ready = false;
			setTimeout(() => {avatar.ready = true}, 500);
	    }
    	catchCoin(avatar, coin);
    });
})

function inTheGame(item) {
	// For getting out from the left
	if (window.innerWidth < (item.offsetLeft + item.offsetWidth)) {
	    item.style.left = `${window.innerWidth - item.offsetWidth}px`
	}
	// For getting out from the right
	if ((item.offsetLeft) < 0) {
	    item.style.left = `0px`
	}
	// For getting out from the top
	if (!(item.offsetTop >  (score.offsetTop + score.offsetHeight))) {
		item.style.top = `${score.offsetTop + score.offsetHeight + 1}px`;
	}
	// For getting out from the bottom
	if ((item.offsetTop + item.offsetHeight) > window.innerHeight) {
	    item.style.top = `${window.innerHeight - item.offsetHeight}px`;
	}
}

function catchCoin(a, b) {
	if (isCollide(a, b)) {
		play.score += 50;
		b.style.left = `${Math.floor(Math.random() * window.innerWidth - (window.innerWidth * 0.1))}px`;
		b.style.top = `${Math.floor(Math.random() * window.innerHeight - (window.innerHeight * 0.1))}px`;
		if (isCollide(a, b)) {
			play.score -= 50;
			catchCoin(a, b)
		}
		inTheGame(coin);/*
		if (b.offsetLeft < 0) {
			//Number(b.style.left.substr(0, b.style.left.length - 2)) < 0
			let temp = Math.abs(b.offsetLeft);
			b.style.left = `${temp}px`;
		}
		if (b.offsetTop) {
			//Number(b.style.top.substr(0, b.style.top.length - 2))
			let temp = Math.abs(b.offsetTop);
			b.style.top = `${temp}px`;
		}
		if (b.offsetTop < score.offsetTop + score.offsetHeight) {
			b.style.top = `${score.offsetTop + score.offsetHeight + 1}px`
		}*/
		score.innerText = `Score: ${play.score}`;
	}
}

/*
function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}
*/

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) ||
         (aRect.top > bRect.bottom) ||
          (aRect.right < bRect.left) ||
           (aRect.left > bRect.right)
    );
}