import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(window.matchMedia('(prefers-color-scheme: dark)').matches);
  isDarkMode$ = this.isDarkMode.asObservable();

  constructor() {
    // Observa mudanças no tema do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.isDarkMode.next(e.matches);
    });
  }

  toggleTheme() {
    this.isDarkMode.next(!this.isDarkMode.value);
  }

  getTheme() {
    return {
      primary: this.isDarkMode.value ? '#bb86fc' : '#6200ee',
      background: this.isDarkMode.value ? '#121212' : '#ffffff',
      surface: this.isDarkMode.value ? '#1e1e1e' : '#ffffff',
      textPrimary: this.isDarkMode.value ? '#ffffff' : '#000000',
      textSecondary: this.isDarkMode.value ? '#b3b3b3' : '#666666',
      danger: '#cf6679'
    };
  }
} 