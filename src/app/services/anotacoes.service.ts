import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Anotacao {
  id?: string;
  titulo: string;
  conteudo: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnotacoesService {
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

  listarAnotacoes(): Observable<Anotacao[]> {
    return this.http.get<Anotacao[]>(`${this.urlBase}/anotacoes`, {
      headers: this.getHeaders()
    });
  }

  criarAnotacao(anotacao: Omit<Anotacao, 'id'>): Observable<Anotacao> {
    return this.http.post<Anotacao>(`${this.urlBase}/anotacoes`, anotacao, {
      headers: this.getHeaders()
    });
  }

  atualizarAnotacao(id: string, anotacao: Omit<Anotacao, 'id'>): Observable<Anotacao> {
    return this.http.put<Anotacao>(`${this.urlBase}/anotacoes/${id}`, anotacao, {
      headers: this.getHeaders()
    });
  }

  excluirAnotacao(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/anotacoes/${id}`, {
      headers: this.getHeaders()
    });
  }
} 