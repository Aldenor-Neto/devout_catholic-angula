import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { LiturgiaService } from '../../services/liturgia.service';
import { Liturgia } from '../../interfaces/liturgia.interface';
import { BrazilianDateAdapter } from '../../shared/brazilian-date.adapter';
import { Router, ActivatedRoute } from '@angular/router';

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
  selector: 'app-liturgia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HeaderComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: BrazilianDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: BRAZILIAN_DATE_FORMATS }
  ],
  template: `
    <div class="container">
      <app-header></app-header>

      <main class="content">
        <div class="controls">
          <div class="toolbar">
            <button mat-icon-button (click)="voltarParaHome()" [attr.aria-label]="'Voltar para a página inicial'">
              <mat-icon>arrow_back</mat-icon>
            </button>
            <span>Liturgia Diária</span>
            <span class="spacer"></span>
            <button mat-fab color="primary" (click)="criarNota()" [attr.aria-label]="'Criar nova anotação'">
              <mat-icon>note_add</mat-icon>
            </button>
          </div>

          <mat-form-field appearance="outline">
            <mat-label>Escolher data</mat-label>
            <input matInput [matDatepicker]="picker" [value]="selectedDate" (dateChange)="onDateChange($event)" placeholder="DD/MM/AAAA">
            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <div class="button-group">
            <button mat-raised-button color="primary" (click)="showSection('oferendas')" [class.active]="activeSection === 'oferendas'">
              Oração do Dia
            </button>
            <button mat-raised-button color="primary" (click)="showSection('leituras')" [class.active]="activeSection === 'leituras'">
              Leituras do Dia
            </button>
            <button mat-raised-button color="primary" (click)="showSection('antifona')" [class.active]="activeSection === 'antifona'">
              Antífona
            </button>
          </div>
        </div>

        <div class="loading-container" *ngIf="loading">
          <mat-spinner diameter="40"></mat-spinner>
        </div>

        <mat-card class="liturgia-card" *ngIf="liturgiaData && !loading">
          <mat-card-content>
            <!-- Seção de Oferendas -->
            <div *ngIf="activeSection === 'oferendas'">
              <h2>Oração do Dia</h2>
              <p class="liturgia-text">{{ liturgiaData.dia }}</p>

              <h2>Oferenda</h2>
              <p class="liturgia-text">{{ liturgiaData.oferendas }}</p>

              <h2>Pós-comunhão</h2>
              <p class="liturgia-text">{{ liturgiaData.comunhao }}</p>
            </div>

            <!-- Seção de Leituras -->
            <div *ngIf="activeSection === 'leituras'">
              <h2>{{ liturgiaData.data }}</h2>
              <p class="liturgia-text">{{ liturgiaData.liturgia }}</p>
              <p class="liturgia-text">Cor: {{ liturgiaData.cor }}</p>

              <h2>Primeira Leitura</h2>
              <p class="liturgia-text">{{ liturgiaData.primeiraLeitura.referencia }}</p>
              <p class="liturgia-text">{{ liturgiaData.primeiraLeitura.titulo }}</p>
              <p class="liturgia-text">{{ liturgiaData.primeiraLeitura.texto }}</p>

              <h2>Salmo</h2>
              <p class="liturgia-text">{{ liturgiaData.salmo.referencia }}</p>
              <p class="liturgia-text">Refrão: {{ liturgiaData.salmo.refrao }}</p>
              <p class="liturgia-text">{{ liturgiaData.salmo.texto }}</p>

              <ng-container *ngIf="liturgiaData.segundaLeitura">
                <h2>Segunda Leitura</h2>
                <p class="liturgia-text">{{ liturgiaData.segundaLeitura.referencia }}</p>
                <p class="liturgia-text">{{ liturgiaData.segundaLeitura.titulo }}</p>
                <p class="liturgia-text">{{ liturgiaData.segundaLeitura.texto }}</p>
              </ng-container>

              <h2>Evangelho</h2>
              <p class="liturgia-text">{{ liturgiaData.evangelho.referencia }}</p>
              <p class="liturgia-text">{{ liturgiaData.evangelho.titulo }}</p>
              <p class="liturgia-text">{{ liturgiaData.evangelho.texto }}</p>
            </div>

            <!-- Seção de Antífona -->
            <div *ngIf="activeSection === 'antifona'">
              <h2>Antífona - Entrada</h2>
              <p class="liturgia-text">{{ liturgiaData.antifonas.entrada }}</p>

              <h2>Antífona - Ofertório</h2>
              <p class="liturgia-text">{{ liturgiaData.antifonas.ofertorio }}</p>

              <h2>Antífona - Comunhão</h2>
              <p class="liturgia-text">{{ liturgiaData.antifonas.comunhao }}</p>
            </div>
          </mat-card-content>
        </mat-card>
      </main>
    </div>
  `,
  styles: [`
    .container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #f5f5f5;
    }

    .content {
      flex: 1;
      padding: 1rem;
      max-width: 800px;
      margin: 0 auto;
      width: 100%;
    }

    .controls {
      margin-bottom: 2rem;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .button-group button {
      flex: 1;
      min-width: 150px;
    }

    .button-group button.active {
      background-color: #1a237e;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 2rem;
    }

    .liturgia-card {
      margin-top: 1rem;
    }

    mat-card-content {
      padding: 1rem;
    }

    h2 {
      color: #3f51b5;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
      font-weight: 500;
    }

    .liturgia-text {
      margin-bottom: 1rem;
      line-height: 1.6;
      color: rgba(0, 0, 0, 0.87);
      white-space: pre-wrap;
    }

    mat-form-field {
      width: 100%;
    }

    @media (max-width: 600px) {
      .content {
        padding: 1rem 0.5rem;
      }

      .button-group {
        flex-direction: column;
      }

      .button-group button {
        width: 100%;
      }
    }

    .toolbar {
      display: flex;
      align-items: center;
      padding: 8px;
      gap: 8px;
    }

    .spacer {
      flex: 1;
    }
  `]
})
export class LiturgiaComponent implements OnInit {
  liturgiaData: Liturgia | null = null;
  loading = false;
  selectedDate = new Date();
  activeSection: 'oferendas' | 'leituras' | 'antifona' = 'leituras';

