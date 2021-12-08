import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ActionButtonComponent } from './action-button/action-button.component';
import { InputComponent } from './input/input.component';
import { PanelComponent } from './panel/panel.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import { GroupsPageComponent } from './groups-page/groups-page.component';
import { GroupItemComponent } from './group-item/group-item.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterPageComponent,
        ActionButtonComponent,
        InputComponent,
        PanelComponent,
        LoginPageComponent,
        UpdatePageComponent,
        GroupsPageComponent,
        GroupItemComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
