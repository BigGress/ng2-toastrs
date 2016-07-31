"use strict";
var ToasOptions = (function () {
    function ToasOptions(message, time, confirm, cancel, alwaysOpen, config) {
        this.message = message;
        this.time = time;
        this.confirm = confirm;
        this.cancel = cancel;
        this.alwaysOpen = alwaysOpen;
        this.config = config;
    }
    return ToasOptions;
}());
exports.ToasOptions = ToasOptions;
