import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Token } from '../models/token';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoadingOne = false;
  badRequest: boolean = false

  constructor(private auth: AuthService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.auth.isLogin() === true) {
      this.router.navigate(['/dashboard']);
    }

  }


  login(form: any) {
    console.log(form);
    this.isLoadingOne = true;
    this.badRequest = false;
    this.auth.login(form.email, form.password).subscribe({
      next: data => {
        console.log(data);
        this.isLoadingOne = false;
        this.badRequest = false;
        let token: Token = data.body;
        localStorage.setItem('token', JSON.stringify(token));
        console.log(JSON.parse(localStorage.getItem('token')));

        this.router.navigate(['/dashboard']);
        this.showNotification('top', 'right', 1);


      },
      error: error => {
        this.showNotification('top', 'right', 4);

        console.log(error);
        this.isLoadingOne = false;
        this.badRequest = true;
      }
    });
  }




  showNotification(from, align, num) {

    const color = num;

    switch (color) {
      case 1:
        this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span> <b>Notification de bienvenue </b> Bienvenue dans la partie admin.', '', {
          timeOut: 3000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-info alert-with-icon",
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 2:
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>  <b>Notification ajout</b> - Votre ajout a été réussie.', '', {
          timeOut: 3000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 3:
        this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 4:
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>  <b>Notification erreur</b> - Vos données saisies sont inccorectes.', '', {
          timeOut: 3000,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 5:
        this.toastr.show('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      default:
        break;
    }
  }




}
