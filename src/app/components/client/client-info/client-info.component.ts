import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../../_services/client.service";

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {
  private createdDate: Date;
  public clientList: any;
  constructor(
    private clientService: ClientService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    this.clientService.getClientList().subscribe(
      (data: any) => {
        this.clientList = data.content;
        this.createdDate = new Date();
        console.log(this.clientList);
      }
    );
  }

}
