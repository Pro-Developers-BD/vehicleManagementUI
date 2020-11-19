import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {VehicleService} from "../../../_services/vehicle.service";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.scss']
})
export class CarModelComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public carModelList: any;

  constructor(
    private vehicleService: VehicleService,
    public httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    this.vehicleService.getCarModelList().subscribe(
      (data: any) => {
        this.carModelList = data.content;
        console.log(this.carModelList);
        this.dtTrigger.next();
      }, (err) => {
        console.log('-----> err :', err);
      }
    );
  }

  deleteModel(id) {
    const modelId = id;
    let endPoints = "/carModel/";
    this.httpClient.delete(this.baseUrl + endPoints + modelId).subscribe(data => {
      console.log(data);
    });
  }

}
