import { HttpHeaders } from '@angular/common/http';

export const IP = 'http://localhost:';
export const PORT = '8182';

export const JSON_HEADER = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
