import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Admin } from "../models/admin";
import { Token } from "../models/token";
import { environment } from "environments/environment";
import { ApiResponse } from "../models/api-response";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private header = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  constructor(private http: HttpClient, private router: Router) { }

  public login(email: string, password: string) {
    return this.http.post<Token>(
      environment.host + "/admin/login",
      {
        email: email,
        password: password,
      },
      {
        headers: this.header,
        observe: "response",
      }
    );
  }

  public isLogin(): boolean {
    let token: Token = JSON.parse(localStorage.getItem("token"));
    if (token == null) return false;
    return true;
  }

  public adminProfile() {
    let token: Token = JSON.parse(localStorage.getItem("token"));
    return this.http.get<Admin>(environment.host + "/admin", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token.access_token,
      },
      observe: "response",
    });
  }

  public getAdminFromStorage(): Admin {
    return JSON.parse(localStorage.getItem("admin"));
  }

  public setAdmin() {
    let admin: Admin = JSON.parse(localStorage.getItem("admin"));
    if (admin != null) return;
    this.adminProfile().subscribe({
      next: (data) => {
        admin = data.body;
        localStorage.setItem("admin", JSON.stringify(admin));
      },
      error: (error) => {
        if (error.status == 400) {
          this.router.navigate(["/login"]);
        }
      },
    });
  }
  public getAbilitie() {
    let admin: Admin = JSON.parse(localStorage.getItem("admin"));
    return admin.abilitie;
  }

  public logout() {
    let token: Token = JSON.parse(localStorage.getItem("token"));

    this.http
      .post(
        environment.host + "/admin/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token.access_token,
          },
        }
      )
      .subscribe({
        next: (data) => {
          localStorage.removeItem("admin");
          localStorage.removeItem("token");
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          localStorage.removeItem("admin");
          localStorage.removeItem("token");
          this.router.navigate(["/login"]);
        },
      });
  }
  createAdmin(first_name: string, last_name: string, email: string, abilitie: boolean) {
    console.log(abilitie, "backend");

    let token: Token = JSON.parse(localStorage.getItem("token"));

    return this.http.post(environment.api + "admin/create", {
      first_name: first_name,
      last_name: last_name,
      email: email,
      abilitie: abilitie

    }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token.access_token,
      },
      observe: "response"
    });
  }



  updatePassword(ancien: String, nouveau: String) {
    let token: Token = JSON.parse(localStorage.getItem("token"));

    return this.http.post<ApiResponse>(
      environment.api + 'admin/update-password',
      {
        password: ancien,
        new_password: nouveau
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token.access_token,
        },
        observe: 'response',
      }
    );
  }



}
