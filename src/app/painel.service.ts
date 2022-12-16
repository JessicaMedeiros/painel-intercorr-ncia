import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PainelService {

  REST_API: string = environment.URL_STRING;

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  tabelaUltimasIntercorrencias() {
    let API_URL = `${this.REST_API}/tabela-ultimas-intercorrencias`;


    return this.http.get(API_URL, { headers: this.httpHeaders })
    .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  tabelaQuantidadeChamados() {
    let API_URL = `${this.REST_API}/tabela-quantidade-chamadados`;

    return this.http.get(API_URL, { headers: this.httpHeaders })
    .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  quantidadeDeChamadosAbertos(){
    let API_URL = `${this.REST_API}/chamados-abertos`;


    return this.http.get(API_URL, { headers: this.httpHeaders })
    .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  graficoPizza(){
    let API_URL = `${this.REST_API}/grafico-pizza`;


    return this.http.get(API_URL, { headers: this.httpHeaders })
    .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  graficoBarra(){
    let API_URL = `${this.REST_API}/grafico-barra`;


    return this.http.get(API_URL, { headers: this.httpHeaders })
    .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  tempoParaRealizar(){
    let API_URL = `${this.REST_API}/diferenca-resolucao`;


    return this.http.get(API_URL, { headers: this.httpHeaders })
    .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }


}
