"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var IpcRendererService = (function () {
    function IpcRendererService() {
        this.ipcRenderer = electron.ipcRenderer;
    }
    IpcRendererService.prototype.on = function (message, callback) {
        this.ipcRenderer.on(message, callback);
    };
    IpcRendererService.prototype.send = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.ipcRenderer.send(message, args);
    };
    IpcRendererService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], IpcRendererService);
    return IpcRendererService;
}());
exports.IpcRendererService = IpcRendererService;
//# sourceMappingURL=ipc-renderer.service.js.map