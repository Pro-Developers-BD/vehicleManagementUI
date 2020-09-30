import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {ClientService} from "../../../_services/client.service";
import {VehicleService} from "../../../_services/vehicle.service";

@Component({
  selector: 'app-car-company',
  templateUrl: './car-company.component.html',
  styleUrls: ['./car-company.component.scss']
})
export class CarCompanyComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public carCompanyList: any;

  constructor(
    private vehicleService: VehicleService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    this.vehicleService.getCarCompanyList().subscribe(
      (data: any) => {
        this.carCompanyList = data.content;
        console.log(this.carCompanyList);
        this.dtTrigger.next();
      }, (err) => {
        console.log('-----> err :', err);
      }
    );
  }

}
