import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { ApiResponse } from '../models/api-response';
import { Vigil } from '../models/vigil';
import { Token } from "../models/token";



@Injectable({
  providedIn: 'root'
})
export class VigilService {

  constructor(private http: HttpClient) { }

  api: string = environment.api;
  host: string = environment.host;

  authtHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' + (JSON.parse(localStorage.getItem("token")) as Token).access_token

  };

  getListVigil() {
    return this.http.get<Vigil[]>(this.api + 'vigilants', {
      headers: this.authtHeader,
      observe: 'response',
    });
  }

  updateVigil(vigil: Vigil) {
    return this.http.post<ApiResponse>(
      this.api + 'vigilant/update/' + vigil.id,
      {
        first_name: vigil.first_name,
        last_name: vigil.last_name,
        resto_id: vigil.resto_id,
      },
      {
        headers: this.authtHeader,
        observe: 'response',
      }
    );
  }

  /**
   * Supprimer un vigil
   * @param vigil
   */
  removeVigil(vigil: Vigil) {
    return this.http.post(this.api + "vigilant/delete/" + vigil.id, {}, {
      headers: this.authtHeader,
      observe: "response"
    });
  }

  /**
   * Ajouter un nouveau vigil
   * @param first_name prénom
   * @param last_name nom
   * @param resto_id id du resto où il sera affécté
   */
  createVigil(first_name: string, last_name: string, resto_id: number) {
    return this.http.post(this.api + "vigilant/create", {
      first_name: first_name,
      last_name: last_name,
      resto: resto_id,
    }, {
      headers: this.authtHeader,
      observe: "response"
    });
  }

}
