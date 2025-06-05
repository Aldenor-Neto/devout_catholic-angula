import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

interface AiResponse {
  error: any;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private readonly baseUrl = 'http://localhost:8080/ai';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Detalhes completos do erro:', error);

    if (error.status === 401) {
      return throwError(() => new Error('Não autorizado. Por favor, faça login novamente.'));
    }

    if (error.status === 403) {
      return throwError(() => new Error('Acesso negado. Você não tem permissão para realizar esta ação.'));
    }

    // Se o erro for de parsing mas temos o texto da resposta
    if (error.status === 200 && error.error && error.error.text) {
      return throwError(() => error.error.text);
    }

    let errorMessage = 'Ocorreu um erro ao processar sua solicitação.';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do backend
      errorMessage = `Código: ${error.status}\nMensagem: ${error.message}`;
      if (error.error) {
        errorMessage += `\nDetalhes: ${JSON.stringify(error.error)}`;
      }
    }

    return throwError(() => errorMessage);
  }

  getReflexao(question: string): Observable<string> {
    console.log('Enviando requisição para:', this.baseUrl);
    console.log('Payload:', { question });
    console.log('Headers:', this.getHeaders());

    return this.http.post<AiResponse>(this.baseUrl, { question }, {
      headers: this.getHeaders(),
      observe: 'response'
    }).pipe(
      map(response => {
        const body = response.body;
        if (body && typeof body === 'object' && 'text' in body) {
          return body.text;
        }
        throw new Error('Resposta inválida da API');
      }),
      catchError(this.handleError)
    );
  }
}
