import { Directive,ElementRef,Renderer,HostListener,HostBinding} from '@angular/core';
@Directive({
    selector:'[cutom-dir]'
})

export class CustomChangeDriective {
    @HostBinding('style.border') border: string;
    constructor(private el: ElementRef, private renderer: Renderer) {
       // this.ChangeBgColor('red');
    }
    ChangeBgColor(color: string) {
        this.renderer.setElementStyle(this.el.nativeElement, 'color', color);
    }

    @HostListener('mouseover') 
    onMouseOver() {
        this.border = '5px solid green';
        this.ChangeBgColor('red');
    }
    @HostListener('click') 
    onClick() {
        window.alert('Host Element Clicked');
    }
    @HostListener('mouseleave') 
    onMouseLeave() {
        this.ChangeBgColor('black');
    }

}