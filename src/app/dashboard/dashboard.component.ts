import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chartist from 'chartist';
import { Admin } from '../models/admin';
import { AuthService } from '../services/auth.service';
import { StatistiqueService } from '../services/statistique.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas: any;
  public ctx;
  public gradientFill;
  public gradientFill2;
  public gradientFill1;
  date: Date;
  load = false
  admin: Admin;
  abilities: string;


  emprunt: number = 0;
  perte: number = 0;
  recetteAnnuelle = 0;
  somme1: number = 0;
  somme2: number = 0;
  somme3: number = 0;
  somme4: number = 0;

  monnaie: string = "FCFA";

  chargement: boolean = true;

  public lineBigDashboardChartData: Array<any>;
  public lineBigDashboardChartOptions: any;
  public lineBigDashboardChartLabels: Array<any>;
  public lineBigDashboardChartColors: Array<any>

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineChartType;
  public lineChartData1: Array<any>;
  public lineChartData2: Array<any>;
  public lineChartData3: Array<any>;


  public lineChartOptions: any;
  public lineChartLabels: Array<any>;
  public lineChartColors1: Array<any>
  public lineChartColors2: Array<any>


  public lineChartWithNumbersAndGridType;
  public lineChartWithNumbersAndGridData: Array<any>;
  public lineChartWithNumbersAndGridOptions: any;
  public lineChartWithNumbersAndGridLabels: Array<any>;
  public lineChartWithNumbersAndGridColors: Array<any>

  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData: Array<any>;
  public lineChartGradientsNumbersOptions: any;
  public lineChartGradientsNumbersLabels: Array<any>;
  public lineChartGradientsNumbersColors: Array<any>
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  constructor(private auth: AuthService,
    private router: Router, private statistique: StatistiqueService) { }

  ngOnInit() {
    if (this.auth.isLogin() !== true) {
      this.router.navigate(['/login']);
    }

    this.admin = this.auth.getAdminFromStorage()
    this.abilities = this.admin.abilitie ? "Administateur" : "Invité";
    this.chargement;
    this.date = new Date;


    this.lineBigDashboardChartData = [
      {
        label: "Nombre de passages",

        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,

        borderWidth: 2,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ];



    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("bigDashboardChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    this.gradientFill1! = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill1.addColorStop(0, "#C8F8D3");
    this.gradientFill1.addColorStop(1, "#52EE76");


    this.gradientFill2! = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill2.addColorStop(0, "#DCF3F3");
    this.gradientFill2.addColorStop(1, "#6EEEEE");


    this.lineBigDashboardChartColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: this.chartColor,
        pointBorderColor: this.chartColor,
        pointBackgroundColor: "#2c2c2c",
        pointHoverBackgroundColor: "#2c2c2c",
        pointHoverBorderColor: this.chartColor,
      }
    ];
    this.lineBigDashboardChartLabels = ["JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI", "JUIN", "JUILLET", "AOUT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DECEMBRE"];
    this.lineBigDashboardChartOptions = {

      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 0
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      legend: {
        position: "bottom",
        fillStyle: "#FFF",
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10
          },
          gridLines: {
            drawTicks: true,
            drawBorder: false,
            display: true,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent"
          }

        }],
        xAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            display: false,

          },
          ticks: {
            padding: 10,
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold"
          }
        }]
      }
    };

    this.lineBigDashboardChartType = 'line';


    this.gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          },
          ticks: {
            stepSize: 500
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.canvas = document.getElementById("lineChartExample");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    this.lineChartData1 = [
      {

        label: "Nombre de passages",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ];

    this.lineChartData2 = [
      {
        label: "Nombre de passages",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ];

    this.lineChartData3 = [
      {
        label: "Nombre de passages",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0]
      }
    ];
    this.lineChartColors1 = [
      {
        borderColor: "#29B754",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#29B754",
        backgroundColor: this.gradientFill1
      }
    ];
    this.lineChartColors2 = [
      {
        borderColor: "#19CFD3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#19CFD3",
        backgroundColor: this.gradientFill2
      }
    ];
    this.lineChartLabels = ["JANVIER", "FEVRIER", "MARS", "AVRIL", "MAi", "JUIN", "JUILLET", "AOUT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DECEMBRE"];
    this.lineChartOptions = this.gradientChartOptionsConfiguration;

    this.lineChartType = 'line';

    this.canvas = document.getElementById("lineChartExampleWithNumbersAndGrid");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#18ce0f');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));

    this.lineChartWithNumbersAndGridData = [
      {
        label: "Dette mensuelle en FCFA",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ];
    this.lineChartWithNumbersAndGridColors = [
      {
        borderColor: "#18ce0f",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#18ce0f",
        backgroundColor: this.gradientFill
      }
    ];
    this.lineChartWithNumbersAndGridLabels = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
    this.lineChartWithNumbersAndGridOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;

    this.lineChartWithNumbersAndGridType = 'line';




    this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


    this.lineChartGradientsNumbersData = [
      {
        label: "Vente mensuel en FCFA",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ];
    this.lineChartGradientsNumbersColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: "#2CA8FF",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#2CA8FF",
      }
    ];
    this.lineChartGradientsNumbersLabels = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
    this.lineChartGradientsNumbersOptions = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          },
          ticks: {
            stepSize: 10000000
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    }

    this.lineChartGradientsNumbersType = 'bar';

    this.getAllStatistique()
  }



  private getAdmin() {
    this.load = true;
    this.auth.adminProfile().subscribe({
      next: data => {
        console.log(data.body);
        this.load = true;
        this.admin = data.body;
        localStorage.setItem("admin", JSON.stringify(this.admin));
        this.abilities = this.admin.abilitie ? "Administrateur" : "Invité"
      },
      error: error => {
        this.load = true;
        console.error(error);
      }
    })
  }
  /**
 * Récupérer tous les staitques
 */
  getAllStatistique() {

    this.statistique.getStatique().subscribe({
      next: (response) => {
        console.log('STAT: ', response.body);
        response.body.all.forEach(element => {
          this.somme1 += element;

        });
        response.body.dej.forEach(element => {
          this.somme2 += element;

        });
        this.somme2 *= 50;
        response.body.repas.forEach(element => {
          this.somme3 += element;

        });
        response.body.vente.forEach(element => {
          this.recetteAnnuelle += element;

        });
        response.body.dinner.forEach(element => {
          this.somme4 += element;

        });
        this.somme4 *= 100;

        this.somme3 *= 100;
        this.chargement = false;
        this.perte = response.body.perte;
        this.emprunt = response.body.emprunt;

        this.lineBigDashboardChartData = [
          {
            label: "Nombre de passages",

            pointBorderWidth: 1,
            pointHoverRadius: 7,
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            fill: true,

            borderWidth: 2,
            data: [...response.body.all]
          }
        ];
        this.lineChartData1 = [
          {
            label: "Nombre de passages",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            borderWidth: 2,
            data: [...response.body.dej]
          },
        ];

        this.lineChartData2 = [
          {
            label: "Nombre de passages",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            borderWidth: 2,
            data: [...response.body.repas]
          }
        ];
        this.lineChartData3 = [
          {
            label: "Nombre de passages",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            borderWidth: 2,
            data: [...response.body.dinner]
          }
        ];
        this.lineChartGradientsNumbersData = [
          {
            label: "Vente mensuel en FCFA",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            borderWidth: 1,
            data: [...response.body.vente]
          }
        ];
        this.lineChartWithNumbersAndGridData = [
          {
            label: "Dette mensuelle en FCFA",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            borderWidth: 2,
            data: [...response.body.emprunt_mois]
          }
        ];
      },
      error: (errors) => {
        console.error(errors);
      },
    });
  }
}
