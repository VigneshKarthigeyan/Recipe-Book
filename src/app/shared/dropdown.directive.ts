import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})

export class DropdownDirective{
    @HostBinding('class.open')ref=false;

    @HostListener('mouseenter') clickButton(eventData:Event){
        this.ref=!this.ref;
    }

    @HostListener('mouseleave') leaveButton(eventData:Event){
        this.ref=!this.ref;
    }

    // @HostBinding('class.open')ref=false;

    // @HostListener('click') clickButton(eventData:Event){
    //     this.ref=!this.ref;
    // }
     
}