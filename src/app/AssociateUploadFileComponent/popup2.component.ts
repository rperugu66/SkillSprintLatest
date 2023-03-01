import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { SubmitService } from '../submit.service';

@Component({
  selector: 'app-popup2',
  templateUrl: './popup2.component.html',
  styleUrls: ['./popup2.component.css'],
})
export class Popup2Component implements OnInit {
[x: string]: any;
  formdata: FormGroup;
  // public listitems: Array<string> = [];
  // programCode: any;
  id: any;
  historyId: any;
  resp: any;
  code: string = '';
  editdata: any;
  datepipe: any;


  setValue() {
    console.log(this.code);
  }
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    private submitSevice: SubmitService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {


  // if (this.data.item.id) {
  //  this.api.GetCompanybycode(this.data.item.historyId).subscribe((response) => {
  //    this.resp = response;
  //    if (this.resp != null) {
  //      this.formdata = this.builder.group({
  //        id: [this.resp.id, Validators.required],
  //        historyId: [this.resp.historyId],
  //        vamid: [this.resp.vamid, Validators.required],
  //        resourceName: [this.resp.resourceName, Validators.required],
  //        email: [this.resp.email, Validators.required],
  //        manager: [this.resp.manager, Validators.required],
  //        techTrack: [this.resp.techTrack, Validators.required],
  //        startDate: [
  //          this.datepipe.transform(this.resp.startDate, 'yyyy-MM-dd'),
  //          Validators.required,
  //        ],
  //        endDate: [
  //          this.datepipe.transform(this.resp.endDate, 'yyyy-MM-dd'),
  //          Validators.required,
  //        ],
  //        sme: [this.resp.sme, Validators.required],
  //        category: [this.resp.programsTracker.category],
  //        program: [this.resp.programsTracker.program],
  //        smeStatus: [this.resp.smeStatus],
  //        programStatus: [this.resp.programStatus],
  //        programCode: [this.resp.programCode],
  //      });
  //    }
  //  });

  // }

    this.api
      .GetCompanybycode(this.data.item.historyId)
      .subscribe((response) => {
        this.resp = response;
        this.formdata = this.builder.group({
          historyId: [this.resp.historyId],
          programStatus: [this.resp.programStatus],
          programCode: [this.resp.programCode]

          // smeStatus: [this.resp.smeStatus, Validators.required],
        });
      });
  }

  closepopup() {
    this.dialog.closeAll();
  }

  onSubmit() {
 
    let data =  this.formdata.value;
      this.api
        .UpdateProgramCode(this.data.item.historyId, data)
        .subscribe((response) => {
         
          console.log(data);
          this.closepopup();
          alertify.success('Updated successfully.');
        });
    }

    // const Editid = this.editdata.getRawValue().historyId;
    // if (Editid != '' && Editid != null) {
    //   var data = JSON.stringify(this.editdata.value);
    //   this.api
    //     .UpdateProgramCode(Editid, data)
    //     .subscribe((response) => {
          // let x = this.editdata.controls.startDate.getRawValue();
          // this.companyform.patchValue({ startDate: x });
          // this.companyform.controls.startDate.setValue(x);
          // console.log(x);
        //   this.closepopup();
        //   alertify.success('Updated successfully.');
        // });
    }

  