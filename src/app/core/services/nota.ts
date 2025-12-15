import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { INota } from '../models/nota.model';

@Injectable({
  providedIn: 'root',
})
export class Nota {
   http = inject(HttpClient)
  URI = environment.apiUrl + '/grades'

  obtenerNotas() {
    return this.http.get(this.URI, { withCredentials: true }).pipe(
      map((resp: any) => {
        console.log('Lista notas', resp);
        return resp
      }),
      catchError((error: any) => {
        return throwError(() => error)
      })
    )}

   createNota(nota: INota): Observable<any> {
  return this.http.post(this.URI, nota, { withCredentials: true }).pipe(
    map((resp: any) => {
      console.log('Nota creada', resp);
      return resp;
    }),
    catchError((error: any) => {
      console.error('Error creando nota', error);
      return throwError(() => error);
    })
  );
}
}
