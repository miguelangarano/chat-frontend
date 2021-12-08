import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SimpleChat } from '../chat.model';
import { ChatsService } from '../chats.service';

@Component({
    selector: 'app-groups-page',
    templateUrl: './groups-page.component.html',
    styleUrls: ['./groups-page.component.css']
})
export class GroupsPageComponent implements OnInit {

    authService: AuthService
    router: Router
    chatsService: ChatsService
    chats: SimpleChat[] = []

    constructor(service: AuthService, router: Router, cService: ChatsService) {
        this.authService = service
        this.router = router
        this.chatsService = cService
    }

    ngOnInit(): void {
        this.querySimpleChats()
    }

    async querySimpleChats() {
        this.chats = await this.chatsService.queryChatGroups()
    }

    onClickUpdate() {
        this.router.navigateByUrl("/update")
    }

    onClickLogOut() {
        this.authService.logOut()
    }

    onClickJoinButton() {

    }

}
