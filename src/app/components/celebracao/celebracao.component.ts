import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { LiturgiaService } from '../../services/liturgia.service';
import { Liturgia } from '../../interfaces/liturgia.interface';
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
  selector: 'app-celebracao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
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
        <div class="toolbar">
          <button mat-icon-button (click)="voltarParaHome()" [attr.aria-label]="'Voltar para a página inicial'">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <span>Celebração da Palavra</span>
        </div>

        <mat-form-field appearance="outline" class="date-field">
          <mat-label>Escolher data</mat-label>
          <input matInput [matDatepicker]="picker" [value]="selectedDate" (dateChange)="onDateChange($event)" placeholder="DD/MM/AAAA">
          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <div class="loading-container" *ngIf="loading">
          <mat-spinner diameter="40"></mat-spinner>
        </div>

        <mat-card class="celebracao-card">
          <mat-card-content>
            <mat-accordion>
              <!-- Saudação e Introdução -->
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    Primícias Sacerdotais
                  </mat-panel-title>
                </mat-expansion-panel-header>
                <div class="texto">
                  <p>A Eucaristia é a celebração mais plena e mais apropriada do Dia do Senhor, mas a escassez de ministros ordenados leva muitas comunidades a se reunirem no domingo, encontrando no tesouro da tradição litúrgica a celebração da Palavra para alimento da sua fé. A Palavra é celebrada como evento pascal, pela ação íntima do Espírito Santo que a torna operante no coração dos fiéis.</p>

                  <p>De fato, quando nos reunimos como irmãos e irmãs, temos a oportunidade de renovar a nossa fé e esperança em Cristo Ressuscitado, e dessa forma, podemos levar a sua graça a todos aqueles que carecem dessa experiência de amor.</p>

                  <blockquote>
                    "Senhor, fazei de mim instrumento da vossa paz",<br>
                    como disse nosso querido São Francisco das Chagas,<br>
                    precisamos desejar ser esse instrumento de paz e amor a cada dia.
                  </blockquote>

                  <p>O presente subsídio é destinado a quem preside a celebração. Tomando como base o rito do domingo ou festa correspondente, deverá ser localizado no lecionário dominical ou na Bíblia as respectivas leituras.</p>

                  <p>Que essa alegria e o desejo de servir ao Senhor esteja sempre presente em suas vidas.</p>

                  <p class="assinatura">
                    <strong>Unidos em Cristo,<br>
                    Pe. Marcílio Gomes</strong>
                  </p>
                </div>
              </mat-expansion-panel>

              <!-- Ritos Iniciais -->
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    Ritos Iniciais
                  </mat-panel-title>
                </mat-expansion-panel-header>
                <div class="texto">
                  <h3>Saudação Inicial</h3>
                  <p><strong>M.:</strong> Em nome do Pai e do Filho e do Espírito Santo.</p>
                  <p><strong>T.:</strong> Amém.</p>

                  <p><strong>M.:</strong> Irmãos e irmãs, bendizei a Deus que em sua bondade nos convida para a mesa da Palavra e do Corpo de Cristo.</p>
                  <p><strong>T.:</strong> Bendito seja Deus para sempre.</p>

                  <h3>Ato Penitencial</h3>
                  <p><strong>M.:</strong> Irmãos e irmãs, reconheçamos os nossos pecados, para participarmos dignamente desta santa Celebração.</p>
                  <p><em>Após um momento de silêncio:</em></p>

                  <p><strong>Todos:</strong></p>
                  <blockquote>
                    Confesso a Deus todo-poderoso e a vós, irmãos e irmãs, que pequei muitas vezes, por pensamentos e palavras, atos e omissões,<br>
                    <em>[batendo no peito]</em> por minha culpa, minha culpa, minha tão grande culpa.<br>
                    E peço à Virgem Maria, aos anjos e santos e a vós, irmãos e irmãs, que rogueis por mim a Deus, nosso Senhor.
                  </blockquote>

                  <p><strong>M.:</strong> Deus todo-poderoso tenha compaixão de nós, perdoe os nossos pecados e nos conduza à vida eterna.</p>
                  <p><strong>T.:</strong> Amém.</p>

                  <p class="ou">OU:</p>

                  <p><strong>M.:</strong> Senhor, que viestes salvar os corações arrependidos, tende piedade de nós.</p>
                  <p><strong>T.:</strong> Senhor, tende piedade de nós.</p>
                  <p><strong>M.:</strong> Senhor, que viestes chamar os pecadores, tende piedade de nós.</p>
                  <p><strong>T.:</strong> Cristo, tende piedade de nós.</p>
                  <p><strong>M.:</strong> Senhor, que intercedeis por nós junto do Pai, tende piedade de nós.</p>
                  <p><strong>T.:</strong> Senhor, tende piedade de nós.</p>
                  <p><strong>M.:</strong> Deus todo-poderoso tenha compaixão de nós, perdoe os nossos pecados e nos conduza à vida eterna.</p>
                  <p><strong>T.:</strong> Amém.</p>

                  <h3>Hino do Glória (Domingos e Solenidades)</h3>
                  <p><strong>T.:</strong></p>
                  <blockquote>
                    Glória a Deus nas alturas, e paz na terra aos homens por Ele amados.<br>
                    Senhor Deus, Rei dos Céus, Deus Pai Todo-Poderoso, nós Vos louvamos,<br>
                    nós Vos bendizemos, nós Vos adoramos, nós Vos glorificamos,<br>
                    nós Vos damos graças, por Vossa imensa glória.<br>
                    Senhor Jesus Cristo, Filho Unigênito, Senhor Deus, Cordeiro de Deus, Filho de Deus Pai:<br>
                    Vós que tirais o pecado do mundo, tende piedade de nós;<br>
                    Vós que tirais o pecado do mundo, acolhei a nossa súplica;<br>
                    Vós que estais à direita do Pai, tende piedade de nós.<br>
                    Só Vós sois o Santo; só Vós, o Senhor; só Vós, o Altíssimo, Jesus Cristo;<br>
                    com o Espírito Santo, na glória de Deus Pai. Amém!
                  </blockquote>

                  <h3>Oração do Dia</h3>
                  <p><strong>M.:</strong> Oremos.</p>
                  <p *ngIf="liturgiaData"><em>{{ liturgiaData.dia }}</em></p>
                  <p><strong>T.:</strong> Amém.</p>

                  <h3>Invocação ao Espírito Santo</h3>
                  <p><strong>T.:</strong></p>
                  <blockquote>
                    Mandai o vosso Espírito Santo Paráclito aos nossos corações<br>
                    e fazei-nos compreender as Escrituras por ele inspiradas.
                  </blockquote>
                </div>
              </mat-expansion-panel>

              <!-- Rito da Palavra -->
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    Liturgia da Palavra
                  </mat-panel-title>
                </mat-expansion-panel-header>
                <div class="texto" *ngIf="liturgiaData">
                  <h3>{{ liturgiaData.data }}</h3>
                  <p class="liturgia-text">{{ liturgiaData.liturgia }}</p>
                  <p class="liturgia-text">Cor: {{ liturgiaData.cor }}</p>

                  <h3>Primeira Leitura</h3>
                  <p class="liturgia-text">{{ liturgiaData.primeiraLeitura.referencia }}</p>
                  <p class="liturgia-text">{{ liturgiaData.primeiraLeitura.titulo }}</p>
                  <p class="liturgia-text">{{ liturgiaData.primeiraLeitura.texto }}</p>
                  <p><strong>M.:</strong> Palavra do Senhor.</p>
                  <p><strong>T.:</strong> Graças a Deus.</p>

                  <h3>Salmo Responsorial</h3>
                  <p class="liturgia-text">{{ liturgiaData.salmo.referencia }}</p>
                  <p class="liturgia-text"><strong>Refrão:</strong> {{ liturgiaData.salmo.refrao }}</p>
                  <p class="liturgia-text">{{ liturgiaData.salmo.texto }}</p>

                  <ng-container *ngIf="liturgiaData.segundaLeitura">
                    <h3>Segunda Leitura</h3>
                    <p class="liturgia-text">{{ liturgiaData.segundaLeitura.referencia }}</p>
                    <p class="liturgia-text">{{ liturgiaData.segundaLeitura.titulo }}</p>
                    <p class="liturgia-text">{{ liturgiaData.segundaLeitura.texto }}</p>
                    <p><strong>M.:</strong> Palavra do Senhor.</p>
                    <p><strong>T.:</strong> Graças a Deus.</p>
                  </ng-container>

                  <h3>Aclamação ao Evangelho</h3>
                  <p><strong>T.:</strong> Aleluia, Aleluia, Aleluia.</p>

                  <h3>Evangelho</h3>
                  <p class="liturgia-text">{{ liturgiaData.evangelho.referencia }}</p>
                  <p class="liturgia-text">{{ liturgiaData.evangelho.titulo }}</p>
                  <p><strong>M.:</strong> O Senhor esteja convosco.</p>
                  <p><strong>T.:</strong> Ele está no meio de nós.</p>
                  <p><strong>M.:</strong> Proclamação do Evangelho de Jesus Cristo segundo {{ liturgiaData.evangelho.referencia.split(' ')[0] }}.</p>
                  <p><strong>T.:</strong> Glória a vós, Senhor.</p>
                  <p class="liturgia-text">{{ liturgiaData.evangelho.texto }}</p>
                  <p><strong>M.:</strong> Palavra da Salvação.</p>
                  <p><strong>T.:</strong> Glória a vós, Senhor.</p>

                  <h3>Partilha da Palavra</h3>
                  <p><em>Momento para reflexão e partilha da Palavra</em></p>

                  <h3>Profissão de Fé</h3>
                  <p><strong>T.:</strong></p>
                  <blockquote>
                    Creio em Deus Pai todo-poderoso, criador do céu e da terra.<br>
                    E em Jesus Cristo, seu único Filho, nosso Senhor,<br>
                    que foi concebido pelo poder do Espírito Santo;<br>
                    nasceu da Virgem Maria; padeceu sob Pôncio Pilatos,<br>
                    foi crucificado, morto e sepultado.<br>
                    Desceu à mansão dos mortos; ressuscitou ao terceiro dia,<br>
                    subiu aos céus; está sentado à direita de Deus Pai todo-poderoso,<br>
                    donde há de vir a julgar os vivos e os mortos.<br>
                    Creio no Espírito Santo; na Santa Igreja católica;<br>
                    na comunhão dos santos; na remissão dos pecados;<br>
                    na ressurreição da carne; na vida eterna. Amém.
                  </blockquote>

                  <h3>Oração dos Fiéis</h3>
                  <p><em>Preces dos fiéis</em></p>
                </div>
              </mat-expansion-panel>

              <!-- Rito da Comunhão -->
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    Rito da Comunhão
                  </mat-panel-title>
                </mat-expansion-panel-header>
                <div class="texto">
                  <p><strong>M.:</strong> Essa partilha de dons e talentos diante de vós, ó Deus, sirva à missão de vossa Igreja, ao amor e à comunhão entre nós. Por Cristo, Nosso Senhor.</p>
                  <p><strong>T.:</strong> Amém.</p>

                  <h3>Louvor e Ação de Graças</h3>
                  <p>Pode-se utilizar:</p>
                  <ul>
                    <li>Salmos</li>
                    <li>Hinos</li>
                    <li>Cânticos</li>
                    <li>Orações em forma de ladainha</li>
                    <li>Louvações</li>
                    <li>Outras expressões orantes</li>
                    <li><em><strong>Não deve ter a forma da Oração Eucarística.</strong></em></li>
                  </ul>

                  <p><strong>M.:</strong> Irmãos e irmãs, proclamemos a bondade de Deus e exaltemos a sua misericórdia, manifestada nas palavras de salvação que escutamos.</p>

                  <h4>Sugestão:</h4>
                  <h3>Louvação das Escrituras (Reginaldo Veloso - Paulinas-COMEP)</h3>
                  <blockquote>
                    É bom cantar um bendito<br>
                    Um canto novo, um louvor!<br>
                    Ao Pai, Criador do universo<br>
                    Por Cristo, Verbo de amor!<br>
                    Ao Deus que, por sua Palavra<br>
                    Os seres todos chamou!<br>
                    Das Escrituras bebendo<br>
                    Exulta o povo em louvor!
                  </blockquote>

                  <p><em>Ministro extraordinário traz a âmbula com o Santíssimo e a coloca no altar.<br>
                  Faz-se genuflexão.</em></p>

                  <p><strong>M.:</strong> Rezemos com amor e confiança a oração que o Senhor nos ensinou:</p>
                  <p><strong>Pai Nosso</strong></p>

                  <h3>Saudação da Paz</h3>
                  <p><strong>M.:</strong> Irmãos e irmãs, saudemo-nos com a paz de Cristo Jesus.</p>
                  <p><em>(Todos trocam o gesto de paz)</em></p>

                  <p><strong>M.:</strong> Felizes os convidados para a Ceia do Senhor! Eis o Cordeiro de Deus que tira o pecado do mundo.</p>
                  <p><strong>T.:</strong> Senhor, eu não sou digno(a) de que entreis em minha morada, mas dizei uma palavra e serei salvo(a).</p>

                  <p><em>Se o ministro comungar:</em></p>
                  <blockquote>Que o Corpo de Cristo me guarde para a vida eterna.</blockquote>

                  <p><em>Após distribuir a comunhão:</em></p>
                  <p><strong>M.:</strong> Oremos. Senhor Jesus Cristo, neste admirável sacramento, nos deixastes o memorial da vossa paixão. Dai-nos venerar com tão grande amor o mistério do vosso Corpo e do vosso Sangue, que possamos colher continuamente os frutos da vossa redenção.</p>
                  <p><strong>T.:</strong> Amém.</p>
                </div>
              </mat-expansion-panel>

              <!-- Rito Final -->
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    Rito Final
                  </mat-panel-title>
                </mat-expansion-panel-header>
                <div class="texto">
                  <h3>Oração Vocacional (opcional)</h3>
                  <blockquote>
                    Senhor da messe e pastor do rebanho. Fazei ressoar em nossos ouvidos vosso forte e suave convite:<br>
                    "vem e segue-me!".<br>
                    Derramai sobre nós o vosso Espírito;<br>
                    que Ele nos dê sabedoria para ver o caminho e generosidade para seguir a vossa voz.<br>
                    Despertai nossas comunidades para a missão.<br>
                    Ensinai nossa vida a ser serviço.<br>
                    Fortalecei os que querem dedicar-se ao Reino, na vida consagrada e religiosa.<br>
                    Sustentai a fidelidade de nossos bispos, padres, diáconos e ministros.<br>
                    Dai perseverança a nossos seminaristas.<br>
                    Despertai o coração de nossos jovens para o ministério pastoral em vossa Igreja.<br>
                    Senhor, chamai-nos para o serviço do vosso povo.<br>
                    Maria Mãe da Igreja, modelo dos servidores do Evangelho, ajudai-nos a responder sim. Amém.
                  </blockquote>

                  <h3>Avisos, Bênção e Despedida</h3>
                  <p><strong>M.:</strong> Supliquemos a benção de Deus.</p>
                  <p><em>Traçando o sinal da cruz:</em></p>
                  <blockquote>
                    O Senhor todo-poderoso e cheio de misericórdia, Pai e Filho + e Espírito Santo nos abençoe e nos guarde.
                  </blockquote>
                  <p><strong>T.:</strong> Amém.</p>

                  <p><strong>M.:</strong> Ide em paz e o Senhor vos acompanhe.</p>
                  <p><strong>T.:</strong> Graças a Deus.</p>
                </div>
              </mat-expansion-panel>
            </mat-accordion>
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

    .toolbar {
      display: flex;
      align-items: center;
      padding: 8px;
      gap: 8px;
      margin-bottom: 1rem;
    }

    .date-field {
      width: 100%;
      margin-bottom: 1rem;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 2rem;
    }

    .celebracao-card {
      margin-bottom: 2rem;
    }

    mat-card-content {
      padding: 1rem;
    }

    .secao {
      margin-bottom: 2rem;
    }

    mat-expansion-panel {
      margin-bottom: 1rem;
      background-color: white;
    }

    mat-expansion-panel-header {
      height: auto !important;
      padding: 1rem !important;
    }

    mat-panel-title {
      color: #3f51b5;
      font-size: 1.2rem;
      font-weight: 500;
    }

    h3 {
      color: #3f51b5;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
      font-weight: 500;
    }

    h4 {
      color: #3f51b5;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
      font-weight: 500;
    }

    .texto {
      line-height: 1.6;
      color: rgba(0, 0, 0, 0.87);
      white-space: pre-wrap;
      padding: 1rem 0;
    }

    .texto p {
      margin-bottom: 1rem;
    }

    blockquote {
      margin: 1rem 0;
      padding: 1rem;
      background-color: #f8f9fa;
      border-left: 4px solid #3f51b5;
      font-style: italic;
    }

    ul {
      margin: 1rem 0;
      padding-left: 2rem;
    }

    .assinatura {
      text-align: right;
      margin-top: 2rem;
    }

    .ou {
      text-align: center;
      font-weight: bold;
      margin: 1rem 0;
    }

    strong {
      font-weight: 500;
    }

    .liturgia-text {
      margin-bottom: 1rem;
      line-height: 1.6;
      color: rgba(0, 0, 0, 0.87);
      white-space: pre-wrap;
    }

    @media (max-width: 600px) {
      .content {
        padding: 1rem 0.5rem;
      }
    }
  `]
})
export class CelebracaoComponent implements OnInit {
  selectedDate = new Date();
  liturgiaData: Liturgia | null = null;
  loading = false;

  constructor(
    private router: Router,
    private liturgiaService: LiturgiaService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.fetchLiturgiaData(
      this.selectedDate.getDate(),
      this.selectedDate.getMonth() + 1,
      this.selectedDate.getFullYear()
    );
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

  voltarParaHome() {
    this.router.navigate(['/home']);
  }
}
