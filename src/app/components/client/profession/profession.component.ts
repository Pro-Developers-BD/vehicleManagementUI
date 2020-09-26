import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from '../../../_services/client.service';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.scss']
})
export class ProfessionComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public professionList: any;
  public createdDate: Date;

  constructor(
    private clientService: ClientService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    this.clientService.getProfessionList().subscribe(
      (data: any) => {
        this.professionList = data.content;
        this.createdDate = data.timeStamp;
        console.log(data);
        this.dtTrigger.next();
      }, (err) => {
        console.log('-----> err :', err);
      }
    );
  }


}
