import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckoutService } from 'src/app/service/checkout.service';

@Component({
  selector: 'app-client-verify-order',
  templateUrl: './client-verify-order.component.html',
  styleUrls: ['./client-verify-order.component.css']
})
export class ClientVerifyOrderComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      let error = params['errorCode'];
      let id = params['orderId'];
      if(error != null && id!=null) {
        if(error == 0) {
          this.checkoutService.updateMomoPaymentStatusSuccess(id).subscribe(
            response => {
              this.router.navigate(['/client/order-history']);
            }
          )        
        } else {
          this.checkoutService.updateMomoPaymentStatusFail(id).subscribe(
            response => {
              this.router.navigate(['/client/order-history']);
            }
          )    
        }
      } else {
        //this.router.navigate(['/client/index']);
      }
      
      console.log(error); // Print the parameter to the console. 
  });
   }

  ngOnInit() {
  }

}
