"use strict";
var ipc_renderer_service_1 = require('./ipc-renderer.service');
var DirectoryService = (function () {
    function DirectoryService() {
        this.ipc = new ipc_renderer_service_1.IpcRendererService();
    }
    DirectoryService.prototype.getHomeDirectory = function () {
    };
    return DirectoryService;
}());
exports.DirectoryService = DirectoryService;
//# sourceMappingURL=directory.service.js.map