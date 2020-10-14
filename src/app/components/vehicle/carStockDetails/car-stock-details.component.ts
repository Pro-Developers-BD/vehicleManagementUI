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
  public allCompany: any =[];
  public allModel: any =[];

  constructor(
    private vehicleService: VehicleService,
    public httpClient: HttpClient
  ) {
  }

  ngOnInit(): any {
    this.loadData();
  }

  loadData(): void {
    this.vehicleService.getCarStockInfoList().subscribe(
      (data: any) => {
        this.carStockDetailsList = data.content;
        console.log(this.carStockDetailsList);
        this.getCompanyName();
        this.getModelName();
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


  public getCompanyName() {
    for (let x in this.carStockDetailsList) {
      const companyId = this.carStockDetailsList[x].carCompanyId;
      this.vehicleService.carCompanyById(companyId).subscribe((res):any=>{
        this.allCompany.push(res.content);
      });
    }
  }
  public getModelName() {
    for (let x in this.carStockDetailsList) {
      const modelId = this.carStockDetailsList[x].carModelId;
      this.vehicleService.carModelById(modelId).subscribe((res):any=>{
        this.allModel.push(res.content);
      });
    }
  }
}
