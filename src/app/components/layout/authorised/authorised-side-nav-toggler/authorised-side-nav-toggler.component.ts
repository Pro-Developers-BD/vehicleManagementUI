import { Component, OnInit } from '@angular/core';
import {HomeService} from '../../../../_services/home.service';

@Component({
  selector: 'app-authorised-side-nav-toggler',
  templateUrl: './authorised-side-nav-toggler.component.html',
  styleUrls: ['./authorised-side-nav-toggler.component.scss']
})
export class AuthorisedSideNavTogglerComponent implements OnInit {

  constructor( public homeService: HomeService) { }

  ngOnInit(): void {
  }

}
