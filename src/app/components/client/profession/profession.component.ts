import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from '../../../_services/client.service';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.scss']
})
export class ProfessionComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public professionList: any;

  constructor(
    private clientService: ClientService,
    public httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.clientService.getProfessionList().subscribe(
      (data: any) => {
        this.professionList = data.content;
        console.log(this.professionList);
        this.dtTrigger.next();
      }, (err) => {
        console.log('-----> err :', err);
      }
    );
  }

  deleteProfession(id) {
    const professionId = id;
    let endPoints = "/professions/";
    this.httpClient.delete(this.baseUrl + endPoints + professionId).subscribe(data => {
      console.log(data);
    });
  }
}
