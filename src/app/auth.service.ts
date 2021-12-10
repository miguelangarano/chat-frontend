import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    router: Router

    user: User = {
        email: "",
        nickname: "",
        token: "",
        imageUrl: ""
    }

    clienteHttp: HttpClient
    constructor(cliente: HttpClient, ruteador: Router) {
        this.clienteHttp = cliente
        this.router = ruteador
    }

    async getUserData() {
        this.checkLoginUser()
        try {
            this.checkLoginUser()
            const data = await this.clienteHttp.get(
                "http://localhost:4123/user/" + this.user.nickname,
                {
                    headers: {
                        email: this.user.email,
                        nickname: this.user.nickname,
                        accesstoken: this.user.token ?? ""
                    }
                },
            ).toPromise()
            const parsedData = JSON.parse(JSON.stringify(data))
            if (parsedData.status === true) {
                this.user.email = parsedData.data.user.email
                this.user.nickname = parsedData.data.user.nickname
                this.user.token = parsedData.data.user.token
                this.user.imageUrl = parsedData.data.user.imageUrl
                return true
            }
            alert("Error no se pudo consultar los datos. " + parsedData.data.error)
            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    checkLoginUser(): boolean {
        const localEmail = localStorage.getItem("email")
        const localNickname = localStorage.getItem("nickname")
        const localToken = localStorage.getItem("token")
        if (localEmail && localNickname && localToken) {
            this.user.email = localEmail
            this.user.nickname = localNickname
            this.user.token = localToken
            return true
        }
        return false
    }

    async logIn(email: string, password: string): Promise<boolean> {
        try {
            const data = await this.clienteHttp.post("http://localhost:4123/user/login", { email, password }).toPromise()
            const parsedData = JSON.parse(JSON.stringify(data))
            if (parsedData.status === true) {
                this.user.email = parsedData.data.email
                this.user.nickname = parsedData.data.nickname
                this.user.token = parsedData.data.token
                localStorage.setItem("email", this.user.email)
                localStorage.setItem("nickname", this.user.nickname)
                localStorage.setItem("token", this.user.token ?? "")
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
                this.user.email = parsedData.data.email
                this.user.nickname = parsedData.data.nickname
                this.user.token = parsedData.data.token
                localStorage.setItem("email", this.user.email)
                localStorage.setItem("nickname", this.user.nickname)
                localStorage.setItem("token", this.user.token ?? "")
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
                        email: this.user.email,
                        nickname: this.user.nickname,
                        accesstoken: this.user.token ?? ""
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
                        email: this.user.email,
                        nickname: this.user.nickname,
                        accesstoken: this.user.token ?? ""
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
        this.user.email = ""
        this.user.nickname = ""
        this.user.token = ""
        this.router.navigateByUrl("/login")
    }
}
