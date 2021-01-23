// SpeechSynthesisRecorder.js guest271314 6-17-2017
// Motivation: Get audio output from `window.speechSynthesis.speak()` call
// as `ArrayBuffer`, `AudioBuffer`, `Blob`, `MediaSource`, `MediaStream`, `ReadableStream`, or other object or data types
// See https://lists.w3.org/Archives/Public/public-speech-api/2017Jun/0000.html
// https://github.com/guest271314/SpeechSynthesisRecorder

// Configuration: Analog Stereo Duplex
// Input Devices: Monitor of Built-in Audio Analog Stereo, Built-in Audio Analog Stereo

class SpeechSynthesisRecorder {
  constructor({text = "", utteranceOptions = {}, recorderOptions = {}, dataType = ""}) {
    if (text === "") throw new Error("no words to synthesize");
    this.dataType = dataType;
    this.text = text;
    this.mimeType = MediaRecorder.isTypeSupported("audio/webm; codecs=opus") 
                    ? "audio/webm; codecs=opus" : "audio/ogg; codecs=opus";
    this.utterance = new SpeechSynthesisUtterance(this.text);
    this.speechSynthesis = window.speechSynthesis;
    this.mediaStream_ = new MediaStream();
    this.mediaSource_ = new MediaSource();
    this.mediaRecorder = new MediaRecorder(this.mediaStream_, {
      mimeType: this.mimeType,
      bitsPerSecond: 256 * 8 * 1024
    });
    this.audioContext = new AudioContext();
    this.audioNode = new Audio();
    this.chunks = Array();
    if (utteranceOptions) {
      if (utteranceOptions.voice) {
        this.speechSynthesis.onvoiceschanged = e => {
          const voice = this.speechSynthesis.getVoices().find(({
            name: _name
          }) => _name === utteranceOptions.voice);
          this.utterance.voice = voice;
          console.log(voice, this.utterance);
        }
        this.speechSynthesis.getVoices();
      }
      let {
        lang, rate, pitch
      } = utteranceOptions;
      Object.assign(this.utterance, {
        lang, rate, pitch
      });
    }
    this.audioNode.controls = "controls";
    document.body.appendChild(this.audioNode);
  }
  start(text = "") {
    if (text) this.text = text;
    if (this.text === "") throw new Error("no words to synthesize");
    return navigator.mediaDevices.getUserMedia({
        audio: true
      })
      .then(stream => new Promise(resolve => {
        const track = stream.getAudioTracks()[0];
        this.mediaStream_.addTrack(track);
        // return the current `MediaStream`
        if (this.dataType && this.dataType === "mediaStream") {
          resolve({tts:this, data:this.mediaStream_});
        };
        this.mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) {
            this.chunks.push(event.data);
          };
        };
        this.mediaRecorder.onstop = () => {
          track.stop();
          this.mediaStream_.getAudioTracks()[0].stop();
          this.mediaStream_.removeTrack(track);
          console.log(`Completed recording ${this.utterance.text}`, this.chunks);
          resolve(this);
        }
        this.mediaRecorder.start();
        this.utterance.onstart = () => {
          console.log(`Starting recording SpeechSynthesisUtterance ${this.utterance.text}`);
        }
        this.utterance.onend = () => {
          this.mediaRecorder.stop();
          console.log(`Ending recording SpeechSynthesisUtterance ${this.utterance.text}`);
        }
        this.speechSynthesis.speak(this.utterance);
      }));
  }
  blob() {
    if (!this.chunks.length) throw new Error("no data to return");
    return Promise.resolve({
      tts: this,
      data: this.chunks.length === 1 ? this.chunks[0] : new Blob(this.chunks, {
        type: this.mimeType
      })
    });
  }
  arrayBuffer(blob) {
    if (!this.chunks.length) throw new Error("no data to return");
    return new Promise(resolve => {
      const reader = new FileReader;
      reader.onload = e => resolve(({
        tts: this,
        data: reader.result
      }));
      reader.readAsArrayBuffer(blob ? new Blob(blob, {
        type: blob.type
      }) : this.chunks.length === 1 ? this.chunks[0] : new Blob(this.chunks, {
        type: this.mimeType
      }));
    });
  }
  audioBuffer() {
    if (!this.chunks.length) throw new Error("no data to return");
    return this.arrayBuffer()
      .then(ab => this.audioContext.decodeAudioData(ab))
      .then(buffer => ({
        tts: this,
        data: buffer
      }))
  }
  mediaSource() {
    if (!this.chunks.length) throw new Error("no data to return");
    return this.arrayBuffer()
      .then(({
        data: ab
      }) => new Promise((resolve, reject) => {
        this.mediaSource_.onsourceended = () => resolve({
          tts: this,
          data: this.mediaSource_
        });
        this.mediaSource_.onsourceopen = () => {
          if (MediaSource.isTypeSupported(this.mimeType)) {
            const sourceBuffer = this.mediaSource_.addSourceBuffer(this.mimeType);
            sourceBuffer.mode = "sequence"
            sourceBuffer.onupdateend = () =>
              this.mediaSource_.endOfStream();
            sourceBuffer.appendBuffer(ab);
          } else {
            reject(`${this.mimeType} is not supported`)
          }
        }
        this.audioNode.src = URL.createObjectURL(this.mediaSource_);
      }));
  }
  readableStream({size = 1024, controllerOptions = {}, rsOptions = {}}) {
    if (!this.chunks.length) throw new Error("no data to return");
    const src = this.chunks.slice(0);
    const chunk = size;
    return Promise.resolve({
      tts: this,
      data: new ReadableStream(controllerOptions || {
        start(controller) {
            console.log(src.length);
            controller.enqueue(src.splice(0, chunk))
          },
          pull(controller) {
            if (src.length = 0) controller.close();
            controller.enqueue(src.splice(0, chunk));
          }
      }, rsOptions)
    });
  }
}
















