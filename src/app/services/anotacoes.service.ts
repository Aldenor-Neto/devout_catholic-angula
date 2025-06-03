import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

interface AnotacaoBackend {
  id?: string;
  titulo: string;
  descricao: string;
  dataCriacao: string;
}

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

  private mapToFrontend(backend: AnotacaoBackend): Anotacao {
    return {
      id: backend.id,
      titulo: backend.titulo,
      conteudo: backend.descricao,
      data: backend.dataCriacao
    };
  }

  private mapToBackend(frontend: Omit<Anotacao, 'id'>): Omit<AnotacaoBackend, 'id'> {
    return {
      titulo: frontend.titulo,
      descricao: frontend.conteudo,
      dataCriacao: frontend.data
    };
  }

  listarAnotacoes(): Observable<Anotacao[]> {
    return this.http.get<AnotacaoBackend[]>(`${this.urlBase}/anotacoes`, {
      headers: this.getHeaders()
    }).pipe(
      map(anotacoes => anotacoes.map(a => this.mapToFrontend(a)))
    );
  }

  obterAnotacao(id: string): Observable<Anotacao> {
    return this.http.get<AnotacaoBackend>(`${this.urlBase}/anotacoes/${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(anotacao => this.mapToFrontend(anotacao))
    );
  }

  criarAnotacao(anotacao: Omit<Anotacao, 'id'>): Observable<Anotacao> {
    const backendAnotacao = this.mapToBackend(anotacao);
    return this.http.post<AnotacaoBackend>(`${this.urlBase}/anotacoes`, backendAnotacao, {
      headers: this.getHeaders()
    }).pipe(
      map(response => this.mapToFrontend(response))
    );
  }

  atualizarAnotacao(id: string, anotacao: Anotacao): Observable<Anotacao> {
    const backendAnotacao = {
      id: id,
      ...this.mapToBackend(anotacao)
    };

    return this.http.put<AnotacaoBackend>(`${this.urlBase}/anotacoes/${id}`, backendAnotacao, {
      headers: this.getHeaders()
    }).pipe(
      map(response => this.mapToFrontend(response))
    );
  }

  excluirAnotacao(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/anotacoes/${id}`, {
      headers: this.getHeaders()
    });
  }
} 