import { DetailProfilePage } from './../../pages/detail-profile/detail-profile';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { IdentitySecuredStorageService } from '../../services/securedStorage.service';

export interface mockCredential {
    id: number,
    titleP: string,
    emitter: string,
    place: string,
    valueT: string,
    value: string,
    addDateT: string,
    addDate: string,
    endDateT: string,
    endDate: string,
    level: string,
    iconsStars: Array<any>
}

@Component({
    selector: 'identity-data-list',
    templateUrl: 'identity-data-list.html'
})

export class IdentityDataListComponent {
    @Input() public isSelectable = false;

    @Output() public handleIdentitySelect = new EventEmitter();
    @Output() public handleMoreSelect = new EventEmitter();

    public identityData = new Array<mockCredential>();
    public isDataSetted =  false;

    private readonly CREDENTIAL_PREFIX = "cred_";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private securedStrg: IdentitySecuredStorageService
    ) {
        let credentials = this.navParams.get("credentials");
        let isPresentationRequest = this.navParams.get("isPresentationRequest");

        let iat = new Date(this.navParams.get("iat") * 1000);
        let exp = new Date(this.navParams.get("exp") * 1000);
        let iatString = iat.getDay() + "/" + (iat.getMonth() + 1) + "/" + iat.getFullYear();
        let expString = exp.getDay() + "/" + (exp.getMonth() + 1) + "/" + exp.getFullYear();
        let count = 0;

        let credentialPromises = credentials.map((credential) => {
            let propNames = Object.getOwnPropertyNames(credential);

            let level = credential.levelOfAssurance;

            let stars = [{
                "iconActive": "icon-star",
                "iconInactive": "icon-star-outline",
                "isActive": true
            }, {
                "iconActive": "icon-star",
                "iconInactive": "icon-star-outline",
                "isActive": true
            }, {
                "iconActive": "icon-star",
                "iconInactive": "icon-star-outline",
                "isActive": true
            }];

            for (let z = 0; z < stars.length; z++) {
                stars[z].isActive = ((z + 1 <= level) ? true : false);
            }

            let obj: mockCredential;

            if (isPresentationRequest) {
                let securedCredentials;
                let key = credential["field_name"];
                 return this.securedStrg.get(this.CREDENTIAL_PREFIX + key)
                    .then((result) => {
                        console.log(result);
                        securedCredentials = JSON.parse(result);
                        obj = {
                            id: count++,
                            titleP: credential[propNames[2].toString()],
                            emitter: "Emisor del testimonio",
                            valueT: "Valor",
                            value: securedCredentials[key],
                            place: "Emisor de credencial",
                            addDateT: "Fecha incorporación del testimonio",
                            addDate: iatString,
                            endDateT: "Fecha fin de vigencia",
                            endDate: expString,
                            level: "Nivel " + level,
                            iconsStars: stars
                        };
                        this.identityData.push(obj);
                        return Promise.resolve();
                    });
            } else {
                obj = {
                    id: count++,
                    titleP: propNames[2].toUpperCase(),
                    emitter: "Emisor del testimonio",
                    valueT: "Valor",
                    value: credential[propNames[2].toString()],
                    place: "Emisor de credencial",
                    addDateT: "Fecha incorporación del testimonio",
                    addDate: iatString,
                    endDateT: "Fecha fin de vigencia",
                    endDate: expString,
                    level: "Nivel " + level,
                    iconsStars: stars
                };
                this.identityData.push(obj);
                return Promise.resolve();
            }
        });

        Promise.all(credentialPromises)
        .then(() => {
            this.isDataSetted = true;
        })

        /* for (let i = 0; i < credentials.length; i++) {
            let propNames = Object.getOwnPropertyNames(credentials[i]);

            let level = credentials[i].levelOfAssurance;

            let stars = [{
                "iconActive": "icon-star",
                "iconInactive": "icon-star-outline",
                "isActive": true
            }, {
                "iconActive": "icon-star",
                "iconInactive": "icon-star-outline",
                "isActive": true
            }, {
                "iconActive": "icon-star",
                "iconInactive": "icon-star-outline",
                "isActive": true
            }];

            for (let z = 0; z < stars.length; z++) {
                stars[z].isActive = ((z + 1 <= level) ? true : false);
            }

            let obj: mockCredential;

            if (isPresentationRequest) {
                let securedCredentials;
                let key = credentials[i]["field_name"];
                this.securedStrg.get(key)
                    .then((result) => {
                        console.log(result);
                        securedCredentials = JSON.parse(result);
                        obj = {
                            id: i + 1,
                            titleP: credentials[i][propNames[2].toString()],
                            emitter: "Emisor del testimonio",
                            valueT: "Valor",
                            value: securedCredentials[key],
                            place: "Emisor de credencial",
                            addDateT: "Fecha incorporación del testimonio",
                            addDate: iatString,
                            endDateT: "Fecha fin de vigencia",
                            endDate: expString,
                            level: "Nivel " + level,
                            iconsStars: stars
                        };
                        this.identityData.push(obj);
                        this.isDataSetted = true;
                    });
            } else {
                obj = {
                    id: i + 1,
                    titleP: propNames[2].toUpperCase(),
                    emitter: "Emisor del testimonio",
                    valueT: "Valor",
                    value: credentials[i][propNames[2].toString()],
                    place: "Emisor de credencial",
                    addDateT: "Fecha incorporación del testimonio",
                    addDate: iatString,
                    endDateT: "Fecha fin de vigencia",
                    endDate: expString,
                    level: "Nivel " + level,
                    iconsStars: stars
                };
                this.identityData.push(obj);
                this.isDataSetted = true;
            }
        } */
    }

    public detail(item: any): void {
        this.handleMoreSelect.emit(item);
    }

    public changeIdentitySelect(event: any, id: number): void {
        const result: any = {
            id,
            value: event.checked
        }

        this.handleIdentitySelect.emit(result);
    }

}
