import { Component, Output, EventEmitter } from '@angular/core';
import { ViewController, NavParams, ModalController, NavController } from 'ionic-angular';
import { ToastService } from '../../../services/toast-service';
import { IdentitySecuredStorageService } from '../../../services/securedStorage.service';
import { LoadingService } from '../../../services/loading-service';


@Component({
    selector: 'select-identity',
    templateUrl: 'select-identity.html'
})
export class SelectIdentity {

    @Output() handleSelectNewCredential = new EventEmitter();

    private readonly CREDENTIAL_PREFIX = "cred_";
    private readonly PRESENTATION_PREFIX = "present_";

    private identitySelected: Array<number> = [];
    private credentials: Array<any>;

    public searchTerm: string;

    constructor(
        public navParams: NavParams,
        public navCtrl: NavController
    ) {
        this.credentials = this.navParams.get("credentials");
        console.log('Credentials ', this.credentials)
        if (!this.credentials || this.credentials.length === 0) {
            this.credentials = [{"@context":"JWT","levelOfAssurance":2,"Carnet de Estudiante":"Pedro Pérez López","issuer":"SERVICE PROVIDER"}]
        }
    }

    onStarClass(items: any, index: number, e: any) {
        for (var i = 0; i < items.length; i++) {
            items[i].isActive = i <= index;
        }
    }

    onSearch(event?: any) {
        console.log('Event ', event);
        console.log('searchTerm', this.searchTerm);
    }
    
    accept() {
        this.handleSelectNewCredential.emit(this.identitySelected);
        this.navCtrl.pop();
    }

    cancel() {
        this.navCtrl.pop();
    }
}
