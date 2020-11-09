const output = document.querySelector(".output");
const btns = document.querySelectorAll("button");
const getVals = document.querySelectorAll("input");
btns.forEach(function(btn) {
	btn.addEventListener("click", btnAction);
});

document.addEventListener("DOMContentLoaded", function() {
	const now = new Date();
    let thisWeek = (now.getDate());
    let thisday = (`0${thisWeek}`.slice(-2));
    let thisMonth = (`0${now.getMonth() + 1}`.slice(-2));
    let thisYear = (now.getFullYear());
    let nextMonth;
    let nextWeek;
    const dateHolder = document.querySelector("input[type=date]");

    // This test is only month not year
    if ( (Number(thisday) + 7) >= 30 ) {
       if(new Date(`${thisYear}-${thisMonth}-31`).getMonth() + 1 === Number(thisMonth) + 1) {
            nextMonth = (`0${now.getMonth() + 2}`.slice(-2));
            nextWeek = `0${(Number(thisday) + 7) - 30}`.slice(-2);
        } else if (new Date(`${thisYear}-${thisMonth}-32`).getMonth() + 1 === Number(thisMonth) + 1) {
            nextMonth = (`0${now.getMonth() + 2}`.slice(-2));
            nextWeek = `0${(Number(thisday) + 7) - 31}`.slice(-2);
        }
    } else {
        nextMonth = thisMonth;
        nextWeek = `0${(Number(thisday) + 7)}`.slice(-2);
    }
    dateHolder.value = `${thisYear}-${nextMonth}-${nextWeek}`;
})

function btnAction(e) {
	console.log(e.srcElement.innerText.indexOf(" "));
	let temp = e.srcElement.innerText.substr(0, e.srcElement.innerText.indexOf(" "));
	console.log(temp);
	let v = {};
	getVals.forEach((item, idx) => {
		let tempName = item.getAttribute("name");
		let tempValue = tempName !== "cookieExpire" ? item.value : item.valueAsDate;
		v[tempName] = tempValue;
	});
	console.log(v);
	if (temp === "Set") {
		setCookie(v.cookieName, v.cookieValue, v.cookieExpire)
	} 
	else if (temp === "Get") { getCookie(v.cookieName) }
	else if (temp === "Delete") { eraseCookie(v.cookieName) }
	else if (temp === "All") { listCookies() }
}

function setCookie(name, value, exp) {
	if (value.length > 0) {
		document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${exp.toUTCString()}`;
		output.textContent = `Cookie ${name} Set`;
	} else {
		output.textContent = `Cookie needs s value`;
	}
}

function getCookie(name) {
	let cookies = document.cookie.split(";");
	output.textContent = "No Cookies Found";
	cookies.forEach((item, idx) => {
		item = item.trim();
		let tempCookie = item.split("=");
		if (tempCookie[0] === name) {
			output.textContent = `Found : ${tempCookie[0].trim()} is  ${decodeURIComponent(tempCookie[1])}`;
		}
	})
}


function eraseCookie(name) {
	document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
	output.textContent = `Cookie ${name} Removed`;
}

function listCookies() {
	let cookies = document.cookie.split(";");
	output.textContent = "";
	cookies.forEach((item, index) => {
		let tempCookie = item.split("=");
		if (tempCookie[0].length > 0) {
			let div = document.createElement("div");
			div.setAttribute("class", "cookie");
			div.addEventListener("click", function() {
				eraseCookie(tempCookie[0])
			});
			div.tempCookie = `${tempCookie[0].trim()} ${decodeURIComponent(tempCookie[1])}`;
			output.appendChild(div);
		}
	})
}