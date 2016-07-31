"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var toastr_opetion_1 = require("./toastr.opetion");
var toastrComponent = (function () {
    function toastrComponent(data) {
        this.animationDirection = "translate(100%)";
        this.animationName = "in";
        this.toastrs = [];
        this.getData = data || {};
        this.setDefaultaAnimate();
    }
    toastrComponent.prototype.ngAfterViewInit = function () {
        //start count then remove dom
        var time = this.getData.time ||
            this.getData.config.defaultTime || 10000;
        if (this.getData.alwaysOpen === true) {
            //check has event
            if (!(!!this.getData.cancel || !!this.getData.confirm)) {
                console.error("cancle event or confirm event must set when you set alwaysOpen");
                this.countBack(time);
            }
            if (!(!!this.getData.cancel || !!this.getData.confirm) || !!this.getData.time) {
                this.countBack(time);
            }
        }
        else {
            this.countBack(time);
        }
    };
    toastrComponent.prototype.setDefaultaAnimate = function () {
        if (!!this.getData.config) {
            if (!this.getData.config.position) {
                this.getData.config.position = "top-right";
            }
            this.getData.config.position.endsWith("left") && (this.animationDirection = "translate(-100%)");
        }
    };
    toastrComponent.prototype.addToastr = function (options) {
        this.toastrs.push(options);
    };
    // the confirm event
    toastrComponent.prototype.confirmEvent = function () {
        this.getData.confirm();
        this.countBack(0);
    };
    toastrComponent.prototype.cancelEvent = function () {
        this.getData.cancel();
        this.countBack(0);
    };
    //begin count
    toastrComponent.prototype.countBack = function (time) {
        var _this = this;
        setTimeout(function () {
            _this.animationName =
                _this.getData.config.position.indexOf("left") > 0 ? "out-left" : "out-right";
        }, time);
        setTimeout(function () {
            _this.removeToastr();
        }, time + 1000);
    };
    //remove this dom
    toastrComponent.prototype.removeToastr = function () {
        this.getData["toastr"]["destroy"]();
    };
    toastrComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "toastr",
            template: " \n        <div class=\"toastr-box {{getData.config.position || 'top-right'}} {{getData.icon}}\" \n             @toastrAnimate='animationName'\n             [ngStyle]=\"{'transform':animationDirection}\">\n            <span>{{getData.message}}</span>\n            <div class=\"buttons-box\" *ngIf=\"getData.confirm || getData.cancel\">\n                <button class=\"confirm\"\n                        [ngClass]=\"{'noCancel':!getData.cancel}\"\n                        *ngIf=\"getData.confirm\"\n                        (click)=\"confirmEvent()\">\u786E\u8BA4</button>\n                <button class=\"cancel\"\n                        [ngClass]=\"{'noConfirm':!getData.confirm}\"\n                        *ngIf=\"getData.cancel\"\n                        (click)=\"cancelEvent()\">\u53D6\u6D88</button>\n            </div>\n        </div>\n    ",
            styleUrls: ["./toastr.component.css"],
            animations: [
                core_1.trigger("toastrAnimate", [
                    core_1.state("in", core_1.style({
                        transform: 'translateX(0)',
                        opacity: 1
                    })),
                    core_1.state("out-right", core_1.style({
                        transform: 'translateX(100%)',
                        opacity: 0
                    })),
                    core_1.state("out-left", core_1.style({
                        transform: 'translateX(-100%)',
                        opacity: 0
                    })),
                    core_1.transition("void => in", [
                        core_1.style({
                            // transform: 'translateX(100%)',
                            opacity: 0
                        }),
                        core_1.animate(200)
                    ]),
                    core_1.transition("in => *", [
                        //perpare for RC5
                        core_1.style({}),
                        core_1.animate(180)
                    ]),
                ])
            ]
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.Inject(toastr_opetion_1.ToasOptions))
    ], toastrComponent);
    return toastrComponent;
}());
exports.toastrComponent = toastrComponent;
