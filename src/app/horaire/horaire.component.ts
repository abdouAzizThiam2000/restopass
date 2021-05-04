import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Horaire } from '../models/horaire';
import { AuthService } from '../services/auth.service';
import { HoraireService } from '../services/horaire.service';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.css']
})
export class HoraireComponent implements OnInit {
  closeResult: string;
  horaireS: Horaire[];
  heure1: number[];
  heure2: number[];
  heure3: number[];
  isload: boolean;

  ndekki: Horaire;
  agn: Horaire;
  rer: Horaire;
  ouverture: number;
  fermeture: number;
  monClone: Horaire;


  constructor(private modalService: NgbModal, private horaire: HoraireService, private toastr: ToastrService, private auth: AuthService
  ) { }

  ngOnInit() {
    this.heure1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    this.heure2 = [11, 12, 13, 14, 15, 16, 17];
    this.heure3 = [17, 18, 19, 20, 21, 22, 23, 0];

    this.getHoraire();
  }


  cloneObject(horaire: Horaire) {
    this.monClone = horaire;
    console.log(this.monClone);

  }


  getHoraire() {
    this.isload = true;

    this.horaire.listHoraire().subscribe({
      next: (response) => {
        console.log('HORAIRE : ', response.body);
        this.horaireS = response.body;
        response.body.forEach(element => {
          if (element.number == 0) {
            this.ndekki = element;

          }
          if (element.number == 1) {
            this.agn = element;

          }
          if (element.number == 2) {
            this.rer = element;

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




  changeHoraire(horaire: Horaire) {
    this.horaire.changeHoraire(horaire).subscribe({
      next: (response) => {
        console.log('NAS HORAIRE', response.body);
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
