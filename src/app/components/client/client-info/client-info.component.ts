import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from "../../../_services/client.service";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public clientList: any;

  constructor(
    private clientService: ClientService,
    public httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.clientService.getClientList().subscribe(
      (data: any) => {
        this.clientList = data.content;
        this.dtTrigger.next();
      }, (err) => {
        console.log('-----> err :', err);
      }
    );
  }

  deleteClientInfo(id) {
    const clientId = id;
    let endPoints = "/clients/";
    this.httpClient.delete(this.baseUrl + endPoints + clientId).subscribe(data => {
      console.log(data);
    });
  }

}
