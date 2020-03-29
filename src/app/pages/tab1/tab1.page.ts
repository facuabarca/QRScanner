import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


	sliderOption = {
		allowSlidePrev: false,
		allowSlideNext: false
	}

	constructor(private barcodeScanner: BarcodeScanner) { }

	ionViewDidEnter() {
		console.log('ionViewDidEnter');
	}

	ionViewDidLeave() {
		console.log('Me voy');
	}

	ionViewWillEnter() {
		console.log('will enter')
	}

	scan() {
		this.barcodeScanner.scan().then(barcodeData => {
			console.log('Barcode data', barcodeData);
			alert('ScanCode: ' + JSON.stringify(barcodeData));
		   }).catch(err => {
			   console.log('Error', err);
		   });
	}

}
