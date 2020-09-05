class Timer {
	constructor(durationInp, startBtn, pauseBtn, callbacks) {
		this.durationInp = durationInp;
		this.startBtn = startBtn;
		this.pauseBtn = pauseBtn;

		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}

		this.startBtn.addEventListener("click", this.start);
		this.pauseBtn.addEventListener("click", this.pause);
	}

	start = () => {
		if (this.onStart) {
			this.onStart(this.timeRemaining);
		}
		this.tick();
		this.intervalId = setInterval(() => this.tick(), 50);
	};

	pause = () => {
		clearInterval(this.intervalId);
	};

	tick = () => {
		if (this.timeRemaining <= 0) {
			if (this.onComplete) {
				this.onComplete();
			}
			return this.pause();
		}
		// Setter& getter
		this.timeRemaining = this.timeRemaining - 0.05;
		if (this.onTick) {
			this.onTick(this.timeRemaining);
		}

		//if (this.timeRemaining === 0) clearInterval(this.intervalId);
	};

	get timeRemaining() {
		return parseFloat(this.durationInp.value);
	}

	set timeRemaining(time) {
		this.durationInp.value = time.toFixed(2);
	}
}
