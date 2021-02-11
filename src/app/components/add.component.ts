import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'add-icon',
    template: `
<svg version="1.1" height="30px" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 477.867 477.867" style="enable-background:new 0 0 477.867 477.867;stroke:white" xml:space="preserve">
<g>
	<g>
		<path style="fill:white" d="M392.533,0h-307.2C38.228,0.056,0.056,38.228,0,85.333v307.2c0.056,47.105,38.228,85.277,85.333,85.333h307.2
			c47.105-0.056,85.277-38.228,85.333-85.333v-307.2C477.81,38.228,439.638,0.056,392.533,0z M443.733,392.533
			c0,28.277-22.923,51.2-51.2,51.2h-307.2c-28.277,0-51.2-22.923-51.2-51.2v-307.2c0-28.277,22.923-51.2,51.2-51.2h307.2
			c28.277,0,51.2,22.923,51.2,51.2V392.533z"/>
	</g>
</g>
<g>
	<g>
		<path style="fill:white" d="M324.267,221.867H256V153.6c0-9.426-7.641-17.067-17.067-17.067s-17.067,7.641-17.067,17.067v68.267H153.6
			c-9.426,0-17.067,7.641-17.067,17.067S144.174,256,153.6,256h68.267v68.267c0,9.426,7.641,17.067,17.067,17.067
			S256,333.692,256,324.267V256h68.267c9.426,0,17.067-7.641,17.067-17.067S333.692,221.867,324.267,221.867z"/>
	</g>
</g>

</svg>
`,
	styles: [`
	:host{
		cursor:pointer;
		outline:none;
	}
	`]
})
export class AddIconComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
