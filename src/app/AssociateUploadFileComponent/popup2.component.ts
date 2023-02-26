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
  formdata: FormGroup;
  // public listitems: Array<string> = [];
  // programCode: any;
  id: any;
  resp: any;
  code: string = '';


  setValue() {
    console.log(this.code);
  }
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    private submitSevice: SubmitService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    

    this.api.GetCompanybycode(this.data.id).subscribe((response) => {
      this.resp = response;
      this.formdata = this.builder.group({
        id: [this.resp.id],
        programCode: [this.resp.programCode],
        programStatus: [this.resp.programStatus, Validators.required],
      });
    });
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
  update(){
    console.log('formdata', this.formdata.valid);
  }
}
