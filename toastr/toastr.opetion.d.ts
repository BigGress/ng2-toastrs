import { ToastrConfig } from "./toastr.config";
export declare class ToasOptions {
    message: string;
    time: number;
    confirm: Function;
    cancel: Function;
    alwaysOpen: boolean;
    config: ToastrConfig;
    constructor(message: string, time?: number, confirm?: Function, cancel?: Function, alwaysOpen?: boolean, config?: ToastrConfig);
}
