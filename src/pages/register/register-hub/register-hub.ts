import { Component, Input, ViewChild } from '@angular/core';
import { Slides, NavController } from 'ionic-angular';
import { RegisterForm } from '../register-form/register-form';

@Component({
    selector: 'register-hub',
    templateUrl: 'register-hub.html'
})
export class RegisterHub {
    data: any = {};
    @Input() events: any;
    @ViewChild('wizardSlider') slider: Slides;
    
    sliderOptions = { pager: true };
    path:boolean = false;
    prev:boolean = true;
    next:boolean = true;
    finish:boolean = true

    constructor(public navCtrl: NavController) { 
        this.prev = false;
        this.next = true;
        this.finish = false;
        this.getList();
    }

    changeSlide(index: number): void {
        if (index > 0) {
            this.slider.slideNext(300);
        } else {
            this.slider.slidePrev(300);
        }
    }

    slideHasChanged(index: number): void {
        try {
            if(this.slider.isEnd()){
                this.navCtrl.setRoot(RegisterForm);
            }
            this.prev = !this.slider.isBeginning();
            this.next = this.slider.getActiveIndex() < (this.slider.length() - 1);
            this.finish = this.slider.isEnd();
        } catch (e) { }
    }

    ngOnChanges(changes: { [propKey: string]: any }) {
        this.data = changes['data'].currentValue;
      }

    onEvent(event: string) {
        if (this.events[event]) {
            this.events[event]();
        }
        console.log(event);
    }

    getList(): any {
        this.data = {
            items: [
                {
                    title: "Test 1",
                    description: "Desc test_1",
                    subtitle: "test1",
                    logo: "assets/images/avatar/18.jpg"
                },
                {
                    title: "Test 2",
                    description: "Desc test_2",
                    subtitle: "test2",
                    logo: "assets/images/avatar/20.jpg"
                },
                {
                    title: "Register"
                }
            ],
            btnPrev: "Anterior",
            btnNext: "Siguiente",
            btnFinish: "Registrar"
        }
    }
}
