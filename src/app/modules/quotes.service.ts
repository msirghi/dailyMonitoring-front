import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuotesService {
  constructor(private http: HttpClient) {
  }

  getQuotes() {
    return this.http.get('https://type.fit/api/quotes');
  }

}
