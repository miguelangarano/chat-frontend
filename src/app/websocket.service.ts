import { Injectable, Output, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService extends Socket {


    constructor(private cookieService: CookieService) {

        /**
         * En nuestro "super" declaramos la configuración inicial de conexión la cual hemos declarado en nuestro
         * "environment.serverSocket",
         * tambien vemos como pasamos el "payload" dentro de options y "query"
         */

        super({
            url: environment.serverSocket,
            options: {
                query: {
                    payload: cookieService.get('user')
                }
            }

        });

        /**
         * ---------------- ESCUCHAMOS----------------
         * En este punto nuestro socket.io-client esta listo para recibir los eventos.
         * 
         * En esta funcion vemos como esta preparado para recibir un evento llamado "message" el cual
         * una vez sea recibido va a emitir por nuestro "outEven"
         */

        this.ioSocket.on('message', (res: any) => {
            console.log("#@@@@@", res)
            this.outEven.emit(res)
        })
    }

    @Output() outEven: EventEmitter<any> = new EventEmitter();

    emitEvent = (event = 'default', payload = {}) => {
        this.ioSocket.emit('default', {
            cookiePayload: this.cookieService.get('user'),
            event,
            payload
        });
    }
}
