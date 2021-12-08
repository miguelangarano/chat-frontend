import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-group-item',
    templateUrl: './group-item.component.html',
    styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {

    @Input() name: string | undefined = ""
    @Input() buttonText: string | undefined = ""
    @Output() action: EventEmitter<any> = new EventEmitter()

    constructor() { }

    ngOnInit(): void {
    }

    buttonAction() {
        this.action.emit()
    }

}
