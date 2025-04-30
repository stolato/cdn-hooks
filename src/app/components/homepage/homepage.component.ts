import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SocketService} from '../../services/socket.service';

export interface Item {
  data: any;
  time: Date;
  method: string;
  header: any;
}

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  id: string | null | undefined;

  constructor(
    private socketService: SocketService,
    private router: Router,
    private route: ActivatedRoute,) {
  }

  items: Item[] = [];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('ID');
    if (!this.id) {
      this.id = crypto.randomUUID();
      this.router.navigate([this.id]).then();
    }
    this.connect();
  }

  connect() {
    this.socketService.connect();
    this.socketService.emit("join", this.id)
    this.socketService.on("new-hook").subscribe((data: any) => {
      this.items.unshift({data: data.data, time: data.time, method: data.method, header: data.header});
      console.log()
    })
  }
}
