import { Component } from '@angular/core';
import { LocalDataService } from '../../services/local-data.service';
import { Register } from 'src/app/models/register.model';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

	constructor(public localDateService: LocalDataService) { }


	sendEmail() {

	}

	openRegister(register: Register) {
		this.localDateService.openRegister(register);
	}
}
