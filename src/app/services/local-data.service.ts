import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { Register } from '../models/register.model';
import { NavController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
	providedIn: 'root'
})
export class LocalDataService {

	savedRecords: Register[] = [];

	constructor(
		private storage: Storage,
		private navCtrl: NavController,
		private iab: InAppBrowser,
		private file: File,
		private emailComposer: EmailComposer) {
		this.getSavedRecords();
	}

	async getSavedRecords() {
		this.savedRecords = await (this.storage.get('savedRecords') || []);
		if (this.savedRecords === null) this.savedRecords = [];
		console.log('constructor', this.savedRecords)
	}

	async saveRecord(format: string, text: string) {
		await this.getSavedRecords();
		const newRecord = new Register(format, text);
		this.savedRecords.unshift(newRecord);
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
			case 'geo:':
				this.navCtrl.navigateForward(`/tabs/tab2/map/${register.text}`);
				break;
		}
	}
	sendEmail() {
		const arrTemp = [];
		const title = 'Type, Format, Create in, Text\n';
		arrTemp.push(title);

		this.savedRecords.forEach((register) => {
			const line = `${register.type}, ${register.format}, ${register.created}, ${register.text.replace(',', ' ')}\n`;
			arrTemp.push(line);
		});
		this.createFile(arrTemp.join(''));
	}

	createFile(text: string) {
		this.file.checkFile(this.file.dataDirectory, 'register.csv').then((exists) => {
			return this.writeFile(text);
		}).catch((err: any) => {
			return this.file.createFile(this.file.dataDirectory, 'register.csv', false)
				.then((created: any) => {
					this.writeFile(text);
				}).catch((err: any) => {
					alert('Could not create file');
				})
		})
	}

	async writeFile(text: string) {
		await this.file.writeExistingFile(this.file.dataDirectory, 'register.csv', text);
		const file = `${this.file.dataDirectory}/register.csv`
		this.emailComposer.isAvailable().then((available: boolean) => {
			if (available) {
				let email = {
					to: 'facuabarca@gmail.com',
					attachments: [
						file
					],
					subject: 'Scans history',
					body: 'Here you have your scan backup <strong>Facundo Abarca</strong>',
					isHtml: true
				}

				// Send a text message using default options
				this.emailComposer.open(email);
			}
		});
	}
}
