import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  public loadingUpdateInfo: boolean = false;
  public loadingUpdateAddress: boolean = false;
  public isInfoEditable: boolean = false;
  public isAddressEditable: boolean = false;
  public userInfo;
  public addressList;
  public updateInfoSuccess: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  infoForm = this.fb.group({
    username: [''],
    password: ['', Validators.minLength(6)],
    repassword: [''],
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)]],
  }, { validator: this.checkPasswords })

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('repassword').value;

    return (pass === confirmPass) && (pass != '' && confirmPass != '') || (pass == '' && confirmPass == '') ? null : { notSame: true }
  }

  addressForm = this.fb.group({
    id: 0,
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
    phoneNumber: ['',[Validators.required, Validators.pattern(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)]],
    district: [''],
    province: [''],
    address: ['', Validators.required],
    userEntity: this.fb.group({
      username: [''],
    })
  })

  editAddress = (id: number) => {
    this.isAddressEditable = true;

    if (id == 0) {
      this.addressForm.patchValue({
        id: 0,
        name: '',
        district: '',
        province: '',
        address: '',
        phoneNumber: '',
      })
    } else {
      this.addressList.forEach(element => {
        if (element.id == id) {
          this.addressForm.patchValue({
            id: id,
            name: element.name,
            district: element.district,
            province: element.province,
            address: element.address,
            phoneNumber: element.phoneNumber,
          })
        }
      });
    }


    //console.log(this.addressForm.value);
  }

  deleteAddress = (id: number) => {
    this.userService.deleteAddress(id).subscribe(
      response => {
        this.addressList = response['data'];
        this.createFullAddress();
      })
  }

  submitAddressForm = () => {
    this.loadingUpdateAddress = true;
    this.userService.insertOrUpdateAddress(this.addressForm.value).subscribe(
      response => {
        this.addressList = response['data'];
        this.createFullAddress();
        this.loadingUpdateAddress = false;
        this.isAddressEditable = false;
      }
    )
  }

  createFullAddress = () => {
    this.addressList.forEach(element => {
      element.fullAddress = [element.address, element.district, element.province].filter(e => e != null && e.length != 0).join(', ')
    });
  }

  submitInfoForm = () => {
    this.updateInfoSuccess = false;
    this.loadingUpdateInfo = true;
    this.userService.updateInfo(this.infoForm.value).subscribe(
      response => {
        this.loadingUpdateInfo = false;
        this.updateInfoSuccess = true;
        this.infoForm.patchValue({
          password: '',
          repassword: '',
        })
      }
    )
  }

  getUserInfo = () => {
    let id = this.authService.getUserId();
    if (id != null) {
      this.userService.getUserInfo(id).subscribe(
        response => {
          this.userInfo = response['data'];
          this.addressList = response['data'].addressSet;
          this.createFullAddress();
          this.infoForm.patchValue({
            username: response['data'].username,
            name: response['data'].name,
            phoneNumber: response['data'].phoneNumber,
          })

          this.addressForm.patchValue({
            userEntity: {
              username: response['data'].username,
            }
          })
        }
      )
    }
  }


}
