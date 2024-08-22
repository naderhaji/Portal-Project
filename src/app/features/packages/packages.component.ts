import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PackagesService } from 'src/app/services/packages/packages.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent implements OnInit {
  listPackages: any;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  @ViewChild('carousel', { static: true }) carousel: ElementRef;
  // @ViewChild('firstCard', { static: true }) firstCard: ElementRef;
  @ViewChild('gotodemand', { static: true }) gotodemand: ElementRef;

  customOptions: OwlOptions = {
    margin: 25,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: true,
    navSpeed: 600,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
  };
  firstCardWidth: any;
  constructor(private packageServ: PackagesService, private router: Router) {}
  ngOnInit(): void {
    this.getAllPackages();
    // this.firstCardWidth = this.firstCard.nativeElement.offsetWidth;
    this.firstCardWidth = 355;

    console.log('firstCardWidth', this.firstCardWidth);
    this.carousel.nativeElement.scrollLeft -= this.firstCardWidth;
  }
  getDisplayedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.listPackages.slice(startIndex, endIndex);
  }
  onArrowClick(direction: any) {
    if (direction === 'left') {
      this.carousel.nativeElement.scrollLeft -= this.firstCardWidth;
    } else {
      this.carousel.nativeElement.scrollLeft += this.firstCardWidth;
    }
    console.log(this.carousel.nativeElement.scrollLeft);
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1; // PrimeNG uses 0-based indexing
  }

  getAllPackages() {
    this.packageServ.getAllArticles().subscribe((res) => {
      console.log('ressss', res);

      this.listPackages = res;
      console.log('------------------', this.listPackages);
    }),
      (err) => {
        console.log(err);
      };
    // this.packageServ
    //   .getAllArticles()
    //   .toPromise()
    //   .then(
    //     (data: any) => {
    //       this.listPackages = data;
    //       console.log('------------------', this.listPackages);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  }

  sendPrice(data: any) {
    localStorage.setItem('price', data.list_price);
    //localStorage.setItem('orderId', data.id);
    localStorage.setItem('package', '{"name_line": "' + data.name + '", "product_id": ' + data.id + '}');
    this.gotodemand.nativeElement.click();
  }
}
