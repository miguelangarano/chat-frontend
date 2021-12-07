import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-action-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    @Input() text: string | undefined = ""
    @Output() action: EventEmitter<any> = new EventEmitter()

    buttonClick() {
        this.action.emit()
    }

}
