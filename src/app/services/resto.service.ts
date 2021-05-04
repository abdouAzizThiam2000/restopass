import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { ApiResponse } from '../models/api-response';
import { Resto } from '../models/resto';
import { Token } from "../models/token";

@Injectable({
  providedIn: 'root',
})
export class RestoService {
  constructor(private http: HttpClient) { }

  api: string = environment.api;
  host: string = environment.host;

  authtHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' + (JSON.parse(localStorage.getItem("token")) as Token).access_token
  };

  getListResto() {

    return this.http.get<Resto[]>(this.api + 'restos', {
      headers: this.authtHeader,
      observe: 'response',
    });
  }

  updateResto(resto: Resto) {
    return this.http.post<ApiResponse>(
      this.api + 'resto/update/' + resto.id,
      {
        name: resto.name,
      },
      {
        headers: this.authtHeader,
        observe: 'response',
      }
    );
  }

  remove(resto: Resto) {
    return this.http.post(this.api + "resto/delete/" + resto.id, {}, {
      headers: this.authtHeader,
      observe: "response"
    });
  }

  createResto(resto: string) {
    return this.http.post<Resto>(this.api + "resto/store", {
      name: resto
    }, {
      headers: this.authtHeader,
      observe: "response"
    });
  }

  jst(resto: Resto) {
    return this.http.post<ApiResponse>(
      this.api + 'sans-ticket/' + resto.id,
      {
        state: !resto.no_pay,
      },
      {
        headers: this.authtHeader,
        observe: 'response',
      }
    );
  }

}
