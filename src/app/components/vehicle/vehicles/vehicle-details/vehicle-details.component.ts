import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from '../../../../_services/vehicle.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  public vehicleDetails: any;
  public carCompanyName: any;
  public carBrandName: any;
  public images: any = [];
  public imageId: any;

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 2,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": true
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vehicleService.carStockDeatilsById(parseInt(id)).subscribe(
        (res: any) => {
          this.vehicleDetails = res.content;
          console.log(this.vehicleDetails);
          let image = this.vehicleDetails.images;
          image.forEach(obj => {
            if (obj) {
              const imgId = obj.split('id=')[1].split(',')[0];
              this.images.push(imgId);
            }
          });
          this.getCarCompany(this.vehicleDetails.carCompanyId);
          this.getCarBrand(this.vehicleDetails.carModelId);
        });
    }
  }

  public getCarCompany(number) {
    this.vehicleService.carCompanyById(parseInt(number)).subscribe(
      (res: any) => {
        this.carCompanyName = res.content.carCompanyName;
      });
  }

  public getCarBrand(number) {
    this.vehicleService.carModelById(parseInt(number)).subscribe(
      (res: any) => {
        this.carBrandName = res.content.carModelName;
      });
  }

  slickInit(e) {
    console.log('slick initialized');
    this.imageId =this.images[0];
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  changeImage(e) {
    this.imageId = e.target.id;
  }
}
