import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {ClientService} from "../../../_services/client.service";
import {VehicleService} from "../../../_services/vehicle.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-car-company',
  templateUrl: './car-company.component.html',
  styleUrls: ['./car-company.component.scss']
})
export class CarCompanyComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public carCompanyList: any;

  constructor(
    private vehicleService: VehicleService,
    public httpClient: HttpClient
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

  deleteCompany(id) {
    const companyId = id;
    let endPoints = "/carCompany/";
    this.httpClient.delete(this.baseUrl + endPoints + companyId).subscribe(data => {
      console.log(data);
    });
  }

}
