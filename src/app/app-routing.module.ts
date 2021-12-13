import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { GroupsPageComponent } from './groups-page/groups-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UpdatePageComponent } from './update-page/update-page.component';

const routes: Routes = [
    {
        path: "register",
        component: RegisterPageComponent
    },
    {
        path: "login",
        component: LoginPageComponent
    },
    {
        path: "update",
        component: UpdatePageComponent
    },
    {
        path: "groups",
        component: GroupsPageComponent
    },
    {
        path: "chat",
        component: ChatPageComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