  constructor(
    private liturgiaService: LiturgiaService,
    private dateAdapter: DateAdapter<Date>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
    // Verifica se há parâmetros para restaurar o estado
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.selectedDate = new Date(params['data']);
        if (params['secao']) {
          this.activeSection = params['secao'];
        }
      }
      this.fetchLiturgiaData(
        this.selectedDate.getDate(),
        this.selectedDate.getMonth() + 1,
        this.selectedDate.getFullYear()
      );
    });
  }

  onDateChange(event: any) {
    const date = event.value;
    if (date) {
      this.selectedDate = date;
      this.fetchLiturgiaData(
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear()
      );
    }
  }

  showSection(section: 'oferendas' | 'leituras' | 'antifona') {
    this.activeSection = section;
  }

  private fetchLiturgiaData(dia: number, mes: number, ano: number) {
    this.loading = true;
    if (dia && mes && ano) {
      this.liturgiaService.getLiturgia(dia, mes, ano).subscribe({
        next: (data) => {
          this.liturgiaData = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar liturgia:', error);
          this.loading = false;
        }
      });
    } else {
      this.liturgiaService.getLiturgiaDoDia().subscribe({
        next: (data) => {
          this.liturgiaData = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar liturgia:', error);
          this.loading = false;
        }
      });
    }
  }

  criarNota() {
    this.router.navigate(['/anotacoes'], {
      queryParams: {
        modo: 'criar',
        origem: 'liturgia',
        data: this.selectedDate.toISOString(),
        secao: this.activeSection
      }
    });
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }
}
