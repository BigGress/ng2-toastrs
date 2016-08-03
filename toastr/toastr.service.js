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
var toastr_component_1 = require("./toastr.component");
var toastr_opetion_1 = require("./toastr.opetion");
var toastr_config_1 = require("./toastr.config");
var ToastrService = (function () {
    function ToastrService(data, dcl, viewCR) {
        this.dcl = dcl;
        this.viewCR = viewCR;
        this.toastrMessage = [];
        this.toastrNumber = 0;
        this.setDefaultConfig(data);
    }
    ToastrService.prototype.setDefaultConfig = function (data) {
        if (!!data) {
            this.config = data;
        }
        else {
            this.config = {
                position: "top-right"
            };
        }
    };
    ToastrService.prototype.createElement = function (icon, message, option) {
        var _this = this;
        var provider = {
            message: message,
            icon: icon,
            config: this.config,
            service: this
        };
        Object.assign(provider, option);
        //get Root Dom;
        var element = this.viewCR["_rootComponents"][0]['_hostElement'].vcRef;
        var bindings = core_1.ReflectiveInjector.resolve([
            core_1.provide(toastr_opetion_1.ToasOptions, { useValue: provider })
        ]);
        //add toastr to RootDom
        this.dcl.loadNextToLocation(toastr_component_1.toastrComponent, element, bindings)
            .then(function (ref) {
            _this.thisToastrElm = ref;
            // this.thisToastrElm.push(ref);
            ref.instance.getData.toastr = ref;
            //push data
            _this.toastrMessage.push(provider);
            // this.countBack();
        });
    };
    ToastrService.prototype.findToastrIndex = function (obj) {
        return this.toastrMessage.indexOf(obj);
    };
    ToastrService.prototype.success = function (message, option) {
        this.createElement("success", message, option);
        // let options:ToasOptions = {
        //     message:message
        // };
        // this.thisToastrElm.instance.addToastr()
    };
    ToastrService.prototype.warning = function (message, option) {
        this.createElement("warning", message, option);
        // let options:ToasOptions = {
        //     message:message
        // };
        // this.thisToastrElm.instance.addToastr()
    };
    ToastrService.prototype.error = function (message, option) {
        this.createElement("error", message, option);
        // let options:ToasOptions = {
        //     message:message
        // };
        // this.thisToastrElm.instance.addToastr()
    };
    ToastrService.prototype.info = function (message, option) {
        this.createElement("info", message, option);
        // let options:ToasOptions = {
        //     message:message
        // };
        // this.thisToastrElm.instance.addToastr()
    };
    __decorate([
        core_1.ViewChild(toastr_component_1.toastrComponent)
    ], ToastrService.prototype, "toastrEl");
    ToastrService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()),
        __param(0, core_1.Inject(toastr_config_1.ToastrConfig))
    ], ToastrService);
    return ToastrService;
}());
exports.ToastrService = ToastrService;
