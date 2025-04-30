import {Component, OnInit} from '@angular/core';
import {SocketService} from './services/socket.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'cdn-hook-tilt';
}
