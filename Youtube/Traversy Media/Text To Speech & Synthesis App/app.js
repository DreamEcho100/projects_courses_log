document.addEventListener("DOMContentLoaded", () => {
	// Init SpeechSynth API
	const synth = window.speechSynthesis;

	// DOM Elements
	const body = document.querySelector("body");
	const textToSpeech = body.querySelector(".text-to-speech");
	const textToSpeechForm = textToSpeech.querySelector(".text-to-speech form");
	const textToSpeechTextInput = textToSpeechForm.querySelector("#text-input");
	const textToSpeechVoiceSelect = textToSpeechForm.querySelector("#voice-select");
	const textToSpeechRate = textToSpeechForm.querySelector("#rate");
	const textToSpeechRateValue = textToSpeechForm.querySelector("#rate-value");
	const textToSpeechPitch = textToSpeechForm.querySelector("#pitch");
	const textToSpeechPitchValue = textToSpeechForm.querySelector("#pitch-value");
	const textToSpeechButton = textToSpeechForm.querySelector(".play-btn");
	const textToSpeechStopBtn =  textToSpeechForm.querySelector(".stop-btn");
	const textToSpeechResumeBtn =  textToSpeechForm.querySelector(".resume-btn");


	textToSpeechStopBtn.addEventListener("click", () => {
	  if(synth.speaking && !synth.paused){
	    synth.pause();
	    console.log("paused");
	    textToSpeechStopBtn.classList.add("isHidden");
	    textToSpeechResumeBtn.classList.remove("isHidden");
	  }
	});
	textToSpeechResumeBtn.addEventListener("click", () => {
	  if(!synth.speaking && synth.paused){
	    synth.resume();
	    console.log("resumed");
	    textToSpeechResumeBtn.classList.add("isHidden");
	    textToSpeechStopBtn.classList.remove("isHidden");
	  }
	});

	const getVoices = () => {
	  voices = synth.getVoices().sort(function (a, b) {
	    const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
	    if ( aname < bname ) return -1;
	    else if ( aname == bname ) return 0;
	    else return +1;
	  });
		// const voicesPosCurrentObj = {};
		// const voicesPosPreviousObj = {};
	 //  const voicesNameArray = voices.map(voice => voice.name);
		// const voicesNameArraySorted = voicesNameArray.slice().sort();
		// for (let i = 0; i < voicesNameArraySorted.length; i++) {
		// 	voicesPosCurrentObj[i] = voicesNameArraySorted[i];
		// 	voicesPosPreviousObj[voices[i].name] = i;
		// }

		// const voicesSorted = [];
		// for (let i = 0; i < voices.length; i++) {
		//     voicesSorted[i] = voices[voicesPosPreviousObj[voicesPosCurrentObj[i]]];
		// }

	  voices.forEach(voice => {
	    const option = document.createElement("option");

	    option.textContent = `${voice.name} (${voice.lang})`

	    option.setAttribute("data-lang", voice.lang);
	    option.setAttribute("data-name", voice.name);
	    textToSpeechVoiceSelect.appendChild(option);
	  });
	}

	getVoices();
	if(synth.onvoiceschanged !== undefined) {
	  synth.onvoiceschanged = getVoices;
	}


	let speakText;
	// Speak
	const textToSpeechFormSpeak = () => {

	  // if (synth.speaking) {
	  //   console.error("Already Speaking!!!");
	  //   return;
	  // }

	  if (textToSpeechTextInput.value !== '') {
	    speakText = new SpeechSynthesisUtterance(textToSpeechTextInput.value);

	    speakText.onend = () => {
	      console.log("Done Speaking...");
	      textToSpeech.style.background = '#141414';
	    }

	    speakText.onstart = () => {
	      textToSpeech.style.background = 'url(./images/wave.gif), #141414';
	      // textToSpeech.style.repeat = 'repeat-x';
	      // textToSpeech.style.backgroundSize = '100% 100%';
	    }

	    speakText.onerror = () => {
	      console.error('Somthing went wrong :(');
	    }
	    
	    voices.forEach(voice => {
	      const selectedVoice = textToSpeechVoiceSelect.selectedOptions[0].getAttribute('data-name');
	      if(voice.name === selectedVoice) {
	        speakText.voice = voice;
	      }
	    });
	    speakText.rate = textToSpeechRate.value;
	    speakText.pitch = textToSpeechPitch.value;

	    synth.speak(speakText);
	  }
	}

	textToSpeechForm.addEventListener("submit", event => {
	  event.preventDefault();
	  textToSpeechFormSpeak();
	  textToSpeechTextInput.getBoundingClientRect();
	});

	textToSpeechRate.addEventListener("input", () => textToSpeechRateValue.textContent = textToSpeechRate.value);

	textToSpeechPitch.addEventListener("input", () => textToSpeechPitchValue.textContent = textToSpeechPitch.value);

	textToSpeechVoiceSelect.addEventListener('change', () => textToSpeechFormSpeak());


	textToSpeechRateValue.textContent = textToSpeechRate.value;
	textToSpeechPitchValue.textContent = textToSpeechPitch.value;
});