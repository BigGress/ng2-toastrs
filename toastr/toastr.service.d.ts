import { DynamicComponentLoader, ComponentRef, ApplicationRef } from "@angular/core";
export declare class ToastrService {
    private dcl;
    private viewCR;
    toastrEl: any;
    toastrMessage: Object[];
    toastrNumber: number;
    thisToastrElm: ComponentRef<any>;
    config: any;
    constructor(data: any, dcl: DynamicComponentLoader, viewCR: ApplicationRef);
    setDefaultConfig(data: any): void;
    createElement(icon: string, message: string, option: Object): void;
    findToastrIndex(obj: Object): number;
    success(message: string, option?: Object): void;
    warning(message: string, option?: Object): void;
    error(message: string, option?: Object): void;
    info(message: string, option?: Object): void;
}
