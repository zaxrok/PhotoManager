import {Injectable} from 'angular2/core';

declare var electron:any;
declare var watson:any;
declare var fs:any;
@Injectable()

export class IpcRendererService {

	ipcRenderer = electron.ipcRenderer;


	constructor() {}

	on(message:string, callback) {
		this.ipcRenderer.on(message, callback);
	}

	send(message:string, ...args) {
		this.ipcRenderer.send(message, args);
	}
	test(){		
		console.log('called test()');
		var text_to_speech = new watson({
		username: '93fa8bca-8d8c-4563-91c1-5eed2d508117',
		password: 'fCwqeFMeLyHY'
		});
		
		var params = {
		text: 'Hello from IBM Watson one',
		voice: 'en-US_AllisonVoice', // Optional voice 
		accept: 'audio/wav'
		};
		// Pipe the synthesized text to a file 
		text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'));

	}
}