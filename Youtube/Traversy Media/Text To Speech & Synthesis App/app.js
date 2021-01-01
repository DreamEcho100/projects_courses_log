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
const textToSpeechButton = textToSpeechForm.querySelector("button");

const getVoices = () => {
  voices = synth.getVoices();

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

// Speak
const textToSpeechFormSpeak = () => {

  if (synth.speaking) {
    console.error("Already Speaking!!!");
    return;
  }

  if (textToSpeechTextInput.value !== '') {
    const speakText = new SpeechSynthesisUtterance(textToSpeechTextInput.value);

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