document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.video-player').forEach((videoPlayer) => {
		// Get all the controls
		const videoElement = videoPlayer.querySelector('video');
		const playPauseElement = videoPlayer.querySelector('.toggle-play-pause');
		const startTimeElement = videoPlayer.querySelector('.start-time');
		const endTimeElement = videoPlayer.querySelector('.end-time');
		const videoSeekbarElement = videoPlayer.querySelector('.video-seekbar');
		const videoProgressElement = videoSeekbarElement.querySelector('.progress');
		const toggleVolumeElement = videoPlayer.querySelector('.toggle-volume');
		const volumeSeekbarElement = videoPlayer.querySelector('.volume-seekbar');
		const volumeProgressElement = volumeSeekbarElement.querySelector(
			'.progress'
		);

		const videoSpeedControlsElement = videoPlayer.querySelector(
			'.video-speed-controls'
		);
		const videoSpeedIncreaseElement = videoSpeedControlsElement.querySelector(
			'.increase'
		);
		const videoSpeedDecreaseElement = videoSpeedControlsElement.querySelector(
			'.decrease'
		);
		const videoSpeedValueElement = videoSpeedControlsElement.querySelector(
			'.value'
		);
		const videoSpeedMoveElement = videoSpeedControlsElement.querySelector(
			'.move'
		);

		let totalDurationInSeconds = 0;
		let currentTimeInSeconds = 0;
		let currentDuration = null;
		let totalDuration = null;
		let seekPercantege = 0;
		let volumeValue = 1;
		let volumePercentage = 100;
		let speedValue = 1;

		// Hide/Show controls
		const HSC = {
			mouseNewCoor: { x: null, y: null },
			mouseCurrentCoor: { x: null, y: null },
			time: null,
			hideControlsInMouseStop: {
				init: false,
				id: null,
			},
		};

		const videoPlayerAddHideControls = () =>
			videoPlayer.classList.add('hide-controls');
		const videoPlayerRemoveHideControls = () =>
			videoPlayer.classList.remove('hide-controls');

		const changeHSC = (init, time, x, y) => {
			HSC.hideControlsInMouseStop.init = init;
			HSC.time = time;
			HSC.mouseCurrentCoor.x = x;
			HSC.mouseCurrentCoor.y = y;
		};

		const hideControlsInMouseStop = () => {
			if (
				HSC.mouseNewCoor.x === HSC.mouseCurrentCoor.x ||
				HSC.mouseNewCoor.y === HSC.mouseCurrentCoor.y
			)
				return;
			if (!HSC.hideControlsInMouseStop.init) {
				return;
			}
			clearInterval(HSC.hideControlsInMouseStop.id);
			HSC.hideControlsInMouseStop.id = setInterval(() => {
				HSC.hideControlsInMouseStop.init = false;
				if (new Date(new Date().getTime() - HSC.time).getTime() > 3000) {
					videoPlayerAddHideControls();
					clearInterval(HSC.hideControlsInMouseStop.id);
				}
			}, 500);
		};
		videoPlayer.addEventListener('mouseenter', (event) => {
			videoPlayerRemoveHideControls();
			changeHSC(true, new Date().getTime(), event.clientX, event.clientY);
			hideControlsInMouseStop();
		});
		videoPlayer.addEventListener('mousemove', (event) => {
			videoPlayerRemoveHideControls();
			changeHSC(true, new Date().getTime(), event.clientX, event.clientY);
			hideControlsInMouseStop();
		});
		videoPlayer.addEventListener('mouseleave', () => {
			changeHSC(false, null, null, null);
			HSC.mouseNewCoor.x = null;
			HSC.mouseNewCoor.y = null;
			clearInterval(HSC.hideControlsInMouseStop.id);
			videoPlayerAddHideControls();
		});
		// Helper Functions
		const helper_pad = (num) => {
			if (num > -10 && num < 10) {
				return `0${num}`;
			} else {
				return num;
			}
		};

		const helper_calculateDuration = (duration) => {
			const seconds = parseInt(duration % 60);
			const minutes = parseInt((duration % 3600) / 60);
			const hours = parseInt(duration / 3600);

			return {
				hours: helper_pad(hours),
				minutes: helper_pad(minutes.toFixed()),
				seconds: helper_pad(seconds.toFixed()),
			};
		};

		const helper_getPercentage = (presentTime, totalTime) => {
			const calcPercentage = (presentTime / totalTime) * 100;
			return parseFloat(calcPercentage.toString());
		};

		// Update Functions
		const updateTotalDuration = () => {
			endTimeElement.innerText = `${totalDuration.hours}:${totalDuration.minutes}:${totalDuration.seconds}`;
		};

		const updateCurrentTime = () => {
			startTimeElement.innerText = `${currentDuration.hours}:${currentDuration.minutes}:${currentDuration.seconds}`;
		};

		const updateSeekbar = () => {
			seekPercantege = helper_getPercentage(
				currentTimeInSeconds,
				totalDurationInSeconds
			);
			videoProgressElement.style.width = `${seekPercantege}%`;
		};

		const updateVolumebar = () => {
			volumeProgressElement.style.width = `${volumePercentage}%`;
		};

		const updateSpeedValue = () => {
			videoSpeedValueElement.innerText = speedValue;
			videoElement.playbackRate = speedValue;
		};

		// 1. Update the total duration
		videoElement.addEventListener('loadeddata', () => {
			totalDurationInSeconds = videoElement.duration;
			totalDuration = helper_calculateDuration(totalDurationInSeconds);
			updateTotalDuration();
			updateSeekbar();
			updateVolumebar();
		});

		// 2. Update current time
		videoElement.addEventListener('timeupdate', () => {
			currentTimeInSeconds = videoElement.currentTime;
			currentDuration = helper_calculateDuration(currentTimeInSeconds);
			updateCurrentTime();
			updateSeekbar();
		});

		//3. Update volume
		videoElement.addEventListener('volumechange', () => {
			volumePercentage = videoElement.volume * 100;
			updateVolumebar();
		});

		videoElement.addEventListener('ended', () => {
			volumePercentage = videoElement.volume * 100;
			updateVolumebar();
		});

		// User events

		// 4. Play the song
		playPauseElement.addEventListener('click', () => {
			if (playPauseElement.classList.contains('play')) {
				videoElement.play();
			} else {
				videoElement.pause();
			}

			playPauseElement.classList.toggle('play');
			playPauseElement.classList.toggle('pause');
		});

		//5. Toggle volume
		toggleVolumeElement.addEventListener('click', () => {
			videoElement.volume = videoElement.volume ? 0 : volumeValue;
			toggleVolumeElement.classList.toggle('on');
			toggleVolumeElement.classList.toggle('off');
		});

		//6. Volume bar click
		volumeSeekbarElement.addEventListener('click', (event) => {
			const tempVolumePosition =
				event.pageX - videoPlayer.offsetLeft - volumeSeekbarElement.offsetLeft;
			const tempVolumeValue =
				tempVolumePosition / volumeSeekbarElement.clientWidth;
			volumeValue = tempVolumeValue;
			videoElement.volume = tempVolumeValue.toFixed(1);
			if (toggleVolumeElement.classList.contains('off')) {
				toggleVolumeElement.classList.remove('off');
			}
		});

		/*//6. Volume bar drag
		volumeSeekbarElement.draggable = true;
		volumeSeekbarElement.addEventListener('dragover', (event) => {
			const tempVolumePosition =
				event.pageX - videoPlayer.offsetLeft - volumeSeekbarElement.offsetLeft;
			const tempVolumeValue =
				tempVolumePosition / volumeSeekbarElement.clientWidth;
			volumeValue = tempVolumeValue;
			videoElement.volume = tempVolumeValue.toFixed(1);
			if (toggleVolumeElement.classList.contains('off')) {
				toggleVolumeElement.classList.remove('off');
			}
		});*/

		// 7. seekbar click
		videoSeekbarElement.addEventListener('click', (event) => {
			const tempSeekbarPosition =
				event.pageX - videoPlayer.offsetLeft - videoSeekbarElement.offsetLeft;
			const tempSeekbarValue =
				tempSeekbarPosition / videoSeekbarElement.clientWidth;
			videoElement.currentTime = tempSeekbarValue * totalDurationInSeconds;
		});

		// 8. scroll on volumebar
		volumeSeekbarElement.addEventListener('wheel', (event) => {
			event.preventDefault();
			event.stopPropagation();
			let tempVolumeValue = videoElement.volume;
			if (event.wheelDelta > 0) {
				if (tempVolumeValue + 0.05 <= 1) {
					tempVolumeValue += 0.05;
				}
			} else if (tempVolumeValue - 0.05 >= 0) {
				tempVolumeValue -= 0.05;
			}

			volumeValue = tempVolumeValue.toFixed(2);
			videoElement.volume = tempVolumeValue.toFixed(2);
		});

		// 9. scroll on seekbar
		videoSeekbarElement.addEventListener('wheel', (event) => {
			event.preventDefault();
			event.stopPropagation();
			if (event.wheelDelta > 0) {
				videoElement.currentTime += 5;
			} else {
				videoElement.currentTime -= 5;
			}
		});

		// 10. speed video
		videoSpeedIncreaseElement.addEventListener('click', () => {
			if (speedValue + 0.25 > 16) {
				return;
			}
			speedValue += 0.25;
			updateSpeedValue();
		});

		// 11.
		videoSpeedDecreaseElement.addEventListener('click', () => {
			if (speedValue - 0.25 < 0.25) {
				return;
			}
			speedValue -= 0.25;
			updateSpeedValue();
		});

		// 12.

		videoSpeedMoveElement.addEventListener('mousedown', (event) => {
			const pos = {};
			pos.nx = event.clientX;
			pos.ny = event.clientY;
			const stopVideoSpeedMoveElement = () => {
				videoSpeedMoveElement.removeEventListener(
					'mouseup',
					stopVideoSpeedMoveElement
				);
				videoSpeedMoveElement.removeEventListener(
					'mouseout',
					stopVideoSpeedMoveElement
				);
				videoSpeedMoveElement.removeEventListener(
					'mousemove',
					startVideoSpeedMoveElement
				);
			};
			const startVideoSpeedMoveElement = (event) => {
				pos.ox = pos.nx - event.clientX;
				pos.oy = pos.ny - event.clientY;
				pos.nx = event.clientX;
				pos.ny = event.clientY;

				videoSpeedControlsElement.style.top = `${
					// parseFloat(getComputedStyle(videoSpeedControlsElement).top) - pos.oy
					videoSpeedControlsElement.offsetTop - pos.oy
				}px`;
				videoSpeedControlsElement.style.left = `${
					// parseFloat(getComputedStyle(videoSpeedControlsElement).left) - pos.ox
					videoSpeedControlsElement.offsetLeft - pos.ox
				}px`;
			};

			videoSpeedMoveElement.addEventListener(
				'mouseup',
				stopVideoSpeedMoveElement
			);
			videoSpeedMoveElement.addEventListener(
				'mouseout',
				stopVideoSpeedMoveElement
			);
			videoSpeedMoveElement.addEventListener(
				'mousemove',
				startVideoSpeedMoveElement
			);
		});

		//
		helper_getPercentage();
		// updateTotalDuration();
		// updateCurrentTime();
		updateSeekbar();
		updateVolumebar();
	});
});
