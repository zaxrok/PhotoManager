import { Component } from 'angular2/core';
import {IpcRendererService} from './services/ipc-renderer.service';

var ipc = new IpcRendererService();
ipc.send('folderContent', '~');
ipc.on('folderContent', (files) => {
	console.log(files);
});

@Component({
	selector: 'app',
	template: '<h1>Hello</h1>'
})
export class AppComponent {


}