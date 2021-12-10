import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-update-page',
    templateUrl: './update-page.component.html',
    styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent implements OnInit {

    router: Router

    uploadSrc: string = ""
    currentFile: any
    downloadURL: any = ""

    newPassword: string = ""
    oldPassword: string = ""

    authService: AuthService

    storage: AngularFireStorage

    constructor(ruteador: Router, servicio: AuthService, storage: AngularFireStorage) {
        this.router = ruteador
        this.authService = servicio
        this.storage = storage
    }

    ngOnInit(): void {
        this.getUserData()
    }

    async getUserData() {
        await this.authService.getUserData()
        this.uploadSrc = this.authService.user.imageUrl ?? ""
    }

    onClickRegresar() {
        this.router.navigateByUrl("/groups")
    }

    onClickLogOut() {
        this.authService.logOut()
    }

    onInputChange(e: any) {
        console.log(e)
        switch (e.id) {
            case "oldpassword": {
                this.oldPassword = e.event
                break
            }
            case "newpassword": {
                this.newPassword = e.event
                break
            }
            case "file": {
                var fr = new FileReader();
                fr.onload = () => this.readFile(fr)
                fr.readAsDataURL(e.event);
                this.currentFile = e.event
                break
            }
            default: {
                break
            }
        }
    }

    uploadFile() {
        const file = this.currentFile
        const filePath = this.currentFile.name;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, file).then(() => {
            const download = fileRef.getDownloadURL();
            console.log(download)
            download.subscribe((url: string) => {
                console.log(url)
                this.downloadURL = url
                this.authService.updateImage(this.downloadURL).then((response) => {
                    if (response) {
                        alert("Imagen subida con éxito")
                    } else {
                        alert("Error al subir imagen")
                    }
                })
            })
        })
    }

    readFile(fr: any) {
        this.uploadSrc = fr.result
    }

    async onClickActualizar() {
        if (this.newPassword !== "" && this.oldPassword !== "") {
            const response = await this.authService.update(this.oldPassword, this.newPassword)
            if (response) {
                alert("Datos actualizados")
            } else {
                alert("Los datos no se pudieron actualizar")
            }
        } else {
            alert("Los campos no pueden estar vacíos.")
        }
    }

    async onClickActualizarImagen() {
        if (this.currentFile != null && this.uploadSrc !== "") {
            this.uploadFile()
            alert("Estamos cargando la imagen")
        } else {
            alert("Debes cargar una imagen.")
        }
    }

}
