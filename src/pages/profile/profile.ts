import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DetailProfilePage } from './../../pages/detail-profile/detail-profile';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    constructor(
        public navCtrl: NavController) {
    }

    handleMoreSelect(item: any) {
        this.navCtrl.push(DetailProfilePage, { item });
    }
}
