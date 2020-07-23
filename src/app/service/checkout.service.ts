import { Injectable } from '@angular/core';
import { serverUrl, clientUrl } from '../constant/constant';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  momoPayment = (id: number, totalPrice: number): any => {

    var url = "https://test-payment.momo.vn/gw_payment/transactionProcessor"
    var path = "/gw_payment/transactionProcessor"
    var partnerCode = "MOMONZ3C20200520"
    var accessKey = "w8iSLnvJJMuwLkbU"
    var serectkey = "tUUxP1iaCdHS50OskVmEapOsbxYfaHjT"
    var orderInfo = "Pay with MoMo"
    var returnUrl = `${clientUrl}client/verify`
    var notifyurl = `${clientUrl}client/verify`
    var amount = totalPrice.toString();
    var orderId = id.toString();
    var requestId = "1";
    var requestType = "captureMoMoWallet"
    var extraData = "";

    var rawSignature = "partnerCode=" + partnerCode + "&accessKey=" + accessKey + "&requestId=" + requestId + "&amount=" + amount + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&returnUrl=" + returnUrl + "&notifyUrl=" + notifyurl + "&extraData=" + extraData
    //puts raw signature
    // console.log("--------------------RAW SIGNATURE----------------")
    // console.log(rawSignature);

    var signature = CryptoJS.HmacSHA256(rawSignature, serectkey).toString(CryptoJS.enc.Hex);
    // console.log("--------------------SIGNATURE----------------")
    // console.log(signature)

    var body = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      returnUrl: returnUrl,
      notifyUrl: notifyurl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
    })
    return this.http.post(url, body);
  }

  addOrder = (body: any) => {
    const url = `${serverUrl}clients/payment`;
    return this.http.post(url, body);
  }

  addOrderDetail = (body: any) => {
    const url = `${serverUrl}clients/payment/order-detail`;
    return this.http.post(url, body);
  }

  updateMomoPaymentStatusSuccess = (id: number) => {
    const url = `${serverUrl}clients/payment/update-order-success/${id}`;
    return this.http.post(url, null);
  }

  updateMomoPaymentStatusFail = (id: number) => {
    const url = `${serverUrl}clients/payment/update-order-fail/${id}`;
    return this.http.post(url, null);
  }


}
