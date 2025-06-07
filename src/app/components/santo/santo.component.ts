import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { AiService } from '../../services/ai.service';
import { BrazilianDateAdapter } from '../../shared/brazilian-date.adapter';

const BRAZILIAN_DATE_FORMATS = {
  parse: {
    dateInput: 'input',
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-santo',
  templateUrl: './santo.component.html',
  styleUrls: ['./santo.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    HeaderComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: BrazilianDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: BRAZILIAN_DATE_FORMATS }
  ]
})
export class SantoComponent implements OnInit {
  santo: string = '';
  loading: boolean = true;
  selectedDate = new Date();

  constructor(
    private router: Router,
    private aiService: AiService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.buscarSantoDoDia();
  }

  private formatarData(data: Date): string {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    return `${dia}/${mes}`;
  }

  onDateChange(event: any) {
    const date = event.value;
    if (date) {
      this.selectedDate = date;
      this.buscarSantoDoDia();
    }
  }

  buscarSantoDoDia() {
    this.loading = true;
    const dataFormatada = this.formatarData(this.selectedDate);

    const pergunta = `Segundo a igreja católica apostólica romana qual é o santo que se celebra no dia (${dataFormatada})? Qual a sua história e o que a sua vida cristã nos ensina?`;

    this.aiService.getReflexao(pergunta).subscribe({
      next: (resposta) => {
        if (typeof resposta === 'string') {
          this.santo = resposta;
        } else {
          console.error('Resposta inválida:', resposta);
          alert('Erro ao processar informações do santo. Por favor, tente novamente.');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao buscar santo do dia:', error);
        if (error.status === 401 || error.status === 403) {
          alert('Sua sessão expirou. Por favor, faça login novamente.');
          this.router.navigate(['/auth'], {
            queryParams: {
              returnUrl: this.router.url
            }
          });
        } else if (typeof error === 'string') {
          // Se o erro contiver o texto da resposta, vamos usá-lo
          this.santo = error;
        } else {
          alert('Erro ao buscar santo do dia. Por favor, tente novamente.');
        }
        this.loading = false;
      }
    });
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }

  criarNota() {
    this.router.navigate(['/anotacoes'], {
      queryParams: {
        modo: 'criar',
        origem: 'santo',
        conteudo: this.santo
      }
    });
  }
}
