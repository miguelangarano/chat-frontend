import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { Chat, SimpleChat } from './chat.model';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class ChatsService {

    currentChat: Chat | undefined = undefined

    httpClient: HttpClient
    authService: AuthService
    constructor(client: HttpClient, service: AuthService) {
        this.httpClient = client
        this.authService = service
    }

    async queryChatGroups(): Promise<SimpleChat[]> {

        this.authService.checkLoginUser()
        let allChats: SimpleChat[] = []
        let userChats: SimpleChat[] = []


        try {
            const data = await this.httpClient.get("http://localhost:4123/chat/all", {
                headers: {
                    email: this.authService.user.email,
                    nickname: this.authService.user.nickname,
                    accesstoken: this.authService.user.token ?? ""
                }
            }).toPromise()
            const parsedData = JSON.parse(JSON.stringify(data))
            allChats = parsedData.data.chats
        } catch (error) {
            console.log(error)
        }


        try {
            const data1 = await this.httpClient.get("http://localhost:4123/chat/user/" + this.authService.user.nickname, {
                headers: {
                    email: this.authService.user.email,
                    nickname: this.authService.user.nickname,
                    accesstoken: this.authService.user.token ?? ""
                }
            }).toPromise()
            const parsedData1 = JSON.parse(JSON.stringify(data1))
            userChats = parsedData1.data.chat
        } catch (error) {
            console.log(error)
        }

        const currentChats: SimpleChat[] = []

        for (let i = 0; i < allChats.length; i++) {
            const chat = userChats.find(item => item.name === allChats[i].name)
            if (chat) {
                currentChats.push(new SimpleChat(allChats[i].id, allChats[i].name, true))
            } else {
                currentChats.push(new SimpleChat(allChats[i].id, allChats[i].name, false))
            }
        }


        console.log("CHATS", allChats, userChats)
        return currentChats
    }


    async joinChatGroup(groupName: string) {
        try {
            this.authService.getUserData()
            const data = await this.httpClient.patch("http://localhost:4123/chat/add-group-member",
                {
                    groupName,
                    newMember: this.authService.user
                },
                {
                    headers: {
                        email: this.authService.user.email,
                        nickname: this.authService.user.nickname,
                        accesstoken: this.authService.user.token ?? ""
                    }
                }).toPromise()
            const parsedData = JSON.parse(JSON.stringify(data))
            if (parsedData.status) {
                return true
            } else {
                alert("No se pudo agregar miembro.")
                return false
            }
        } catch (error) {
            console.log(error)
            alert("No se pudo agregar miembro.")
            return false
        }
    }

    async getChatData(name: string) {
        try {
            this.authService.getUserData()
            const data = await this.httpClient.get("http://localhost:4123/chat/" + name,
                {
                    headers: {
                        email: this.authService.user.email,
                        nickname: this.authService.user.nickname,
                        accesstoken: this.authService.user.token ?? ""
                    }
                }).toPromise()
            const parsedData = JSON.parse(JSON.stringify(data))
            if (parsedData.status) {
                this.currentChat = parsedData.data.chat
                console.log(parsedData.data.chat)
                return true
            } else {
                alert("No se pudo agregar miembro.")
                return false
            }
        } catch (error) {
            console.log(error)
            alert("No se pudo agregar miembro.")
            return false
        }
    }

    setCurrentChat(name: string) {
        localStorage.setItem("currentChatName", name)
    }

    getCurrentChat() {
        return localStorage.getItem("currentChatName")
    }
}
