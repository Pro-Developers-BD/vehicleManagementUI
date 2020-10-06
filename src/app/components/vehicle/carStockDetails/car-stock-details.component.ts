import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {VehicleService} from "../../../_services/vehicle.service";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-car-stock-details',
  templateUrl: './car-stock-details.component.html',
  styleUrls: ['./car-stock-details.component.scss']
})
export class CarStockDetailsComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  carStockDetailsList: any;

  constructor(
    private vehicleService: VehicleService,
    public httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.vehicleService.getCarStockInfoList().subscribe(
      (data: any) => {
        this.carStockDetailsList = data.content;
        console.log(this.carStockDetailsList);
        this.dtTrigger.next();
      }, (err) => {
        console.log('-----> err :', err);
      }
    );
  }

  deleteStock(id) {
    const stockId = id;
    let endPoints = "/carStock/";
    this.httpClient.delete(this.baseUrl + endPoints + stockId).subscribe(data => {
      console.log(data);
    });
  }


}
