import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-update-page',
    templateUrl: './update-page.component.html',
    styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent implements OnInit {

    router: Router

    uploadSrc: string = ""

    newPassword: string = ""
    oldPassword: string = ""

    authService: AuthService

    constructor(ruteador: Router, servicio: AuthService) {
        this.router = ruteador
        this.authService = servicio
    }

    ngOnInit(): void {
    }

    onClickRegresar() {
        this.router.navigateByUrl("/groups")
    }

    onClickLogOut() {
        this.authService.logOut()
    }

    onInputChange(e: any) {
        switch (e.id) {
            case "oldpassword": {
                this.oldPassword = e.event
                break
            }
            case "newpassword": {
                this.newPassword = e.event
                break
            }
            case "file": {
                var fr = new FileReader();
                fr.onload = () => this.readFile(fr)
                fr.readAsDataURL(e.event);
                break
            }
            default: {
                break
            }
        }
    }

    readFile(fr: any) {
        this.uploadSrc = fr.result
    }

    async onClickActualizar() {
        if (this.newPassword !== "" && this.oldPassword !== "") {
            const response = await this.authService.update(this.oldPassword, this.newPassword)
            if (response) {
                alert("Datos actualizados")
            } else {
                alert("Los datos no se pudieron actualizar")
            }
        } else {
            alert("Los campos no pueden estar vacíos.")
        }
    }

}
