import {Injectable} from "@angular/core";

@Injectable()
export class ToastrConfig{
    position:string;
    defaultTime:number;
    constructor(option:Object){
        Object.assign(this,option)
    }
}