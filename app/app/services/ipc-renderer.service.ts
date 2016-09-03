import {Injectable} from 'angular2/core';

declare var electron:any;

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
}