import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, Type, ViewContainerRef } from "@angular/core";

@Component({
    host: {
        "[class.fixed]": "positionFixed",
        "[style.left.px]": "left",
        "[style.top.px]": "top"
    },
    selector: "overlay",
    template: "",
    styles: [
        `
        :host {
          position: absolute;
          z-index: 100;
        }

        :host.fixed {
          position: fixed;
        }
        `
    ]
})
export declare class OverlayComponent implements OnInit {
    private componentFactoryResolver;
    elementRef: ElementRef;
    container: ViewContainerRef;
    private completeComponentCreation;
    positionFixed: boolean;
    left: number;
    top: number;
    constructor(componentFactoryResolver: ComponentFactoryResolver, elementRef: ElementRef, container: ViewContainerRef);
    addComponent<T>(componentType: Type<any>): Promise<ComponentRef<T>>;
    ngOnInit(): void;
}
