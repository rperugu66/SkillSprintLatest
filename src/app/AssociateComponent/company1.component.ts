import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { companymodel } from '../Model/companymodel';
import { Popup2Component } from '../AssociateUploadFileComponent/popup2.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { SubmitService } from '../submit.service';
import { Router } from '@angular/router';
import { AssociateProgramCodeComponent } from '../associate-program-code/associate-program-code.component';

@Component({
  selector: 'app-company1',
  templateUrl: './company1.component.html',
  styleUrls: ['./company1.component.css'],
})
export class Company1Component implements OnInit {
  faHome = faHome;
  isSubmitted: boolean = false;
  companyform: any;
  // finaldataUpdated: MatTableDataSource<companymodel>;
  // varLoginUser: any;
  currentLogInVamId:any;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    public submitService: SubmitService,
    private router: Router
  ) {
    this.currentLogInVamId = this.router.getCurrentNavigation()?.extras.state;
  }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  companydata!: companymodel[];
  finaldata: any;

  ngOnInit(): void {
    this.LoadCompany();
  }

  displayColums: string[] = [
    'id',
    // 'HistoryId',
    'techTrack',
    // 'Category',
    'program',
    'startDate',
    'endDate',
    'Delaydays',
    'sme',
    'smeStatus',
    'upload',
    'comments',
    // 'SMEComments',
  ];
  SaveCompany() {
    this.isSubmitted = true;
    if (this.companyform.valid) {
      const Editid = this.companyform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api
          .UpdateComapny(Editid, this.companyform.getRawValue())
          .subscribe((response) => {
            this.closepopup();
            alertify.success('Updated successfully.');
          });
      } else {
        this.api.CreateComapny(this.companyform.value).subscribe((response) => {
          this.closepopup();
          alertify.success('saved successfully.');
        });
      }
    }
  }
  closepopup() {
    throw new Error('Method not implemented.');
  }
  Openpopup(id: any) {
    const _popup = this.dialog.open(Popup2Component, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id,
      },
    });
    _popup.afterClosed().subscribe((r) => {
      this.LoadCompany();
    });
  }

  LoadCompany() {
    this.api.GetAllHistoryRecordsById(this.currentLogInVamId.userid).subscribe((response) => {
      this.companydata = response;
      //this.finaldata = new MatTableDataSource<companymodel>(this.companydata);
      // this.finaldata.paginator = this._paginator;
      // this.finaldata.sort = this._sort;
      var finaldata = this.companydata.filter(
        (item: any) => item.vamid === this.currentLogInVamId.vamid
      );
      this.finaldata = new MatTableDataSource<companymodel>(finaldata);
      this.finaldata.paginator = this._paginator;
      this.finaldata.sort = this._sort;
    });
  }

  EditCompany(id: any) {
    this.Openpopup(id);
  }
  RemoveCompany(id: any) {
    alertify.confirm(
      'Remove Assignment',
      'do you want delete the assignment?',
      () => {
        this.api.RemoveCompanybycode(id).subscribe((r) => {
          this.LoadCompany();
        });
      },
      function () {}
    );
  }
}
