import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ClientCategoryService } from 'src/app/service/client-category.service';
import { serverUrl } from 'src/app/constant/constant';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/service/user.service';
declare var $: any;

@Component({
  selector: 'app-client-category',
  templateUrl: './client-category.component.html',
  styleUrls: ['./client-category.component.css']
})
export class ClientCategoryComponent implements OnInit {

  public isCollapsed = false;
  public products = [];
  public category = [];
  public manufacturer = [];

  public totalPage: number;
  public currentPage: number;
  public currentPageDisplay: number = 1;
  public page = 20;
  public entries: number;
  public url = `${serverUrl}images/`;
  public collectionSize: number;

  private initCategoryId;

  constructor(
    private fb: FormBuilder,
    private clientCategoryService: ClientCategoryService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private cartService: CartService,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
   }

  ngOnInit() {
    this.getSideBarInfo();
    $(document).ready(function () {

      //   //--------- Accordion Icon Change ---------//

      //   $('.collapse').on('shown.bs.collapse', function(){
      //       $(this).parent().find(".lnr-arrow-right").removeClass("lnr-arrow-right").addClass("lnr-arrow-left");
      //   }).on('hidden.bs.collapse', function(){
      //       $(this).parent().find(".lnr-arrow-left").removeClass("lnr-arrow-left").addClass("lnr-arrow-right");
      //   });

      // // Select all links with hashes
      // $('.main-menubar a[href*="#"]')
      //   // Remove links that don't actually link to anything
      //   .not('[href="#"]')
      //   .not('[href="#0"]')
      //   .click(function(event) {
      //     // On-page links
      //     if (
      //       location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      //       && 
      //       location.hostname == this.hostname
      //     ) {
      //       // Figure out element to scroll to
      //       var target = $(this.hash);
      //       target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      //       // Does a scroll target exist?
      //       if (target.length) {
      //         // Only prevent default if animation is actually gonna happen
      //         event.preventDefault();
      //         $('html, body').animate({
      //           scrollTop: target.offset().top-70
      //         }, 1000, function() {
      //           // Callback after animation
      //           // Must change focus!
      //           var $target = $(target);
      //           $target.focus();
      //           if ($target.is(":focus")) { // Checking if the target was focused
      //             return false;
      //           } else {
      //             $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
      //             $target.focus(); // Set focus again
      //           };
      //         });
      //       }
      //     }
      //   });


    });
    this.entries = 12;

  }

  priceForm = this.fb.group({
    single: [[1, 100]],
  })

  productForm = this.fb.group({
    name: [''],
    priceFrom: [''],
    priceTo: [''],
    manufacturerId: 0,
    categoryId: 0,
    sortBy: 0,
  });


  onChange = ($event) => {
    console.log($event.target.value);
  }

