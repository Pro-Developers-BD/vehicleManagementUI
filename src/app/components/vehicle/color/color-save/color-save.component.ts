import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {VehicleService} from "../../../../_services/vehicle.service";

@Component({
  selector: 'app-color-save',
  templateUrl: './color-save.component.html',
  styleUrls: ['./color-save.component.scss']
})
export class ColorSaveComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  submitted = false;
  public pageTitle: string;
  public colorForm: FormGroup;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  public result: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    public httpClient: HttpClient
  ) {
    this.colorForm = this.formBuilder.group({
      id: '',
      colorName: ['', Validators.required],
    });
  }

  ngOnInit(): any {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Color Name';
      this.vehicleService.getColorById(parseInt(id)).subscribe(
        (res: any) => {
          this.colorForm.patchValue({
            id: res.content.id,
            colorName: res.content.colorName,
          });
          this.result = res;
          console.log(this.result);
        }
      );
    } else {
      this.pageTitle = 'Add Car Color';
    }
  }

  uploadSubmit(): void {
    this.submitted = true;
    if (this.colorForm.valid) {
      const gradeForm = this.colorForm.getRawValue();
      const serialForm = JSON.stringify(gradeForm);
      console.log(serialForm);
      this.httpClient.post(this.baseUrl + '/colors', serialForm, this.httpOptions).subscribe((res): any => {
        if (res) {
          this.router.navigate(['color/list']);
        }
      });
    }
  }

  get colorName() {
    return this.colorForm.get('colorName');
  }

}