// SpeechSynthesisRecorder.js guest271314 6-17-2017
// Motivation: Get audio output from `window.speechSynthesis.speak()` call
// as `ArrayBuffer`, `AudioBuffer`, `Blob`, `MediaSource`, `MediaStream`, `ReadableStream`, or other object or data types
// See https://lists.w3.org/Archives/Public/public-speech-api/2017Jun/0000.html
// https://github.com/guest271314/SpeechSynthesisRecorder

// Configuration: Analog Stereo Duplex
// Input Devices: Monitor of Built-in Audio Analog Stereo, Built-in Audio Analog Stereo

class SpeechSynthesisRecorder {
  constructor({text = "", utteranceOptions = {}, recorderOptions = {}, dataType = ""}) {
    if (text === "") throw new Error("no words to synthesize");
    this.dataType = dataType;
    this.text = text;
    this.mimeType = MediaRecorder.isTypeSupported("audio/webm; codecs=opus") 
                    ? "audio/webm; codecs=opus" : "audio/ogg; codecs=opus";
    this.utterance = new SpeechSynthesisUtterance(this.text);
    this.speechSynthesis = window.speechSynthesis;
    this.mediaStream_ = new MediaStream();
    this.mediaSource_ = new MediaSource();
    this.mediaRecorder = new MediaRecorder(this.mediaStream_, {
      mimeType: this.mimeType,
      bitsPerSecond: 256 * 8 * 1024
    });
    this.audioContext = new AudioContext();
    this.audioNode = new Audio();
    this.chunks = Array();
    if (utteranceOptions) {
      if (utteranceOptions.voice) {
        this.speechSynthesis.onvoiceschanged = e => {
          const voice = this.speechSynthesis.getVoices().find(({
            name: _name
          }) => _name === utteranceOptions.voice);
          this.utterance.voice = voice;
          console.log(voice, this.utterance);
        }
        this.speechSynthesis.getVoices();
      }
      let {
        lang, rate, pitch
      } = utteranceOptions;
      Object.assign(this.utterance, {
        lang, rate, pitch
      });
    }
    this.audioNode.controls = "controls";
    document.body.appendChild(this.audioNode);
  }
  start(text = "") {
    if (text) this.text = text;
    if (this.text === "") throw new Error("no words to synthesize");
    return navigator.mediaDevices.getUserMedia({
        audio: true
      })
      .then(stream => new Promise(resolve => {
        const track = stream.getAudioTracks()[0];
        this.mediaStream_.addTrack(track);
        // return the current `MediaStream`
        if (this.dataType && this.dataType === "mediaStream") {
          resolve({tts:this, data:this.mediaStream_});
        };
        this.mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) {
            this.chunks.push(event.data);
          };
        };
        this.mediaRecorder.onstop = () => {
          track.stop();
          this.mediaStream_.getAudioTracks()[0].stop();
          this.mediaStream_.removeTrack(track);
          console.log(`Completed recording ${this.utterance.text}`, this.chunks);
          resolve(this);
        }
        this.mediaRecorder.start();
        this.utterance.onstart = () => {
          console.log(`Starting recording SpeechSynthesisUtterance ${this.utterance.text}`);
        }
        this.utterance.onend = () => {
          this.mediaRecorder.stop();
          console.log(`Ending recording SpeechSynthesisUtterance ${this.utterance.text}`);
        }
        this.speechSynthesis.speak(this.utterance);
      }));
  }
  blob() {
    if (!this.chunks.length) throw new Error("no data to return");
    return Promise.resolve({
      tts: this,
      data: this.chunks.length === 1 ? this.chunks[0] : new Blob(this.chunks, {
        type: this.mimeType
      })
    });
  }
  arrayBuffer(blob) {
    if (!this.chunks.length) throw new Error("no data to return");
    return new Promise(resolve => {
      const reader = new FileReader;
      reader.onload = e => resolve(({
        tts: this,
        data: reader.result
      }));
      reader.readAsArrayBuffer(blob ? new Blob(blob, {
        type: blob.type
      }) : this.chunks.length === 1 ? this.chunks[0] : new Blob(this.chunks, {
        type: this.mimeType
      }));
    });
  }
  audioBuffer() {
    if (!this.chunks.length) throw new Error("no data to return");
    return this.arrayBuffer()
      .then(ab => this.audioContext.decodeAudioData(ab))
      .then(buffer => ({
        tts: this,
        data: buffer
      }))
  }
  mediaSource() {
    if (!this.chunks.length) throw new Error("no data to return");
    return this.arrayBuffer()
      .then(({
        data: ab
      }) => new Promise((resolve, reject) => {
        this.mediaSource_.onsourceended = () => resolve({
          tts: this,
          data: this.mediaSource_
        });
        this.mediaSource_.onsourceopen = () => {
          if (MediaSource.isTypeSupported(this.mimeType)) {
            const sourceBuffer = this.mediaSource_.addSourceBuffer(this.mimeType);
            sourceBuffer.mode = "sequence"
            sourceBuffer.onupdateend = () =>
              this.mediaSource_.endOfStream();
            sourceBuffer.appendBuffer(ab);
          } else {
            reject(`${this.mimeType} is not supported`)
          }
        }
        this.audioNode.src = URL.createObjectURL(this.mediaSource_);
      }));
  }
  readableStream({size = 1024, controllerOptions = {}, rsOptions = {}}) {
    if (!this.chunks.length) throw new Error("no data to return");
    const src = this.chunks.slice(0);
    const chunk = size;
    return Promise.resolve({
      tts: this,
      data: new ReadableStream(controllerOptions || {
        start(controller) {
            console.log(src.length);
            controller.enqueue(src.splice(0, chunk))
          },
          pull(controller) {
            if (src.length = 0) controller.close();
            controller.enqueue(src.splice(0, chunk));
          }
      }, rsOptions)
    });
  }
}

