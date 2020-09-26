import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {VehicleService} from '../../../_services/vehicle.service';

@Component({
  selector: 'app-car-grade',
  templateUrl: './car-grade.component.html',
  styleUrls: ['./car-grade.component.scss']
})
export class CarGradeComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public carGradeList: any;
  public createdDate: Date;

  constructor(
    private vehicleService: VehicleService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    this.vehicleService.getCarGradeList().subscribe(
      (data: any) => {
        this.carGradeList = data.content;
        this.createdDate = data.timeStamp;
        console.log(data);
        this.dtTrigger.next();
      }, (err) => {
        console.log('-----> err :', err);
      }
    );
  }
}
