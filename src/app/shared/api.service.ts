import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  apiurl = 'https://programsautoassign.azurewebsites.net/api/Assign';

  Getallcomapny(): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(
      'https://programsautoassign.azurewebsites.net/api/Assign'
    );
  }

  GetAllHistoryRecordsById(id: number): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(
      'https://programsautoassign.azurewebsites.net/api/Assign/GetResourceHistoryById' +
        '/' +
        id
    );
  }

  GetUserByEmail(email: string): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(
      'https://programsautoassign.azurewebsites.net/api/Assign/GetResourceByEmail' +
        '/' +
        email
    );
  }

  GetCompanybycode(id: number): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(
      'https://programsautoassign.azurewebsites.net/api/Assign/GetResourceHistorySingleById' +
        '/' +
        id
    );
  }

  GetCompanybyId(id: number): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(
      'https://programsautoassign.azurewebsites.net/api/Assign' + '/' + id
    );
  }
  //id: number;
  GetUserData(id: number): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(
      'https://programsautoassign.azurewebsites.net/api/Assign/GetResourceHistoryById' +
        '/' +
        id

      //return this.http.get<companymodel[]>(this.apiurl+'/GetResourceHistoryById'+'/'+id);
      // 'https://localhost:7260/api/Assign'
    );
    //return this.http.get<companymodel[]>('https://localhost:7260/api/Assign/GetResourceHistoryById/'+id);
  }

  RemoveCompanybycode(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  CreateComapny(companyform: any) {
    return this.http.post(
      'https://programsautoassign.azurewebsites.net/api/Assign',
      companyform
    );
  }

  UpdateComapny(id: any, companydata: any) {
    let data = companydata;

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.put(
      'https://programsautoassign.azurewebsites.net/api/Assign/UpdateResourceHistory' +
        '/' +
        id,
      companydata,
      { headers: headers }
    );
  }

  UpdateProgramCode(id: any, code: any) {
    let data = code;

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.put(
      'https://programsautoassign.azurewebsites.net/api/Assign/UpdateResourceHistoryCode' +
        '/' +
        id,
      code,
      { headers: headers }
    );
  }
  GetProgramCode(id: any) {
    return this.http.get(
      'https://programsautoassign.azurewebsites.net/api/Assign/GetResourceHistorySingleById' +
        '/' +
        id
    );
  }
  UpdateComments(id: any, comments: any) {
    let data = comments;

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.put(
      'https://programsautoassign.azurewebsites.net/api/Assign/UpdateResourceHistoryCode' +
        '/' +
        id,
      comments,
      { headers: headers }
    );
  }

  getProgramDropDown(): Observable<any> {
    return this.http.get<techtracks[]>(
      'https://programsautoassign.azurewebsites.net/api/ProgramTracker/GetTechTracks'
    );
  }
  getUserInfo(vamid: any): Observable<any> {
    return this.http.get<userInfo[]>(
      'https://programsautoassign.azurewebsites.net/api/UserInfo/' +
        vamid
    );
  }

  getendDateApi(startDate: any): Observable<any> {
    return this.http.get<[]>(
      'https://programsautoassign.azurewebsites.net/api/VAMHoliday?startDate=' +
        startDate
    );
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      'https://programsautoassign.azurewebsites.net/api/Employees'
    );
  }
  CreateUser(userModel: any) {
    return this.http.post(
      'https://programsautoassign.azurewebsites.net/api/Employees',
      userModel
    );
  }
}
