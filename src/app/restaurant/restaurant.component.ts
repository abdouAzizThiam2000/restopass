import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../models/admin';
import { Resto } from '../models/resto';
import { AuthService } from '../services/auth.service';
import { RestoService } from '../services/resto.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  restos: Resto[];
  monClone: Resto;
  search: string = "";
  isload: boolean;

  abilitie = false;
  closeResult: string;
  nom: string;
  form = new FormGroup({

    id: new FormControl(0),
    code: new FormControl(""),
    name: new FormControl(''),
    update_by: new FormControl(0),
    created_by: new FormControl(0),




  });


  constructor(private modalService: NgbModal, private resto: RestoService, private toastr: ToastrService, private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.auth.isLogin() !== true) {
      this.router.navigate(['/login']);
    }
    this.getListResto();

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






  getListResto() {
    this.isload = true;

    this.resto.getListResto().subscribe({
      next: (response) => {
        console.log('RESPONSE : ', response.body);
        //   let admin: Admin = JSON.parse(localStorage.getItem("admin"));
        //    this.abilitie = admin.abilitie;
        console.log(response.body);
        this.restos = response.body;
        this.isload = false;

      },
      error: (errors) => {
        console.log('ERROR : ', errors);
        this.isload = false;

      },
    });
  }


  create() {
    this.resto.createResto(this.nom).subscribe({
      next: (response) => {
        console.log('RESPONSE : ', response.body);
        this.restos.push(response.body);
        this.showNotification('top', 'right', 2);
        this.nom = "";
      },
      error: (errors) => {
        console.log('ERROR : ', errors);
        this.nom = "";

      },
    });

  }
  cloneObject(resto: Resto) {
    this.monClone = resto;
    console.log(this.monClone);
    this.search = "";

  }

  removeResto(resto: Resto) {
    this.resto.remove(resto).subscribe({
      next: (response) => {
        console.log('RESPONSE : ', response.body);
        this.restos.splice(this.restos.indexOf(resto), 1);
        this.showNotification('top', 'right', 4);


      },
      error: (errors) => {
        console.log('ERROR : ', errors);
      },
    });
  }


  update(resto: Resto) {
    this.resto.updateResto(resto).subscribe({
      next: (response) => {
        console.log('RESPONSE : ', response.body);
        this.showNotification('top', 'right', 1);

      },
      error: (errors) => {
        console.log('ERRORS, ', errors);
      },
    });
  }

  jst(resto: Resto) {
    this.resto.jst(resto).subscribe({
      next: (response) => {
        console.log('RESPONSE : ', response.body);
        resto.no_pay = !resto.no_pay;

        this.showNotification('top', 'right', 1);

      },
      error: (errors) => {
        console.log('ERRORS, ', errors);
      },
    });
  }
  clicker(a, sm) {
    return this.open(a, sm);
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

