import { NativeDateAdapter } from '@angular/material/core';

export class BrazilianDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const [day, month, year] = value.split('/');
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${this.padNumber(day)}/${this.padNumber(month)}/${year}`;
    }
    return date.toDateString();
  }

  private padNumber(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
} 