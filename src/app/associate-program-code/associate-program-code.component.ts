// import { Component, OnInit } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { companymodel } from '../Model/companymodel';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { DatePipe } from '@angular/common';
import { parse } from '@fortawesome/fontawesome-svg-core';



@Component({
  selector: 'app-associate-program-code',
  templateUrl: './associate-program-code.component.html',
  styleUrls: ['./associate-program-code.component.css'],
})
export class AssociateProgramCodeComponent implements OnInit {
  formdata: FormGroup;
  coderesp: any;
  //import("c:/Users/rupeshp/Angular/codeexer-master/codeexer-master/src/app/Model/companymodel").companymodel[];

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    private datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // if (this.data.item.id) 
    {
      this.api.GetCompanybycode(1).subscribe((response) => {
        this.coderesp = response;
        this.formdata = this.builder.group({
          id: [this.coderesp.id],
          programCode: [this.coderesp.programCode],
          programStatus: [this.coderesp.programStatus, Validators.required],
        });
      });
    }
  }
  closepopup() {
    this.dialog.closeAll();
  }
  onSubmit() {
    let data = this.formdata.value;
    this.api
      .UpdateProgramCode(this.data.id, this.formdata.value)
      .subscribe((response) => {
        this.closepopup();
        alertify.success('Updated successfully.');
      });
  }
}
