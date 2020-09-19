import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public auth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

}
