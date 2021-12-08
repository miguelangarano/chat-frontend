import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

    constructor() { }

    textInput: string = ""
    internalType: string = "text"
    fileName: string = "Nombre del archivo"
    file: any

    ngOnInit(): void {
        this.internalType = this.type
    }

    @Input() id: string | undefined = ""
    @Input() iconSource: string | undefined = "assets/default.svg"
    @Input() type: string = "text"
    @Input() description: string = ""

    @Output() onInputChange: EventEmitter<any> = new EventEmitter()

    onChange(e: any) {
        this.onInputChange.emit({ event: e, id: this.id })
    }

    uploadFile(e: any) {
        const element = e.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
        if (fileList) {
            console.log(fileList[0])
            this.fileName = fileList[0].name
            console.log(fileList[0], fileList)
            this.onInputChange.emit({ event: fileList[0], id: this.id })
        }
    }

    obscurePassword() {
        if (this.internalType === "text") {
            this.internalType = "password"
        } else {
            this.internalType = "text"
        }
    }

}
