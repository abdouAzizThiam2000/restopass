import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { ParamsService } from '../services/params.service';
import { Params } from '../models/params';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-user-profile',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {
  monClone: Params;
  modeRamadan: Params;
  jst: boolean;
  admin: Admin;
  abilities: string;
  MaxEmprunt: Params;
  closeResult: string;
  ramadan: number;
  montant: number;
  isload: boolean;



  constructor(private auth: AuthService,
    private router: Router, private params: ParamsService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {

    this.admin = this.auth.getAdminFromStorage()
    this.abilities = this.admin.abilitie ? "Administateur" : "Invité";

    if (this.auth.isLogin() !== true) {
      this.router.navigate(['/login']);
    }
    this.getParams();
  }

  getParams() {
    this.isload = true;

    this.params.list().subscribe({
      next: (response) => {
        console.log('Params : ', response.body);
        response.body.forEach(element => {
          if (element.code == 1) {
            this.modeRamadan = element;
          }
          if (element.code == 2) {
            this.MaxEmprunt = element;

          }


        });
        this.isload = false;



      },
      error: (errors) => {
        console.error(errors);
        this.isload = false;

      },
    });
  }


  cloneObject(params: Params) {
    this.monClone = params;
    console.log(this.monClone);

  }



  changeParams(params: Params) {
    if (params.name == "Mode Ramadan") {
      params.value = params.value ? 1 : 0
    } else {
      params.value = params.value;
    }
    console.log("sjdnjk", params.value);

    this.params.changeParams(params).subscribe({
      next: (response) => {
        console.log('NAS Params', response.body);
        this.showNotification('top', 'right', 1);



      },
      error: (errors) => {
        console.error(errors);
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
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>  <b>Notification suspression</b> - Votre suspression a été reussie.', '', {
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
