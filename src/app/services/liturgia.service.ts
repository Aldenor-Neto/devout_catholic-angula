import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Liturgia } from '../interfaces/liturgia.interface';

@Injectable({
  providedIn: 'root'
})
export class LiturgiaService {
  private readonly baseUrl = 'https://liturgia.up.railway.app';

  constructor(private http: HttpClient) { }

  getLiturgia(dia: number, mes: number, ano: number): Observable<Liturgia> {
    const mesFormatado = mes < 10 ? `0${mes}` : mes;
    return this.http.get<Liturgia>(`${this.baseUrl}/?dia=${dia}&mes=${mesFormatado}&ano=${ano}`);
  }
} 