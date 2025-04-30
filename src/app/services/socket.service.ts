import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private readonly socket: Socket;

  constructor() {
    this.socket = io('wss://hook.tiltbr.com.br:8003/', {
      transports: ['websocket'],
      upgrade: false,
      autoConnect: false
    });
  }

  connect(){
    this.socket.connect()
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  on(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}
