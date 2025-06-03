import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { BibliaComponent } from './components/biblia/biblia.component';
import { AnotacoesComponent } from './components/anotacoes/anotacoes.component';
import { VisualizarAnotacaoComponent } from './components/anotacoes/visualizar-anotacao/visualizar-anotacao.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'biblia', component: BibliaComponent },
  { path: 'anotacoes', component: AnotacoesComponent },
  { path: 'anotacoes/visualizar/:id', component: VisualizarAnotacaoComponent }
];
