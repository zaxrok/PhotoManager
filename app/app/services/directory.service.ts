import {IpcRendererService} from './ipc-renderer.service';

export class DirectoryService {

	private ipc:IpcRendererService;

	constructor() {
		this.ipc = new IpcRendererService();
	}

	getHomeDirectory() {

	}
}