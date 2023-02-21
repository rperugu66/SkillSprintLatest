import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { DatePipe } from '@angular/common';

//import * as moment from 'moment';
import { parse } from '@fortawesome/fontawesome-svg-core';
[DatePipe];
//[moment];
@Component({
  selector: 'app-editpopup',
  templateUrl: './editpopup.component.html',
  styleUrls: ['./editpopup.component.css'],
})
export class EditpopupComponent implements OnInit {
  editdata: any;
  public listitems: Array<string>;
  date: any;

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    private datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.item.id) {
      this.api.GetCompanybycode(this.data.id).subscribe((response) => {
        this.editdata = response;
      });
      this.editdata = this.data.item;
      this.companyform.setValue({
        id: this.editdata.id,
        vamid: this.editdata.vamid,
        resourceName: this.editdata.resourceName,
        manager: this.editdata.manager,
        email: this.editdata.email,
        techTrack: this.editdata.techTrack,
        startDate: this.editdata.startDate,
        endDate: this.editdata.endDate,
        sme: this.editdata.sme,
        //ProgramStatus: this.editdata.programStatus,
      });
      // this.companyform.controls.startDate.setValue(
      //   this.datepipe.transform(this.editdata.startDate, 'yyyy-MM-dd')
      // );
    }
    //console.log(this.editdata.startDate, 'dd-MM-yyyy');
  }

  companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    vamid: this.builder.control('', Validators.required),
    resourceName: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    manager: this.builder.control('', Validators.required),

    techTrack: this.builder.control('', Validators.required),
    startDate: this.builder.control('', Validators.required),
    endDate: this.builder.control('', Validators.required),
    sme: this.builder.control('', Validators.required),
    //ProgramStatus: this.builder.control('', Validators.required),
  });

  // SaveCompany() {
  //   if (this.companyform.valid) {
  //     const Editid = this.companyform.getRawValue().id;
  //     if (Editid != '' && Editid != null) {
  //       this.api
  //         .UpdateComapny(Editid, this.companyform.getRawValue())
  //         .subscribe((response) => {
  //           this.closepopup();
  //           alertify.success('Updated successfully.');
  //         });
  //     } else {
  //       this.api.CreateComapny(this.companyform.value).subscribe((response) => {
  //         this.closepopup();
  //         alertify.success('saved successfully.');
  //       });
  //     }
  //   }
  // }

  closepopup() {
    this.dialog.closeAll();
  }

  SaveData() {
    const Editid = this.companyform.getRawValue().id;
    if (Editid != '' && Editid != null) {
      this.api
        .UpdateComapny(Editid, this.companyform.getRawValue())
        .subscribe((response) => {
          this.closepopup();
          alertify.success('Updated successfully.');
        });
    }
  }
  //this.companyform.getRawValue()
  dropdown() {
    this.api.getProgramDropDown().subscribe((data: any[]) => {
      data.forEach((element) => {
        this.listitems.push(element['techtrack']);
      });
    });
  }
}
