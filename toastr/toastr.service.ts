import {
    DynamicComponentLoader,
    ComponentResolver,
    Injectable,
    Host,
    Injector,
    ComponentRef,
    ViewContainerRef,
    ApplicationRef,
    Optional,
    ReflectiveInjector,
    provide,
    Inject,
    ViewChild,
} from "@angular/core";

import {toastrComponent} from "./toastr.component";
import {ToasOptions} from "./toastr.opetion";
import {ToastrConfig} from "./toastr.config";


@Injectable()
export class ToastrService{
    @ViewChild(toastrComponent) toastrEl;
    toastrNumber:number = 0;
    thisToastrElm:ComponentRef<any>;
    config:any;
    constructor(
        @Optional() @Inject(ToastrConfig) data,
        private dcl:DynamicComponentLoader,
        private viewCR:ApplicationRef
        ){
            this.setDefaultConfig(data);
    }
    setDefaultConfig(data){
        if(!!data){
            this.config = data;
        }else{
            this.config = {
                position:"top-right"
            }
        }
    }

    public createElement(icon:string,message:string,option:Object){
        let provider = {
            message:message,
            icon:icon,
            config:this.config,
        }
        Object.assign(provider,option)

        //get Root Dom;
        let element:ViewContainerRef = this.viewCR["_rootComponents"][0]['_hostElement'].vcRef;
        let bindings = ReflectiveInjector.resolve([ 
            provide(ToasOptions,{useValue:provider})
        ]);
        
        //add toastr to RootDom
        this.dcl.loadNextToLocation(toastrComponent,element,bindings)
            .then((ref)=>{
                this.thisToastrElm = ref;
                // this.thisToastrElm.push(ref);
                ref.instance.getData.toastr = ref;
                // this.countBack();
            })
    }

    public success(message:string,option?:Object){
        this.createElement("success",message,option);
        // let options:ToasOptions = {
        //     message:message
        // };

        // this.thisToastrElm.instance.addToastr()
    }
    public warning(message:string,option?:Object){
        this.createElement("warning",message,option);
        // let options:ToasOptions = {
        //     message:message
        // };

        // this.thisToastrElm.instance.addToastr()
    }
    public error(message:string,option?:Object){
        this.createElement("error",message,option);
        // let options:ToasOptions = {
        //     message:message
        // };

        // this.thisToastrElm.instance.addToastr()
    }
    public info(message:string,option?:Object){
        this.createElement("info",message,option);
        // let options:ToasOptions = {
        //     message:message
        // };

        // this.thisToastrElm.instance.addToastr()
    }
}