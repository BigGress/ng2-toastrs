# ng2-toastrs

ng2-toastr 是基于angular2 RC.4所写的插件。

它设计风格是基于Material Design。

e.g:

![no-button](https://raw.githubusercontent.com/SmallGress/ng2-toastrs/master/no-button.jpg)

Docs & GitHub
[GitHub](https://github.com/SmallGress/ng2-toastrs)

## 环境
现在只能使用在[ng2-webpack](https://github.com/AngularClass/angular2-webpack-starter "Title")的环境中。(我只测试了这个环境...)

## Usage

1.安装:
``` javascript
    npm i ng2-toastrs
```

2.添加到依赖文件:
``` javascript
    import "ng2-toastrs";
``` 

3.往组件中注入 "ToastrService" 这个服务:
```javascript
    import { ToastrService } from "ng2-toastrs";

    @Component({
        selector:"a-compoent",
        template:"<button (click)='addSuccess()'>add a toastr</button>",
        providers:[ToastrService]
    })
    export class AComponent{
        constructor(public toastr: ToastrService) {
        }
        
        addSuccess(){
            this.toastr.success("success");
        }

        addWarning(){
            this.toastr.warning("warning");
        }

        addError(){
            this.toastr.error("error");
        }

        addInfo(){
            this.toastr.info("info");
        }
    }
```

### Toastr Config And Options


#### 1.Config
你可以在环境文件中为toastr 先做最初配置。
e.g:
``` javascript
    import { ToastrConfig } from "ng2-toastrs";

    bootstrap(App, [
     provide(ToastrConfig,{useValue:{
        position:"top-right",
        defaultTime:1000
     }})
  ])
```

##### position:(string) = {"top-left"|"top-right"|"bottom-left"|"bottom-right"};
用来设置toastr的位置,一共只有上述的4种。

##### defaultTime:(number)
设置toastr弹出的默认时间


#### 2.Options

你也可以为每个toastr设置独立的配置。(我用上面的代码做示范)
e.g:
``` javascript
    addSuccess(){
        this.toastr.success("success",{
            time:20000,
            alwaysOpen:true,
            confirm:function(){},
            cancel:function(){}
        });
    }
```

##### time?:(number)
为这个toastr设置弹出时间(Default:1000ms)

##### alwaysOpen?:(boolean)
选着这个toastr是否一直打开...直到用户操作或者倒计时完成
(设置了alwaysOpen,必须设置confirm或者cancel其中一个或者两个都设置)

##### confirm:(Function)
确认事件

##### cancel:(Function)
取消事件

## TODOs

1.自定义按钮名字


