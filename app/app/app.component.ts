import { Component } from 'angular2/core';
import {IpcRendererService} from './services/ipc-renderer.service';

var ipc = new IpcRendererService();
ipc.send('folderContent', '/Users');
ipc.on('folderContent', (event, files) => {
	console.log(files);
});

@Component({
	selector: 'app',
	template: '<h1>Hello</h1>'
})
export class AppComponent {


}