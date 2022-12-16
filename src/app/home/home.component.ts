import { Component, OnInit } from '@angular/core';
import { PainelService } from '../painel.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Color, Label } from 'ng2-charts';
import * as moment from "moment";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dadosDaTabelaUltimasIntercorrencias: any = [];
  colunasTabelaUltimasIntercorrencias = ['nome_paciente', 'data_inicio', 'horario', 'grau_de_urgencia', 'classificacao'];

  dadosDaTabelaQuantidadeChamados: any = [];
  colunasTabelaQuantidadeChamados = ['nome_paciente', 'quantidade'];

  quantidadeDeChamadosAbertosObjeto: any = [];
  quantidadeDeChamadosAbertosNumbero: number = 0;

  dadosDoGraficoDeTempo: any = [];
  public barChartTempoLabels: Label[] = [];
  public barChartTempoData: any = [];
  public barChartTempoDataHora: number = 0;
  public barChartTempoDataMinuto: number = 0;
  public barChartTempoOptions: ChartOptions = {};
  maiorQuantidadePraEscala: number = 0;
  maiorQuantidadePraEscalaGraficoTempo: number = 0;
  menorData!: Date;
  maiorData!: Date;
  datas: any = [];
  datasIguais: boolean = false;

  chartReady = false;
  chartBarraReady = false;
  chartTempoReady = false;

  dadosDoGraficoPizza: any = [];
  public doughnutChartLabels: any = [];
  public doughnutChartType = 'doughnut';
  public doughnutChartQuantidade: any = [];
  public doughnutChartLegend = true;
  public doughnutChartOptions: any = [];
  public doughnutChartPlugins: any = [];

  dadosDoGraficoBarra: any = [];
  public barChartType = 'bar';
  public barChartLabels: Label[] = [];
  public barChartData: any = [];
  public barChartOptions: ChartOptions = {};
  // public barChartColors: Color[] = [];
  public barChartLegend = false;
  public barChartPlugins: any = [];


  barChartData2: ChartDataSets[] = [];
  barChartTempoData2: ChartDataSets[] = [];


  public pieChartColors = [
    {
      backgroundColor: ['#FAD02C', '#333652', '#6E7BEB'],
    },
  ];


  public barChartColors = [
    {
      backgroundColor: ['#189AB4', '#05445E', '#75E6DA'],
    },
  ];

  public barTempoChartColors = [
    {
      backgroundColor: ['#EB6750', '#EBB338', '#4198A6'],
    },
  ];

  //


  constructor(private service: PainelService) { }

  ngOnInit() {

    this.service.tabelaUltimasIntercorrencias().subscribe(response => {
      this.dadosDaTabelaUltimasIntercorrencias = response;

      let x = 0;
      for (var index in this.dadosDaTabelaUltimasIntercorrencias) {
        this.datas[x] = this.dadosDaTabelaUltimasIntercorrencias[index].data_inicio;
        x = x + 1;
      }

      var max = this.datas[0],
        min = this.datas[0];

      let a = 0;
      this.datas.forEach(function (v: any) {
        max = new Date(v) > new Date(max) ? v : max;
        min = new Date(v) < new Date(min) ? v : min;
      });


      if (moment(min).isSame(max)) {
        this.datasIguais = true;      
      }

      
      this.menorData = min.substr(0, 10);
      this.maiorData =  max.substr(0, 10);
    })


    this.service.tabelaQuantidadeChamados().subscribe(response => {
      this.dadosDaTabelaQuantidadeChamados = response;
    })

    this.service.quantidadeDeChamadosAbertos().subscribe(response => {
      this.quantidadeDeChamadosAbertosObjeto = response;
      for (var index in this.quantidadeDeChamadosAbertosObjeto) {
        this.quantidadeDeChamadosAbertosNumbero = this.quantidadeDeChamadosAbertosNumbero + parseInt(this.quantidadeDeChamadosAbertosObjeto[index].quantidade)
      }
    })


    this.service.graficoPizza().subscribe(response => {
      this.dadosDoGraficoPizza = response;

      this.chartReady = true;
      this.doughnutChartType = 'doughnut';
      this.doughnutChartLegend = true;

      let x = 0;

      this.barChartPlugins = [pluginDataLabels];
      for (var index in this.dadosDoGraficoPizza) {
        this.doughnutChartLabels[x] = this.dadosDoGraficoPizza[index].grau_de_urgencia;

        this.doughnutChartQuantidade[x] = this.dadosDoGraficoPizza[index].quantidade;
        x = x + 1;
      }

      this.doughnutChartOptions = {
        responsive: true,

        plugins: {
          datalabels: {
            anchor: 'center',
            align: 'center',
            fontColor: 'white'


          },
          font: {
            weight: 'bold',
            fontSize: 26,
            fontColor: 'white'

          }
        },
        legend: {
          labels: {
            fontSize: 18
          },

        },
      };
    })

    this.service.graficoBarra().subscribe(response => {
      this.dadosDoGraficoBarra = response;
      this.chartBarraReady = true;
      this.barChartType = 'bar';

      let y = 0;
      console.log(this.dadosDoGraficoBarra)

      for (var index in this.dadosDoGraficoBarra) {
        this.barChartLabels[y] = this.dadosDoGraficoBarra[index].classificacao_por_desfecho;
        if (this.barChartLabels[y] == 'Solução no Domicílio com Atendimento Domiciliar') {
          this.barChartLabels[y] = "Solução...Atendimento Domiciliar"
        }
        this.barChartData[y] = this.dadosDoGraficoBarra[index].quantidade;
        if (parseInt(this.barChartData[y]) > this.maiorQuantidadePraEscala) {
          this.maiorQuantidadePraEscala = parseInt(this.barChartData[y]);
        }
        y = y + 1;

      }

      this.barChartOptions = {
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              max: this.maiorQuantidadePraEscala,
              fontSize: 16

              // }
            }
          },], yAxes: [{
            scaleLabel: {
              display: true,

            },
            ticks: {
              fontSize: 16
            }
          }]

        },
        plugins: {
          datalabels: {
            anchor: 'center',
            align: 'end',
          },
          ticks: {
            fontSize: 16
          }
        },
        legend: {
          labels: {
            fontSize: 14
          }
        },
      };


      this.barChartPlugins = [pluginDataLabels];

      console.log("sdsadsadfsf", this.barChartData[0])
      this.barChartData2 = [
        { data: this.barChartData, label: 'Tipo de Solução' }
      ];

      this.barChartLegend = true;

    })


    this.service.tempoParaRealizar().subscribe(response => {
      this.dadosDoGraficoDeTempo = response;
      console.log('= --------------------->', this.dadosDoGraficoDeTempo)
      this.chartTempoReady = true;
      let horas = 0, minutos = 0;
      let y = 0;
      for (var index in this.dadosDoGraficoDeTempo) {
        this.barChartTempoLabels[y] = this.dadosDoGraficoDeTempo[index].grau_de_urgencia;



        this.barChartTempoData[y] = parseFloat(this.dadosDoGraficoDeTempo[index].avg).toFixed(1);


        if (this.barChartTempoData[y] > this.maiorQuantidadePraEscalaGraficoTempo) {
          this.maiorQuantidadePraEscalaGraficoTempo = parseInt(this.barChartTempoData[y]);

        }

        y = y + 1;

      }

      this.barChartTempoData2 = [
        { data: this.barChartTempoData, label: 'Tempo médio de solução dos chamados (horas)' }
      ];


      this.barChartTempoOptions = {
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              max: this.maiorQuantidadePraEscalaGraficoTempo,
              fontSize: 16
            }
          },], yAxes: [{
            scaleLabel: {
              display: true,

            },
            ticks: {
              fontSize: 16
            }
          }]

        },
        plugins: {
          datalabels: {
            anchor: 'center',
            align: 'end',
          },
          ticks: {
            fontSize: 16
          }
        },
        legend: {
          labels: {
            fontSize: 14
          }
        },
      };
    })

  }


}
