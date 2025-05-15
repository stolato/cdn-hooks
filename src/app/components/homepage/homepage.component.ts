import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SocketService} from '../../services/socket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {share} from 'rxjs';
import {ApiService} from '../../services/api.service';

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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    ) {
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

  alertCopy() {
    this.snackBar.open('Copied to clipboard', 'Close', {
      duration: 2000,
    });
  }

  share(data: any){
    if(data !== null){
      this.apiService.shareJson(data).subscribe((res: any)=> {
        window.open("https://jsonedit.com.br/" + res.InsertedID, '_blank');
      });
    }

    this.snackBar.open('Json shared', 'Close', {
      duration: 2000,
    })
  };
}
