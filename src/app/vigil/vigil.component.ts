import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Resto } from '../models/resto';
import { Vigil } from '../models/vigil';
import { AuthService } from '../services/auth.service';
import { RestoService } from '../services/resto.service';
import { VigilService } from '../services/vigil.service';

@Component({
  selector: 'app-vigil',
  templateUrl: './vigil.component.html',
  styleUrls: ['./vigil.component.css']
})
export class VigilComponent implements OnInit {
  abilitie = false;
  closeResult: string;
  myClone: Vigil;
  elementType = 'img';
  value = 'Techiediaries';
  vigils: Vigil[];
  restos: Resto[];
  first_name: string;
  last_name: string;
  resto_id: number;
  isload: boolean;
  search: string = "";

  form = new FormGroup({
    id: new FormControl(""),
    code: new FormControl(""),

    qr: new FormControl(""),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    resto: new FormControl(''),
    update_by: new FormControl(0),
    created_by: new FormControl(0),



  });



  constructor(private modalService: NgbModal, private vigil: VigilService, private resto: RestoService, private toastr: ToastrService, private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (this.auth.isLogin() !== true) {
      this.router.navigate(['/login']);
    }
    this.getListVigil();
    this.getListResto();
  }

  getListVigil() {
    this.isload = true;
    this.vigil.getListVigil().subscribe({
      next: (response) => {
        console.log('RESPONSE : ', response.body);
        console.log(response.body);
        this.vigils = response.body;
        this.isload = false;

      },
      error: (errors) => {
        console.log('ERRORS', errors);
        this.isload = false;
      },
    });
  }


  createVigil() {
    this.vigil.createVigil(this.first_name, this.last_name, this.resto_id).subscribe({
      next: (response) => {
        console.log('RESPONSE: ', response.body);
        location.reload();

        this.showNotification('top', 'right', 2);
      },
      error: (errors) => {
        console.log('ERRORS: ', errors);
      },
    });
  }

  cloneObject(vigil: Vigil) {
    this.myClone = vigil;

  }


  getListResto() {
    this.resto.getListResto().subscribe({
      next: (response) => {
        console.log('RESPONSE : ', response.body);
        //   let admin: Admin = JSON.parse(localStorage.getItem("admin"));
        //    this.abilitie = admin.abilitie;
        console.log(response.body);
        this.restos = response.body;
      },
      error: (errors) => {
        console.log('ERROR : ', errors);
      },
    });
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

  removeVigil(vigil: Vigil) {
    this.vigil.removeVigil(vigil).subscribe({
      next: (response) => {
        console.log('RESPONSE: ', response.body);
        this.vigils.splice(this.vigils.indexOf(vigil), 1);
        this.showNotification('top', 'right', 4);
      },
      error: (errors) => {
        console.log('ERRORS: ', errors);
      },
    });
  }


  update(vigil: Vigil) {
    this.vigil.updateVigil(vigil).subscribe({
      next: (response) => {
        console.log(response.body);
        this.showNotification('top', 'right', 1);
        location.reload();


      },
      error: (errors) => {
        console.log(errors);
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


}
