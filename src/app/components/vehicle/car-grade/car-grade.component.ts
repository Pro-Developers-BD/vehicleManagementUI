import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {VehicleService} from '../../../_services/vehicle.service';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-car-grade',
  templateUrl: './car-grade.component.html',
  styleUrls: ['./car-grade.component.scss']
})
export class CarGradeComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public carGradeList: any;

  constructor(
    private vehicleService: VehicleService,
    public httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    this.vehicleService.getCarGradeList().subscribe(
      (data: any) => {
        this.carGradeList = data.content;
        console.log(data);
        this.dtTrigger.next();
      }, (err) => {
        console.log('-----> err :', err);
      }
    );
  }

  deleteGrade(id) {
    const gradeId = id;
    let endPoints = "/carGrades/";
    this.httpClient.delete(this.baseUrl + endPoints + gradeId).subscribe(data => {
      console.log(data);
    });
  }
}
