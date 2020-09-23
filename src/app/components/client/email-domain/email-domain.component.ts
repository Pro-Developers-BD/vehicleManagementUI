import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from '../../../_services/client.service';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";

@Component({
  selector: 'app-email-domain',
  templateUrl: './email-domain.component.html',
  styleUrls: ['./email-domain.component.scss']
})
export class EmailDomainComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public domainList: any;
  public createdDate: Date;

  constructor(
    private clientService: ClientService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.clientService.getDomainList().subscribe(
      (data: any) => {
        this.domainList = data.content;
        this.createdDate = new Date();
        this.dtTrigger.next();
      }, (err) => {
        console.log('-----> err :', err);
      }
    );
  }
}
