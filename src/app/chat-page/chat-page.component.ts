import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { Chat, ChatMessage } from '../chat.model';
import { ChatsService } from '../chats.service';
import { WebsocketService } from '../websocket.service';

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

    chatName: string = ""
    currentChat: Chat | undefined = undefined

    messages: ChatMessage[] = []

    messageText: string = ""



    socketMessages: any[] = []
    title = 'socket-front-client';
    user: any;
    user_id: any;
    msg: any;
    input_message: any;
    show_message: any;

    router: Router
    authService: AuthService
    chatService: ChatsService

    constructor(
        ruteador: Router,
        servicio: AuthService,
        serviciouno: ChatsService,
        protected socketService: WebsocketService,
        private cookieService: CookieService
    ) {
        this.router = ruteador
        this.authService = servicio
        this.chatService = serviciouno
        socketService.outEven.subscribe(res => {
            this.socketMessages.push(res.msg)
        })
    }

    ngOnInit(): void {
        this.authService.getUserData()
        this.getChat()
        try {
            this.show_message = JSON.parse(this.cookieService.get('user'));
        } catch (e) {
            this.show_message = null
        }
    }

    async getChat() {
        const currentChatName = this.chatService.getCurrentChat()
        await this.chatService.getChatData(currentChatName ?? "")
        this.currentChat = this.chatService.currentChat
        this.messages = this.chatService.currentChat?.message ?? []
    }

    onClickRegresar() {
        this.router.navigateByUrl("/groups")
    }

    onClickLogOut() {
        this.authService.logOut()
    }

    parseUnixTimestamp(date: number): string {
        let stringDate = ""
        const firstString = new Date(date).toISOString().split("T")
        const secondString = firstString[1].split(":")
        stringDate = firstString[0] + " " + secondString[0] + ":" + secondString[1]
        return stringDate
    }

    mockedUser = () => {
        this.cookieService.set('user', JSON.stringify({
            user: this.user,
            id: this.user_id
        }))

        window.location.reload();
    }

    sendData = () => {
        console.log("DATAAAAA")
        this.socketService.emitEvent("default",
            {
                message: this.messageText
            })
        this.input_message = null;
    }

}
