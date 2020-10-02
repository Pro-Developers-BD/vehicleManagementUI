import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../../_services/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-profession-save',
  templateUrl: './profession-save.component.html',
  styleUrls: ['./profession-save.component.scss']
})
export class ProfessionSaveComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  submitted = false;
  public pageTitle: string;
  public professionForm: FormGroup;

  public result: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
  ) {
    this.professionForm = this.formBuilder.group({
      id: '',
      professionName: ['', Validators.required],
    });
  }

  ngOnInit(): any {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Profession';
      this.clientService.getProfessionById(parseInt(id)).subscribe(
        (res: any) => {
          this.professionForm.patchValue({
            id: res.content.id,
            professionName: res.content.professionName,
          });
          this.result = res;
          console.log(this.result);
        }
      );
    } else {
      this.pageTitle = 'Add Profession';
    }
  }

  uploadSubmit(): void {
    this.submitted = true;
    if (this.professionForm.valid) {
      const data = new FormData();
      data.append('id', this.professionForm.controls.id.value);
      data.append('professionName', this.professionForm.controls.professionName.value);
      this.clientService.saveProfession(data).subscribe(
        res => {
          if (res.status === 'Created') {
            this.router.navigate(['profession/list']);
          }
        });
    }
  }

  get professionName() {
    return this.professionForm.get('professionName');
  }
}
