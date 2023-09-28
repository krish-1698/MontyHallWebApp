import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MontyHallService {

  private baseUrl = 'https://localhost:7195/api/montyHall'; 

  constructor(private http: HttpClient) { }

  simulateMontyHall(numberOfSimulations: number, shouldSwitch: boolean): Observable<any> {
    const url = `${this.baseUrl}/simulate?numberOfSimulations=${numberOfSimulations}&shouldSwitch=${shouldSwitch}`;
    return this.http.get(url);
  }
}
