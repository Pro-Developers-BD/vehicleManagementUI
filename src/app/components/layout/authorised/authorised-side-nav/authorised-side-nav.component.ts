import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../../../_services/home.service';
import {AuthenticationService} from "../../../../_services/authentication.service";

@Component({
  selector: 'app-authorised-side-nav',
  templateUrl: './authorised-side-nav.component.html',
  styleUrls: ['./authorised-side-nav.component.scss']
})
export class AuthorisedSideNavComponent implements OnInit {

  constructor(
    public homeService: HomeService,
    public auth: AuthenticationService) {
  }

  ngOnInit(): void {
  }

}
