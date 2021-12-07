import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    email: string = ""
    nickname: string = ""
    token: string = ""

    clienteHttp: HttpClient
    constructor(cliente: HttpClient) {
        this.clienteHttp = cliente
    }

    checkLoginUser(): boolean {
        return false
    }

    logIn(): boolean {
        return false
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

    update(): boolean {
        return false
    }

    logOut(): boolean {
        return false
    }
}
