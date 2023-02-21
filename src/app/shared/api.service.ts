import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { companymodel } from '../Model/companymodel';
import { techtracks } from '../Model/techtracks';
import { userInfo } from '../Model/userInfomodel';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getEndDateApi(startDate: Date) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}
  apiurl = 'https://localhost:7260/api/Assign';

  Getallcomapny(): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(this.apiurl);
  }

  GetCompanybycode(id: number): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(
      'https://localhost:7260/api/Assign/GetResourceHistoryById' + '/' + id
    );
    //return this.http.get<companymodel[]>(this.apiurl+'/GetResourceHistoryById'+'/'+id);
    //https://localhost:7260/api/Assign

    //return this.http.get<companymodel[]>('https://localhost:7260/api/Assign/GetResourceHistoryById/'+id);
  }

  RemoveCompanybycode(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  CreateComapny(companyform: any) {
    return this.http.post('https://localhost:7260/api/Assign', companyform);
  }

  UpdateComapny(id: any, companydata: any) {
    return this.http.put(this.apiurl + '/' + id, companydata);
  }

  getProgramDropDown(): Observable<any> {
    return this.http.get<techtracks[]>(
      'https://localhost:7260/api/ProgramTracker/GetTechTracks'
    );
  }
  getUserInfo(vamid: any): Observable<any> {
    return this.http.get<userInfo[]>(
      'https://localhost:7260/api/UserInfo/' + vamid
    );
  }

  getendDateApi(startDate: any): Observable<any> {
    return this.http.get<[]>(
      'https://localhost:7260/api/VAMHoliday?startDate=' + startDate
    );
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:7260/api/Employees');
  }
  CreateUser(userModel: any) {
    return this.http.post('https://localhost:7260/api/Employees', userModel);
  }
}
