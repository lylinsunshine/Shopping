import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IndexService } from 'src/app/service/index.service';
import { serverUrl } from 'src/app/constant/constant';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
//declare var $: any;

@Component({
  selector: 'app-client-index',
  templateUrl: './client-index.component.html',
  styleUrls: ['./client-index.component.css']
})
export class ClientIndexComponent implements OnInit {
  customOptions: OwlOptions = {
    items:1,
    autoplay:false,
    autoplayTimeout: 5000,
    loop:true,
    nav:true,
    navText:["<img src='assets/client-assets/img/banner/prev.png'>","<img src='assets/client-assets/img/banner/next.png'>"],
    dots:false,
  }
  public url = `${serverUrl}images/`;
  public promotion;
  public hotProducts = [];
  public featureProducts = [];
  public lastestProduct = [];
  public randomProduct = [];

  private _diff: number;
    public _days: number;
    public _hours: number;
    public _minutes: number;
    public _seconds: number;

  constructor(
    private indexService: IndexService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    // this.loadScript('../assets/client-assets/js/owl.carousel.min.js');
    // Search Toggle
    this.getPromotionInfo();
    this.getLastestProduct();
    this.getHotProduct();
    this.getRandomProduct();
  }

  


  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  getDays(t){
    return Math.floor( t/(1000*60*60*24) );
}

getHours(t){
    return Math.floor( (t/(1000*60*60)) % 24 );
}

getMinutes(t){
    return Math.floor( (t/1000/60) % 60 );
}

getSeconds(t){
    return Math.floor( (t/1000) % 60 );
}

  getPromotionInfo = () => {
    this.indexService.getCurrentPromotionInfo().subscribe(
      response => {
        this.promotion = response['data'];
        interval(1000).pipe(
          map((x) => {this._diff = Date.parse(this.promotion.endDate) - Date.parse(new Date().toString());
            })).subscribe((x) => {
                this._days = this.getDays(this._diff);
                this._hours = this.getHours(this._diff);
                this._minutes = this.getMinutes(this._diff);
                this._seconds = this.getSeconds(this._diff);
            });
      }
    )
  }

  getLastestProduct = () => {
    this.indexService.getLastestProduct().subscribe(
      response => {
        this.lastestProduct = response['data'];
      }
    )
  }

  getRandomProduct = () => {
    this.indexService.getRandomProduct().subscribe(
      response => {
        this.randomProduct = response['data'];
      }
    )
  }

  getHotProduct = () => {
    this.indexService.getHotProduct().subscribe(
      response => {
        for (let index = 0; index < response['data'].length; index++) {
          const element = response['data'][index];
          if(index<3){
            this.featureProducts.push(element);
          } else {
            this.hotProducts.push(element);
          }
        }
      }
    )
  }

  objectsEqual = (o1, o2) => {
    return Object.keys(o1).length === Object.keys(o2).length
      && Object.keys(o1).every(p => o1[p] === o2[p]);
  }
  arraysEqual = (a1, a2): boolean => {
    return a1.length === a2.length && a1.every((o, idx) => this.objectsEqual(o, a2[idx]));
  }

  addToCart = (id, name, image, price) => {
    if (localStorage.getItem('cart') == null) {
      let cart = [];
      let product = { id: id, name: name, image:image, quantity: 1, price: price, attribute:[] };
      cart.push(product);

      this.cartService.setItem('cart', JSON.stringify(cart));
      //localStorage.setItem('cart', JSON.stringify(cart));

    } else {
      let cart = JSON.parse(localStorage.getItem('cart'));
      let product = { id: id, name: name, image: image, quantity: 1, price: price, attribute: [] };
      let check: boolean = false;
      let duplicateItem: number = 0;
      cart.forEach(element => {
        if (element.id == product.id) {
          if (this.arraysEqual(element.attribute, product.attribute) == true) {
            duplicateItem++;
            element.quantity++;
          }
        }
      });

      if (duplicateItem == 0) {
        cart.push(product);
      }

      this.cartService.setItem('cart', JSON.stringify(cart));
      //localStorage.setItem('cart', JSON.stringify(cart));

    }

  }

  addToWishlist = (id) => {
    let username = this.authService.getUserId();
    if(username!=null){
      let body = {id: 0, productEntity: { id: id}, userEntity: {username: username}};
      this.userService.addWishlist(body).subscribe(
        response => {

        }
      )
    } else {
      this.router.navigate(['/client/login'])
    }
  }

}
