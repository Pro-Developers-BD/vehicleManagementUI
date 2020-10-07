import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from '../../../../_services/vehicle.service';

@Component({
  selector: 'app-car-model-save',
  templateUrl: './car-model-save.component.html',
  styleUrls: ['./car-model-save.component.scss']
})
export class CarModelSaveComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  submitted = false;
  public pageTitle: string;
  public carModelForm: FormGroup;
  public result: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  gradeList: any;
  public checked: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    public httpClient: HttpClient
  ) {
    this.carModelForm = this.formBuilder.group({
      id: '',
      carModelName: ['', Validators.required],
      carGradeList: new FormControl([])
    });
  }

  ngOnInit(): any {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Car Brand';
      this.vehicleService.carModelById(parseInt(id)).subscribe(
        (res: any) => {
          this.carModelForm.patchValue({
            id: res.content.id,
            carModelName: res.content.carModelName,
            carGradeList: res.content.carGradeList
          });
          this.result = res;
          for (let key in res.content.carGradeList) {
            if(res.content.carGradeList[key].gradeName != ''){
              this.checked=true;
            }else{
              this.checked=false;
            }
          }
        }
      );
    } else {
      this.pageTitle = 'Create Car Brand';
    }
    this.getCarGrades();
  }

  uploadSubmit(): void {
    this.submitted = true;
    if (this.carModelForm.valid) {
      const modelForm = this.carModelForm.getRawValue();
      const serialForm = JSON.stringify(modelForm);
      console.log(serialForm);
      this.httpClient.post(this.baseUrl + '/carModel', serialForm, this.httpOptions).subscribe((res): any => {
        if (res) {
          this.router.navigate(['carModel/list']);
        }
      });
    }
  }

  getCarGrades(): any {
    this.vehicleService.getCarGradeList().subscribe(
      (models): any => {
        this.gradeList = models.content;
        console.log(this.gradeList);
      });
  }

  getGradeDataByModel(e, data) {
    if (e.target.checked) {
      this.carModelForm.controls.carGradeList.value.push(data);
    } else {
      const index = this.carModelForm.controls.carGradeList.value.indexOf(data);
      this.carModelForm.controls.carGradeList.value.splice(index, 1);
    }
    console.log(this.carModelForm.controls.carGradeList.value);
  }

  get modelName() {
    return this.carModelForm.get('carModelName');
  }
}
