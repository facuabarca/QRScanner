import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LocalDataService } from '../../services/local-data.service';

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

	constructor(private barcodeScanner: BarcodeScanner, private localDataService: LocalDataService) { }

	scan() {
		this.barcodeScanner.scan().then(barcodeData => {
			
			if(!barcodeData.cancelled) {
				this.localDataService.saveRecord(barcodeData.format, 'algo');
			}
			
		   }).catch(err => {
			   console.log('Error', err);
			   this.localDataService.saveRecord('Qr desde ordenador', 'https://lavanguardia.com');
		   });
	}

}