Usage

let ttsRecorder = new SpeechSynthesisRecorder({
   text: "The revolution will not be televised", 
   utternanceOptions: {
     voice: "english-us espeak",
     lang: "en-US",
     pitch: .75,
     rate: 1
   }
 });

 // ArrayBuffer
 ttsRecorder.start()
 // `tts` : `SpeechSynthesisRecorder` instance, `data` : audio as `dataType` or method call result
 .then(tts => tts.arrayBuffer())
 .then(({tts, data}) => {
   // do stuff with `ArrayBuffer`, `AudioBuffer`, `Blob`,
   // `MediaSource`, `MediaStream`, `ReadableStream`
   // `data` : `ArrayBuffer`
   tts.audioNode.src = URL.createObjectURL(new Blob([data], {type:tts.mimeType}));
   tts.audioNode.title = tts.utterance.text;
   tts.audioNode.onloadedmetadata = () => {
     console.log(tts.audioNode.duration);
     tts.audioNode.play();
   }
 })
 // AudioBuffer     
 ttsRecorder.start()
 .then(tts => tts.audioBuffer())
 .then(({tts, data}) => {
   // `data` : `AudioBuffer`
   let source = tts.audioContext.createBufferSource();
   source.buffer = data;
   source.connect(tts.audioContext.destination);
   source.start()
 })
 // Blob
 ttsRecorder.start()
 .then(tts => tts.blob())
 .then(({tts, data}) => {
   // `data` : `Blob`
   tts.audioNode.src = URL.createObjectURL(blob);
   tts.audioNode.title = tts.utterance.text;
   tts.audioNode.onloadedmetadata = () => {
     console.log(tts.audioNode.duration);
     tts.audioNode.play();
   }
 })
 // ReadableStream
 ttsRecorder.start()
 .then(tts => tts.readableStream())
 .then(({tts, data}) => {
   // `data` : `ReadableStream`
   console.log(tts, data);
   data.getReader().read().then(({value, done}) => {
     tts.audioNode.src = URL.createObjectURL(value[0]);
     tts.audioNode.title = tts.utterance.text;
     tts.audioNode.onloadedmetadata = () => {
       console.log(tts.audioNode.duration);
       tts.audioNode.play();
     }
   })
 })
 // MediaSource
 ttsRecorder.start()
 .then(tts => tts.mediaSource())
 .then(({tts, data}) => {
   console.log(tts, data);
   // `data` : `MediaSource`
   tts.audioNode.srcObj = data;
   tts.audioNode.title = tts.utterance.text;
   tts.audioNode.onloadedmetadata = () => {
     console.log(tts.audioNode.duration);
     tts.audioNode.play();
   }
 })
 // MediaStream
 let ttsRecorder = new SpeechSynthesisRecorder({
   text: "The revolution will not be televised", 
   utternanceOptions: {
     voice: "english-us espeak",
     lang: "en-US",
     pitch: .75,
     rate: 1
   }, 
   dataType:"mediaStream"
 });
 ttsRecorder.start()
 .then(({tts, data}) => {
   // `data` : `MediaStream`
   // do stuff with active `MediaStream`
 })
 .catch(err => console.log(err))