  logForm1 = () => {
    console.log(this.priceForm.value)
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

  searchProductInCategory = () => {
    let priceFrom = this.priceForm.controls.single.value[0]*1000;
    let priceTo = this.priceForm.controls.single.value[1]*1000;
    this.getAllProductsInit(1, this.entries, this.productForm.value.name, priceFrom, priceTo, this.productForm.value.manufacturerId, this.productForm.value.categoryId, this.productForm.value.sortBy, this.initCategoryId);
  }

  onTextChange = ($event) => {
    this.productForm.patchValue({
      name: $event.target.value,
    })
  }

  changeCategoryInfo = ($event, categoryId: number) => {
    // console.log($event);
    // console.log(categoryId);
    if (categoryId == this.productForm.controls.categoryId.value) {
      $event.target.classList.remove('category-clicked');
      this.productForm.patchValue({
        categoryId: 0,
        name: '',
        manufacturerId: 0,
      })
      this.priceForm.patchValue({
        single: [1,100],
      })
      this.getAllProductsInit(1, this.entries, this.productForm.value.name, this.productForm.value.priceFrom, this.productForm.value.priceTo, this.productForm.value.manufacturerId, this.productForm.value.categoryId, this.productForm.value.sortBy, this.initCategoryId);
    } else {
      var lights = document.getElementsByClassName("category-clicked");
      while (lights.length) {
        lights[0].className = lights[0].className.replace(/\bcategory-clicked\b/g, "");
      }

      $event.target.classList.add("category-clicked");
      this.productForm.patchValue({
        categoryId: categoryId,
        name: '',
        manufacturerId: 0,
      })
      
      this.priceForm.patchValue({
        single: [1,100],
      })
      this.getAllProductsInit(1, this.entries, this.productForm.value.name, this.productForm.value.priceFrom, this.productForm.value.priceTo, this.productForm.value.manufacturerId, this.productForm.value.categoryId, this.productForm.value.sortBy, this.initCategoryId);
    }
  }

  changeManufacturerInfo = ($event) => {
    let manufacturerId = $event.target.value;
    if (manufacturerId == this.productForm.controls.manufacturerId.value) {
      $event.target.checked = false;
      this.productForm.patchValue({
        manufacturerId: 0,
      })

    } else {
      this.productForm.patchValue({
        manufacturerId: manufacturerId,
      })
    }
  }

  // resetRadio = (manufacturerId: number) => {

  // }

  onSortChange = ($event) => {
    //console.log($event.target.value);
    this.productForm.patchValue({
      sortBy: $event.target.value
    })

    this.clientCategoryService.getAllProducts(0, this.entries, this.productForm.value.name, this.productForm.value.priceFrom, this.productForm.value.priceTo, this.productForm.value.manufacturerId, this.productForm.value.categoryId, this.productForm.value.sortBy, this.initCategoryId).subscribe(response => {
      this.products = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage + 1;
      this.collectionSize = this.entries * this.totalPage;
    });
  }

  onEntriesChange = ($event) => {
    this.entries = $event.target.value;
    this.clientCategoryService.getAllProducts(0, this.entries, this.productForm.value.name, this.productForm.value.priceFrom, this.productForm.value.priceTo, this.productForm.value.manufacturerId, this.productForm.value.categoryId, this.productForm.value.sortBy, this.initCategoryId).subscribe(response => {
      this.products = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage + 1;
    });
  }

  onPageChanged = (pageNumber: number) => {
    //console.log("gia tri la"+pageNumber);
    this.getAllProducts(pageNumber - 1, this.entries, this.productForm.value.name, this.productForm.value.priceFrom, this.productForm.value.priceTo, this.productForm.value.manufacturerId, this.productForm.value.categoryId, this.productForm.value.sortBy, this.initCategoryId);
  }

  getAllProducts = (pageNumber: number, size: number, productName: string, priceFrom: number, priceTo: number, manufacturerId: number, categoryId: number, sortBy: number, initCategoryId: number): any => {
    this.clientCategoryService.getAllProducts(pageNumber, size, productName, priceFrom, priceTo, manufacturerId, categoryId, sortBy, this.initCategoryId).subscribe(response => {
      this.products = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
    });
  }

  getAllProductsInit = (pageNumber: number, size: number, productName: string, priceFrom: number, priceTo: number, manufacturerId: number, categoryId: number, sortBy: number, initCategoryId: number): any => {
    //console.log(initCategoryId);
    this.clientCategoryService.getAllProducts(pageNumber - 1, size, productName, priceFrom, priceTo, manufacturerId, categoryId, sortBy, this.initCategoryId).subscribe(response => {
      this.products = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.collectionSize = this.entries * this.totalPage;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }

  getSideBarInfo = () => {
    const url = this.activatedRoute.snapshot.paramMap.get('url');
    this.categoryService.getAllCategoriesNotHaveParent().subscribe(
      response => {
        response.forEach(element => {
          if(element.url == url){
            this.initCategoryId = element.id
          }
        });
      }
    )
    this.productService.getClientCategoryPageInfo(url).subscribe(
      response => {
        if(response['data']!=null){
          this.category = response['data'].categoryList;
          this.manufacturer = response['data'].manufacturerList;
          this.getAllProductsInit(1, 12, '', 0, 0, 0, 0, 0, this.initCategoryId);
        } else {
          this.router.navigate(['/client/wild-card'])
        }
        
      }
    )
  }

}
