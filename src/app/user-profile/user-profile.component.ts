import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../models/admin';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  closeResult: string;
  first_name: string;
  last_name: string;
  NewAbilitie: boolean = false;
  email: string;
  load = false
  ancien: string = "";
  nouveau: string = "";
  admin: Admin;
  abilities: string;

  isload: boolean;


  constructor(private auth: AuthService,
    private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.auth.isLogin() !== true) {
      this.router.navigate(['/login']);
    }
    this.admin = this.auth.getAdminFromStorage();
    this.abilities = this.admin.abilitie ? "Administrateur" : "Invité"
  }



  create() {

    this.auth.createAdmin(this.first_name, this.last_name, this.email, this.NewAbilitie).subscribe({
      next: (response) => {
        console.log('RESPONSE: ', response.body);
        this.email = "";
        this.first_name = "";
        this.NewAbilitie = false;
        this.last_name = "";

        this.showNotification('top', 'right', 2);


      },
      error: (errors) => {
        console.log('ERRORS: ', errors);
        this.email = "";
        this.first_name = "";
        this.NewAbilitie = false;
        this.last_name = "";

        this.showNotification('top', 'right', 4);

      },
    });
  }

  update() {
    this.auth.updatePassword(this.ancien, this.nouveau).subscribe({
      next: (response) => {
        console.log(response.body);
        this.showNotification('top', 'right', 1);
        this.ancien = "";
        this.nouveau = "";



      },
      error: (errors) => {
        console.log(errors);
        if (errors.status == 400) {
          this.showNotification('top', 'right', 4);

        }
        this.ancien = "";
        this.nouveau = "";

      },
    });
  }


  open(content, type) {
    if (type === 'sm') {
      console.log('aici');
      this.modalService.open(content, { size: 'sm' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }




  showNotification(from, align, num) {

    const color = num;

    switch (color) {
      case 1:
        this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span> <b>Notification modification </b> - Votre modification a été réussie.', '', {
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
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>  <b>Notification erreur</b> - Mot de passe courant invalide.', '', {
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
