import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Register } from '../models/register.model';
import { NavController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class LocalDataService {

	savedRecords: Register[] = [];

	constructor(
		private storage: Storage,
		private navCtrl: NavController,
		private iab: InAppBrowser) {
		this.getSavedRecords();
	}

	async getSavedRecords() {
		this.savedRecords = await (this.storage.get('savedRecords') || []);
		if(this.savedRecords === null) this.savedRecords = [];
		console.log('constructor',this.savedRecords)
	}

	async saveRecord(format: string, text: string) {
		await this.getSavedRecords();
		const newRecord = new Register(format, text);
		this.savedRecords.unshift(newRecord);
		alert('Qr saved:: ' + JSON.stringify(this.savedRecords));
		this.storage.set('savedRecords', this.savedRecords);
		this.openRegister(newRecord);
	}

	openRegister(register: Register) {
		this.navCtrl.navigateForward('/tabs/tab2');
		switch (register.type) {
			case 'http':
				//open browser
				const browser = this.iab.create(register.text, '_system');
				break;

		}

	}
}
