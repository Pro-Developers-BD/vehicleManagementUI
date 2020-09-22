import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../../../_services/client.service';

@Component({
  selector: 'app-email-domain-save',
  templateUrl: './email-domain-save.component.html',
  styleUrls: ['./email-domain-save.component.scss']
})
export class EmailDomainSaveComponent implements OnInit {
  submitted = false;
  public pageTitle: string;
  public emailDomainForm: FormGroup;
  public domainName: any;
  private result: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {
    this.emailDomainForm = this.formBuilder.group({
      id: '',
      domainName: ['', Validators.required],
    });
  }

  ngOnInit(): any {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Email Domain';
      this.clientService.getDomainById(parseInt(id)).subscribe(
        (res: any) => {
          this.emailDomainForm.patchValue({
            id: res.content.id,
            domainName: res.content.domainName,
          });
          this.result = res;
          console.log(this.result);
        }
      );
    } else {
      this.pageTitle = 'Create Email Domain';
    }
  }

  uploadSubmit(): void {
    this.submitted = true;
    if (this.emailDomainForm.valid) {
      const data = new FormData();
      data.append('id', this.emailDomainForm.controls.id.value);
      data.append('domainName', this.emailDomainForm.controls.domainName.value);
      this.clientService.saveDomain(data).subscribe(
        res => {
          if (res) {
            this.router.navigate(['emailDomain/list']);
          }
        });
    }
  }

  resetAll(): void {
    this.emailDomainForm.controls.domainName.reset();

  }
}

