import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.jsonedit.com.br';

  constructor(private http: HttpClient) { }

  shareJson(json: string) {
    return this.http.post(`${this.baseUrl}/items`, {
      json: JSON.stringify(json),
    });
  }
}
