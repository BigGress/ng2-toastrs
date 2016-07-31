import {ToastrConfig} from "./toastr.config";

export class ToasOptions{
    constructor(public message:string,
                public time?:number,
                public confirm?:Function,
                public cancel?:Function,
                public alwaysOpen?:boolean,
                public config?:ToastrConfig){
    }
}

interface options{
    time:number
}