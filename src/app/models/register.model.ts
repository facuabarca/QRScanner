export class Register {

	public format: string;
	public text: string;
	public type: string;
	public icon: string;
	public created: Date;

	constructor(format: string, text: string) {
		this.format = format;
		this.text = text;
		this.created = new Date();
		this.getType();
	}

	private getType() {
		const initText = this.text.substr(0, 4);
		switch (initText) {
			case 'http':
				this.type = 'http';
				this.icon = 'globe-outline';
				break;
			case 'geo:':
				this.type = 'geo:';
				this.icon = 'navigate-outline';
				break;
			default:
				this.type = 'Not reconized';
				this.icon = 'help-circle-outline';
				break;
		}
	}
}