const sel = document.querySelector("select");
const inpAll = document.querySelectorAll("input");
const myImg = document.querySelector("img");
const txtArea = document.querySelector("textarea");

sel.addEventListener("change", build);
inpAll.forEach(function (item) {
	item.addEventListener("change", build);
});
function clean(str) {
	return str.replace("#", "");
}
function spacers(str) {
	return str.split(" ").join("+");
}

function build(e) {
	let i = {};
	i.size = sel.value;
	i.text =  spacers(inpAll[0].value);
	i.bgClr = clean(inpAll[1].value);
	i.txtClr = clean(inpAll[2].value);
	i.path = `http://via.placeholder.com/${i.size}/${i.bgClr}/${i.txtClr}?text=${i.text}`;
	myImg.src = i.path;
	txtArea.value = i.path;
	txtArea.select();
	txtArea.focus();
	document.execCommand("Copy");

}