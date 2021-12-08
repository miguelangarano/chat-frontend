import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-update-page',
    templateUrl: './update-page.component.html',
    styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent implements OnInit {

    router: Router

    constructor(ruteador: Router) {
        this.router = ruteador
    }

    ngOnInit(): void {
    }

    onClickRegresar() {
        this.router.navigateByUrl("/")
    }

    onClickLogOut() { }

    onInputChange(e: any) {

    }

    onClickActualizar() { }

}
