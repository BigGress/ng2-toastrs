import {
    Component,
    Optional,
    Inject,
    animate,
    trigger,
    state,
    style,
    transition,
    keyframes,
    AfterViewInit,
    ElementRef,
    ComponentRef,
    ViewContainerRef
} from "@angular/core";
import {ToastrService} from "./toastr.service";
import {ToasOptions} from "./toastr.opetion";

@Component({
    moduleId:module.id,
    selector:"toastr",
    template:` 
        <div class="toastr-box {{getData.config.position || 'top-right'}} {{getData.icon}}" 
             @toastrAnimate='animationName'
             [ngStyle]="{'transform':animationDirection,
                         'top':(20 + 50 * getData.service.findToastrIndex(getData)) + 'px'}">
            <span>{{getData.message}}</span>
            <div class="buttons-box" *ngIf="getData.confirm || getData.cancel">
                <button class="confirm"
                        [ngClass]="{'noCancel':!getData.cancel}"
                        *ngIf="getData.confirm"
                        (click)="confirmEvent()">确认</button>
                <button class="cancel"
                        [ngClass]="{'noConfirm':!getData.confirm}"
                        *ngIf="getData.cancel"
                        (click)="cancelEvent()">取消</button>
            </div>
        </div>
    `,
    styleUrls:["./toastr.component.css"],
    animations:[
        trigger("toastrAnimate",[
            state("in",style({
                transform: 'translateX(0)',
                opacity:1
            })),
            state("out-right",style({
                transform: 'translateX(100%)',
                opacity:0
            })),
            state("out-left",style({
                transform: 'translateX(-100%)',
                opacity:0
            })),
            transition("void => in", [
                style({
                    // transform: 'translateX(100%)',
                    opacity:0
                }),
                animate(200)
            ]),
            transition("in => *", [
                //perpare for RC5
                style({
                    // transform: 'translateX(100%)',
                    // opacity:0
                }),
                animate(180)
            ]),

        ])
    ]
})
export class toastrComponent implements AfterViewInit{
    animationDirection:string = "translate(100%)";
    animationName:string = "in";
    toastrs:ToasOptions[] = [];
    getData:ToasOptions;
    constructor(
        @Optional() @Inject(ToasOptions) data:any
    ){
        this.getData = data || {};

        console.log(this.getData)

        this.setDefaultaAnimate();
    }
    
    ngAfterViewInit(){
        //start count then remove dom
        let time = this.getData.time || 
                    this.getData.config.defaultTime || 10000;
        
        if(this.getData.alwaysOpen === true){
            //check has event
            if(!(!!this.getData.cancel || !!this.getData.confirm)){
                console.error("cancle event or confirm event must set when you set alwaysOpen");
                this.countBack(time);
            }
            if(!(!!this.getData.cancel || !!this.getData.confirm) || !!this.getData.time){
                this.countBack(time);
            }
        }else{
            this.countBack(time);
        }
    }

    setDefaultaAnimate(){
        if(!!this.getData.config){
            if(!this.getData.config.position){
                this.getData.config.position = "top-right";
            }
            this.getData.config.position.endsWith("left") && (this.animationDirection="translate(-100%)");
        }
    }

    addToastr(options:ToasOptions){
        this.toastrs.push(options)
    }

    // the confirm event
    confirmEvent(){
        this.getData.confirm();
        this.countBack(0)
    }
    cancelEvent(){
        this.getData.cancel();
        this.countBack(0)
    }

    //begin count
    countBack(time:number){

        setTimeout(()=>{
            this.animationName = 
            this.getData.config.position.indexOf("left") > 0 ? "out-left":"out-right";
        },time)

        setTimeout(()=>{
            this.getData["service"].toastrMessage.splice(
                this.getData["service"].findToastrIndex(this.getData),1
            )

            console.log(this.getData["service"].toastrMessage)

            this.removeToastr();
        },time + 200)
    }

    //remove this dom
    removeToastr(){
        this.getData["toastr"]["destroy"]()
    }
}