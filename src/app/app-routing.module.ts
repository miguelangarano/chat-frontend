import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
