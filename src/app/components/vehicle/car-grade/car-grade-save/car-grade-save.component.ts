import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from '../../../../_services/vehicle.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-car-grade-save',
  templateUrl: './car-grade-save.component.html',
  styleUrls: ['./car-grade-save.component.scss']
})
export class CarGradeSaveComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  submitted = false;
  public pageTitle: string;
  public carGradeForm: FormGroup;
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
    this.carGradeForm = this.formBuilder.group({
      id: '',
      gradeName: ['', Validators.required],
    });
  }

  ngOnInit(): any {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Car Grade';
      this.vehicleService.getCarGardeById(parseInt(id)).subscribe(
        (res: any) => {
          this.carGradeForm.patchValue({
            id: res.content.id,
            gradeName: res.content.gradeName,
          });
          this.result = res;
          console.log(this.result);
        }
      );
    } else {
      this.pageTitle = 'Create Car Grade';
    }
  }

  uploadSubmit(): void {
    this.submitted = true;
    if (this.carGradeForm.valid) {
      const gradeForm = this.carGradeForm.getRawValue();
      const serialForm = JSON.stringify(gradeForm);
      console.log(serialForm);
      this.httpClient.post(this.baseUrl + '/carGrades', serialForm, this.httpOptions).subscribe((res): any => {
        if (res) {
          this.router.navigate(['carGrade/list']);
        }
      });
    }
  }

  get gradeName() {
    return this.carGradeForm.get('gradeName');
  }
}
