import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from '../../../../_services/vehicle.service';

@Component({
  selector: 'app-car-grade-save',
  templateUrl: './car-grade-save.component.html',
  styleUrls: ['./car-grade-save.component.scss']
})
export class CarGradeSaveComponent implements OnInit {
  submitted = false;
  public pageTitle: string;
  public carGradeForm: FormGroup;

  public result: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
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
      const data = new FormData();
      data.append('id', this.carGradeForm.controls.id.value);
      data.append('gradeName', this.carGradeForm.controls.gradeName.value);
      this.vehicleService.saveCarGrade(data).subscribe(
        res => {
          if (res.status === 'Created') {
            this.router.navigate(['carGrade/list']);
          }
        });
    }
  }

  get gradeName() {
    return this.carGradeForm.get('gradeName');
  }
}
