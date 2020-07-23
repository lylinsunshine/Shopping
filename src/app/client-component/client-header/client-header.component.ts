import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';
import { PromotionService } from 'src/app/service/promotion.service';
import { AuthService } from 'src/app/auth/auth.service';
import { serverUrl } from 'src/app/constant/constant';
declare var $: any;
@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit {

  public totalItem;
  public categories;
  public search = "";
  public username;
  public userLoggedIn = false;

  constructor(
    private cartService: CartService,
    private categoryService: CategoryService,
    private router: Router,
    private promotionService: PromotionService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.userLoggedIn = this.authService.isLoggedIn();
    this.getCategoryMenu();
    $(document).ready(function(){
      // var window_width 	 = $(window).width(),
      // window_height 		 = window.innerHeight,
      // header_height 		 = $(".default-header").height(),
      // header_height_static = $(".site-header.static").outerHeight(),
      // fitscreen 			 = window_height - header_height;
    
      // $(".fullscreen").css("height", window_height)
      //   $(".fitscreen").css("height", fitscreen);
    
      //------- Active Nice Select --------//
    
        // $('select').niceSelect();
    
    
        $('.navbar-nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
        }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
        });
    
        // $('.img-pop-up').magnificPopup({
        //     type: 'image',
        //     gallery:{
        //     enabled:true
        //     }
        // });
    
        // Search Toggle
        $("#search_input_box").hide();
        $("#search").on("click", function () {
            $("#search_input_box").slideToggle();
            $("#search_input").focus();
        });
        $("#close_search").on("click", function () {
            $('#search_input_box').slideUp(500);
        });
    
        /*==========================
        javaScript for sticky header
        ============================*/
          $(".sticky-header").sticky();
    
  
     });   
     this.getTotalItem();
    this.cartService.watchStorage().subscribe((data:string) => {
      this.getTotalItem();
      //console.log('123');
    });
  }

  getTotalItem = () => {
    this.totalItem = 0
    if(localStorage.getItem('cart')!=null){
      let cart = JSON.parse(localStorage.getItem('cart'));
      cart.forEach(element => {
        this.totalItem +=element.quantity
      });
    }
  }

  logout = () => {
    this.authService.logout();
    window.location.href = 'http://localhost:4200/client/index';
  }

  getCategoryMenu = () => {
    this.categoryService.getAllCategoriesNotHaveParent().subscribe(
      response => {
        this.categories = response;
      }
    )
  }

  searchBox = ($event) => {
    let input = $event.target.value;
    this.search = input
      this.cartService.setItem('search', input);
      //localStorage.setItem('search', input);
      this.router.navigate(['/client/search'])  
  }

}
