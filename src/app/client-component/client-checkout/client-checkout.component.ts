import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/service/checkout.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { serverUrl } from 'src/app/constant/constant';

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.css']
})
export class ClientCheckoutComponent implements OnInit {

  public cart = null;
  public url = `${serverUrl}images/`;
  public totalPrice;
  public paymentType = 'COD';
  public flagNoAddress: boolean = false;
  public isOrdering: boolean = false;
  public isMomoFail: boolean = false;
  public canClick: boolean = false;
  public canSelectAddress: boolean = false;
  public addressList;
  public userInfo;
  public selectedAddress;

  private username;

  constructor(
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
  ) {
  }

  ngOnInit() {
    this.getUserInfo();
    this.getCartInfo();
    this.caculateTotalPrice();
  }

  orderForm = this.fb.group({
    id: 0,
    address: [''],
    //date: [''],
    paymentMethod: [''],
    deliveryStatus: ['PENDING'],
    paymentStatus: ['PENDING'],
    userEntity: this.fb.group({
      username: [''],
    }),
  });

  createOrderDetail = (orderId: number) => {
    let orderDetails = [];
    this.cart.forEach(element => {
      let orderDetail =
      {
        id: 0,
        price: element.price,
        quantity: element.quantity,
        orderEntity: {
          id: orderId,
        },
        productEntity: {
          id: element.id,
        },
        subPrice: element.price * element.quantity,
        attribute: '',
      };

      let temp = '';
      if (element.attribute.length != 0) {
        element.attribute.forEach(item => {
          if (item != element.attribute[element.attribute.length - 1])
            temp = temp + item.value + ' - ';
          else
            temp = temp + item.value;
        });

        orderDetail.attribute = temp;
      }

      orderDetails.push(orderDetail);
      
    });
   // console.log(orderDetails);
    return orderDetails;
  }

  getCartInfo = () => {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  handleChange = ($event, paymentType: string) => {
    if ($event.target.checked) {
      this.paymentType = paymentType;
      this.orderForm.patchValue({
        paymentMethod: this.paymentType,
      })
    }
  }

  caculateTotalPrice = () => {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    let temp = 0;
    this.cart.forEach(element => {
      temp += element.price * element.quantity
    });

    this.totalPrice = temp;
  }

  onChange = ($event) => {
    let id = $event.target.value;
    this.addressList.forEach(element => {
      if (element.id == id)
        this.selectedAddress = element.fullAddress;
    });
    this.orderForm.patchValue({
      address: this.selectedAddress,
    })
  }

  codPayment = () => {
    this.canSelectAddress = true;
    this.canClick = true;
    this.isOrdering = true;
    // this.orderForm.patchValue({
    //   date: new Date(),
    // })

    this.checkoutService.addOrder(this.orderForm.value).subscribe(
      addOderResponse => {
        //console.log(addOderResponse['data']);
        let array = this.createOrderDetail(addOderResponse['data']);
        //console.log(array);
        this.checkoutService.addOrderDetail(array).subscribe(
          addOderDetail => {
            this.cartService.removeItem('cart');
            //console.log(response['data']);
            this.isOrdering = false
            this.router.navigate(['/client/order-history']);
          }
        )
      }
    )

  }

  momoPayment = () => {
    this.canSelectAddress = true;
    this.canClick = true;
    this.isOrdering = true;
    // this.orderForm.patchValue({
    //   date: new Date(),
    // })

    this.checkoutService.addOrder(this.orderForm.value).subscribe(
      addOderResponse => {
        //console.log(response['data']);
        let array = this.createOrderDetail(addOderResponse['data']);
        //console.log(array);
        this.checkoutService.addOrderDetail(array).subscribe(
          addOderDetail => {
            //console.log(response['data']);
            this.checkoutService.momoPayment(addOderResponse['data'], this.totalPrice).subscribe(
              response => {
                if(response.payUrl == ''){
                  this.cartService.removeItem('cart');
                  this.isMomoFail = true;
                  setTimeout(() => {                   
                    this.router.navigate(['/client/order-history']);
                  }, 3000);
                } else {
                  this.cartService.removeItem('cart');
                  window.location.href = response.payUrl;
                }
                // console.log(response);
                // console.log(response.payUrl);
                // window.open(response.payUrl, "_blank");
              }
            )
            //this.router.navigate(['/client/order-history']);
          }
        )
      }
    )
  }

  createFullAddress = () => {
    this.addressList.forEach(element => {
      element.fullAddress = [element.name, element.phoneNumber, element.address, element.district, element.province].filter(e => e != null && e.length != 0).join(', ')
    });
  }


  getUserInfo = () => {
    let id = this.authService.getUserId();
    if (id != null) {
      this.userService.getUserInfo(id).subscribe(
        response => {
          this.userInfo = response['data'];
          if (response['data'].addressSet.length == 0) {
            this.flagNoAddress = true
          }
          this.addressList = response['data'].addressSet;
          this.createFullAddress();
          this.addressList.sort((a, b) => parseInt(b.id) - parseInt(a.id));
          if(this.addressList.length!=0){
            this.selectedAddress = this.addressList[0].fullAddress;
          }
          
          this.orderForm.patchValue({
            paymentMethod: 'COD',
            address: this.selectedAddress,
            userEntity: {
              username: response['data'].username,
            }
          })
        }
      )
    }
  }

}
