import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

    constructor() { }

    textInput: string = ""

    ngOnInit(): void {
    }

    @Input() id: string | undefined = ""
    @Input() iconSource: string | undefined = "assets/default.svg"
    @Input() type: string = "text"
    @Input() description: string = ""

    @Output() onInputChange: EventEmitter<any> = new EventEmitter()

    onChange(e: any) {
        this.onInputChange.emit({ event: e, id: this.id })
    }

}
