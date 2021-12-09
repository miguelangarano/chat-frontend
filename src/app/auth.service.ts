import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    router: Router

    email: string = ""
    nickname: string = ""
    token: string = ""

    clienteHttp: HttpClient
    constructor(cliente: HttpClient, ruteador: Router) {
        this.clienteHttp = cliente
        this.router = ruteador
    }

    checkLoginUser(): boolean {
        const localEmail = localStorage.getItem("email")
        const localNickname = localStorage.getItem("nickname")
        const localToken = localStorage.getItem("token")
        if (localEmail && localNickname && localToken) {
            this.email = localEmail
            this.nickname = localNickname
            this.token = localToken
            return true
        }
        return false
    }

    async logIn(email: string, password: string): Promise<boolean> {
        try {
            const data = await this.clienteHttp.post("http://localhost:4123/user/login", { email, password }).toPromise()
            const parsedData = JSON.parse(JSON.stringify(data))
            if (parsedData.status === true) {
                this.email = parsedData.data.email
                this.nickname = parsedData.data.nickname
                this.token = parsedData.data.token
                localStorage.setItem("email", this.email)
                localStorage.setItem("nickname", this.nickname)
                localStorage.setItem("token", this.token)
                return true
            }
            alert("Error no se pudo realizar el inicio de sesión. " + parsedData.data.error)
            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async register(nickname: string, email: string, password: string): Promise<boolean> {
        try {
            const data = await this.clienteHttp.post("http://localhost:4123/user/register", { email, nickname, password }).toPromise()
            const parsedData = JSON.parse(JSON.stringify(data))
            if (parsedData.status === true) {
                this.email = parsedData.data.email
                this.nickname = parsedData.data.nickname
                this.token = parsedData.data.token
                localStorage.setItem("email", this.email)
                localStorage.setItem("nickname", this.nickname)
                localStorage.setItem("token", this.token)
                return true
            }
            alert("Error no se pudo realizar el registro. " + parsedData.data.error)
            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async update(password: string, newPassword: string): Promise<boolean> {
        try {
            this.checkLoginUser()
            const data = await this.clienteHttp.patch(
                "http://localhost:4123/user/update",
                { password, newPassword },
                {
                    headers: {
                        email: this.email,
                        nickname: this.nickname,
                        accesstoken: this.token
                    }
                },
            ).toPromise()
            const parsedData = JSON.parse(JSON.stringify(data))
            if (parsedData.status === true) {
                return true
            }
            alert("Error no se pudo realizar la actualizción de datos. " + parsedData.data.error)
            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async updateImage(imageUrl: string): Promise<boolean> {
        try {
            this.checkLoginUser()
            const data = await this.clienteHttp.patch(
                "http://localhost:4123/user/update",
                { imageUrl },
                {
                    headers: {
                        email: this.email,
                        nickname: this.nickname,
                        accesstoken: this.token
                    }
                },
            ).toPromise()
            const parsedData = JSON.parse(JSON.stringify(data))
            if (parsedData.status === true) {
                return true
            }
            alert("Error no se pudo realizar la actualizción de datos. " + parsedData.data.error)
            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    logOut(): void {
        localStorage.clear()
        this.email = ""
        this.nickname = ""
        this.token = ""
        this.router.navigateByUrl("/login")
    }
}
