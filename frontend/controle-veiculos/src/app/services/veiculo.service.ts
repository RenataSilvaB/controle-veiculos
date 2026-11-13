import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private apiUrl = 'http://localhost:3000/veiculos';

  constructor(private http: HttpClient) {}

listarVeiculos(): Observable<Veiculo[]> {
  return this.http.get<Veiculo[]>(this.apiUrl);
}

cadastrarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
  return this.http.post<Veiculo>(this.apiUrl, veiculo);
}

atualizarVeiculo(id: number, veiculo: Veiculo): Observable<Veiculo> {
  return this.http.put<Veiculo>(`${this.apiUrl}/${id}`, veiculo);
}

excluirVeiculo(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}


}
