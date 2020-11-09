let bodyBoundry, elWidth, elRight, elLeft;
const moveX = (elem, amount, delay) => {
	return new Promise( (resolve, reject) => {
		setTimeout( () => {'repeating-linear-gradient(45deg, black, transparent 100px)'
			document.body.style.backgroundImage = (Math.random() >= 0.5) ?
				`linear-gradient(${Math.floor(Math.random() * 360)}deg, #${Math.random().toString(16).substr(-6)}, #${Math.random().toString(16).substr(-6)})` :
				`repeating-linear-gradient(${Math.floor(Math.random() * 360)}deg, #${Math.random().toString(16).substr(-6)}, #${Math.random().toString(16).substr(-6)} ${Math.floor(Math.random() * document.body.clientHeight)}px)`;
			bodyBoundry = document.body.clientWidth;
			elWidth = elem.getBoundingClientRect().width;
			elRight = elem.getBoundingClientRect().right;
			elLeft = elem.getBoundingClientRect().left;
			if ( elRight + elWidth + amount > bodyBoundry && movingRight) {
				reject({ bodyBoundry, elRight, amount });
			}
			if ( elLeft + elWidth + amount < 0 && !movingRight) {
				reject({ bodyBoundry, elLeft, amount });
			} else {
				elem.style.transform = `translateX(${elLeft + amount}px)`;
				resolve();
			}
		}, delay );
	} );
};

let movingRight = false;
const btn =document.querySelector('button');

async function animateRight(elem, amt, speed) {
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	await moveX(elem, amt, speed);
	//moveX(elem, 100, 1000);
}

continueMoving(btn);

async function continueMoving(elem) {
	movingRight = !movingRight;

	if (movingRight) {
		await animateRight(elem, 100, 500).catch( err => {
			console.log("ALL DONE!!!, Moving Right :)");
			continueMoving(elem);
		});
	} else if (!movingRight) {
		await animateRight(elem, -100, 500).catch( err => {
			console.log("ALL DONE!!!, Moving Left :)");
			continueMoving(elem);
		});
	}

	/*
	await animateRight(elem, 100).catch( err => {
		console.log("ALL DONE!!!")
		
		if (movingRight) {
			animateRight(elem, 100)
		} else if (!movingRight) {
			animateRight(elem, -100)
		}
	} );
	*/

}

/*
moveX(btn, 100, 1000)
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.then( () => moveX(btn, 100, 1000) )
	.catch( ({ bodyBoundry, elRight, elLeft }) => {
		console.log(`Cannot Move! Body is ${bodyBoundry}px wide`);
		console.log(`Element is at ${elRight}px, ${amount}px is to large!`);
	} );
*/

// SEQUENTIAL REQUESTS!
const changeBodyColor = (color, delay) => {
	return new Promise( (resolve, reject) => {
		setTimeout( () => {
			document.body.style.backgroundColor = color;
			resolve();
		}, delay );
	} );
}

async function lightShow() {
	const p1 = changeBodyColor('teal', 220);
	const p2 = changeBodyColor('pink', 440);
	const p3 = changeBodyColor('indengo', 680);
	const p4 = changeBodyColor('violet', 900);
	
	/*
	await p1;
	await p2;
	await p3;
	await p4;
	*/
	const results = await Promise.all([p1, p2, p3, p4]);
	console.log(results);
}

lightShow();