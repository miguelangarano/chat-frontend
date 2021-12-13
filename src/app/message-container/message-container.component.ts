import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-message-container',
    templateUrl: './message-container.component.html',
    styleUrls: ['./message-container.component.css']
})
export class MessageContainerComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    @Input() nickname: string | undefined = ""
    @Input() body: string | undefined = ""
    @Input() date: string | undefined = ""

}
