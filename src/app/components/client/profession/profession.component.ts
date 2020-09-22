import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../_services/client.service';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.scss']
})
export class ProfessionComponent implements OnInit {

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
        this.createdDate = new Date();
      }
    );
  }


}
