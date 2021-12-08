import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    email: string = ""
    password: string = ""


    authService: AuthService
    router: Router

    constructor(servicio: AuthService, ruteador: Router) {
        this.authService = servicio
        this.router = ruteador
    }

    ngOnInit(): void {
    }

    onInputChange(e: any) {
        switch (e.id) {
            case "email": {
                this.email = e.event
                break
            }
            case "password": {
                this.password = e.event
                break
            }
            default: {
                break
            }
        }
    }

    async onClickLogin() {
        if (this.email !== "" && this.password !== "") {
            const response = await this.authService.logIn(this.email, this.password)
            if (response) {
                this.router.navigateByUrl("/")
            } else {
                alert("Hubo un error al iniciar sesión")
            }
        } else {
            alert("Los campos no deben estar vacíos.")
        }
    }

}
