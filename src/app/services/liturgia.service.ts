import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Liturgia } from '../interfaces/liturgia.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LiturgiaService {
  private readonly baseUrl = 'http://localhost:8080/liturgia';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }

  getLiturgia(dia: number, mes: number, ano: number): Observable<Liturgia> {
    const mesFormatado = mes < 10 ? `0${mes}` : mes;
    return this.http.get<Liturgia>(`${this.baseUrl}/${dia}/${mesFormatado}`, {
      headers: this.getHeaders()
    });
  }

  getLiturgiaDoDia(): Observable<Liturgia> {
    return this.http.get<Liturgia>(`${this.baseUrl}`, {
      headers: this.getHeaders()
    });
  }
}
