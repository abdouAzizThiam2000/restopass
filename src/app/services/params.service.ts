import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Params } from "../models/params";
import { Token } from "../models/token";


@Injectable({
  providedIn: 'root'
})
export class ParamsService {


  constructor(private http: HttpClient) { }

  api: string = environment.api;
  host: string = environment.host;

  authtHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' + (JSON.parse(localStorage.getItem("token")) as Token).access_token
  };

  list() {
    return this.http.get<Params[]>(this.api + 'params', {
      headers: this.authtHeader,
      observe: 'response',
    });
  }


  changeParams(params: Params) {
    return this.http.post(this.api + 'set-param/' + params.id, {
      'value': params.value
    }, {
      headers: this.authtHeader,
      observe: 'response',
    });
  }


}
