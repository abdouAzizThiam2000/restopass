import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Token } from "../models/token";

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  constructor(private http: HttpClient) { }

  api: string = environment.api;
  host: string = environment.host;

  authtHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' + (JSON.parse(localStorage.getItem("token")) as Token).access_token
  };

  getStatique() {
    return this.http.get<any>(this.api + 'stat', {
      headers: this.authtHeader,
      observe: 'response',
    });
  }

  getRestoStatique(id: number) {
    return this.http.get<any[]>(this.api + 'resto-stat/' + id, {
      headers: this.authtHeader,
      observe: 'response',
    });
  }

}
