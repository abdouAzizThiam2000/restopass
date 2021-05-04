import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Horaire } from '../models/horaire';
import { Token } from '../models/token';


@Injectable({
  providedIn: 'root',
})
export class HoraireService {
  constructor(private http: HttpClient) { }

  api: string = environment.api;
  host: string = environment.host;

  authtHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' + (JSON.parse(localStorage.getItem("token")) as Token).access_token
  };

  listHoraire() {
    return this.http.get<Horaire[]>(this.api + 'horaires', {
      headers: this.authtHeader,
      observe: 'response',
    });
  }


  changeHoraire(horaire: Horaire) {
    return this.http.post(this.api + 'h-change', {
      'number': horaire.number,
      'close': horaire.close,
      'open': horaire.open,
    }, {
      headers: this.authtHeader,
      observe: 'response',
    });
  }
}
