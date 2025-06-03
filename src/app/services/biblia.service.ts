import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface LivroCompleto {
  abbrev: string;
  name: string;
  chapters: string[][];
}

@Injectable({
  providedIn: 'root'
})
export class BibliaService {
  private readonly urlBase = 'http://localhost:8080';

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

  listarLivros(versao: 'avemaria' | 'jerusalem'): Observable<string[]> {
    return this.http.get<string[]>(`${this.urlBase}/biblia/${versao}/list-livros`, {
      headers: this.getHeaders()
    });
  }

  buscarLivro(nome: string, versao: 'avemaria' | 'jerusalem'): Observable<LivroCompleto> {
    return this.http.get<LivroCompleto>(`${this.urlBase}/biblia/${versao}/${nome}`, {
      headers: this.getHeaders()
    });
  }
} 