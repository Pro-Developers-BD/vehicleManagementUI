import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../_services/client.service';

@Component({
  selector: 'app-email-domain',
  templateUrl: './email-domain.component.html',
  styleUrls: ['./email-domain.component.scss']
})
export class EmailDomainComponent implements OnInit {

  public domainList: any;
  public createdDate: Date;

  constructor(
    private clientService: ClientService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    this.clientService.getDomainList().subscribe(
      (data: any) => {
        this.domainList = data.content;
        this.createdDate = new Date();
      }
    );
  }
}
