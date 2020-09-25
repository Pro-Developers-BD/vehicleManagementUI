import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../_services/authentication.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public year: number;

  constructor( public auth : AuthenticationService) { }

  ngOnInit(): void {
    this.getFullYear();
  }

  getFullYear(){
    this.year=new Date().getFullYear();
  }


}
