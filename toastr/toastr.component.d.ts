import { AfterViewInit } from "@angular/core";
import { ToasOptions } from "./toastr.opetion";
export declare class toastrComponent implements AfterViewInit {
    animationDirection: string;
    animationName: string;
    toastrs: ToasOptions[];
    getData: ToasOptions;
    constructor(data: any);
    ngAfterViewInit(): void;
    setDefaultaAnimate(): void;
    addToastr(options: ToasOptions): void;
    confirmEvent(): void;
    cancelEvent(): void;
    countBack(time: number): void;
    removeToastr(): void;
}
