class DrumKit {
	constructor(items) {
		this.items = items;
		this.tracks = [];
		this.init();
		this.pads = document.querySelectorAll(".pad");
		this.playBtn = document.querySelector(".play");
		this.selects = document.querySelectorAll("select");
		this.muteBtns = document.querySelectorAll(".mute-btn");
		this.tempoSlider = document.querySelector(".tempo-slider");
		this.index = 0;
		this.bpm = 150;
		this.isPlaying = null;
	}
	
	init() {
		const { items, tracks } = this;
		items.forEach((item, idx) => {
			const tempObj = {}
			const elem = document.querySelector(`.${item}-track`);
			const itemCap = `${item.slice(0, 1).toUpperCase() + item.slice(1)}`;

			tempObj["Track"] = itemCap;
			tempObj["track"] = item;
			tempObj["trackElem"] = elem;
			tempObj["trackIdx"] = idx;
			tempObj["muteBtn"] = elem.querySelector(`.${item}-volume`);
			tempObj["selectBtn"] = elem.querySelector(`#${item}-select`);
			tempObj["pads"] = elem.querySelector(`.${item}.track`);
			tempObj["audio"] = document.querySelector(`.${item}-sound`);

			tracks.push(tempObj);

			tracks[idx]["muteBtn"].setAttribute("data-track", tracks[idx]["trackIdx"]);
		});

	}

	activePad() {
		this.classList.toggle("active");
	}

	updateBtn() {
		const { isPlaying, playBtn } = this;
		if (isPlaying) {
			playBtn.innerText = "Play";
			playBtn.classList.remove("active");
		} else {
			playBtn.innerText = "Stop";
			playBtn.classList.add("active");
		}
	}

	start() {
		const { bpm } = this;
		const intrval = (60 / bpm) * 1000;
		if (this.isPlaying) {
			clearInterval(this.isPlaying);
			this.isPlaying = null;
			this.index = 0;
		} else {
			this.isPlaying = setInterval( () => {
				this.repeat();
			}, intrval );
		}		
	}

	repeat() {
		let step = this.index % this.items.length;
		const activeBars = document.querySelectorAll(`.b${step}`);
		activeBars.forEach( (bar, idx) => {
			bar.style.animation = `playTrack 0.3s alternate ease-in-out 2.15`;

			let temp = bar.parentElement.className.replace(/ track/ig, "");;
			if (bar.classList.contains("active")) {
				this.tracks[idx]["audio"].currentTime = 0;
				this.tracks[idx]["audio"].play();
			}

		} );
		this.index++;
	}

	changeSound(e) {
		const selectionName = e.target.name;
		const selectionValue = e.target.value;

		const targetAudio = selectionName.replace(/-.+/ig, "");
		const idx = this.items.indexOf(targetAudio);

		this.tracks[idx].audio.src = selectionValue;
	}

	mute(e) {
		const muteIdx = e.target.getAttribute("data-track");
		e.target.classList.toggle("active");
		if (e.target.classList.contains("active")) {
			this.loudOrMute(muteIdx, 0);
		} else {
			this.loudOrMute(muteIdx, 1);
		}
	}

	loudOrMute(idx, value) {
		const { tracks } = this;
		if (tracks[idx].audio.volume !== value) tracks[idx].audio.volume = value;
	}

	changeTempo(e, obj) {
		const tempoTxt = document.querySelector(".tempo-num");
		obj.bpm = e.target.value;
		tempoTxt.innerText = e.target.value;
	}

	updateTempo(e, obj) {
		clearInterval(obj.isPlaying);
		obj.bpm = e.target.value;
		obj.isPlaying = null;
		const playBtn = document.querySelector(".play");
		if (playBtn.classList.contains("active")) {
			obj.start();
		}
	}

}

const drumKit = new DrumKit(["clap",
							"cowbell",
							"crash",
							"hihat",
							"kick",
							"openhat",
							"perc",
							"snare"]);


drumKit.pads.forEach( pad => {
	pad.addEventListener("click", drumKit.activePad);
	pad.addEventListener("animationend", function() {
		this.style.animation = "";
	})
} );

drumKit.playBtn.addEventListener("click", function() {
	drumKit.updateBtn();
	drumKit.start();
});

document.addEventListener("keypress", function(e) {
	if (e.key === "Enter") {
		drumKit.updateBtn();
		drumKit.start();
	}
});

drumKit.selects.forEach( select => {
	select.addEventListener("change", function(e) {
		drumKit.changeSound(e);
	});
} );

drumKit.muteBtns.forEach( btn => {
	btn.addEventListener("click", function(e) {
		drumKit.mute(e);
	});
} );

[{func: drumKit.changeTempo, event: "input"}, {func: drumKit.updateTempo, event: "change"}].forEach( item => {
	drumKit.tempoSlider.addEventListener( item.event, function(e) {
		item.func(e, drumKit);
	} );
} );

console.log(drumKit);









