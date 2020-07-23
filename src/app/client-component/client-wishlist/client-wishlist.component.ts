import { Component, OnInit } from '@angular/core';
import { serverUrl } from 'src/app/constant/constant';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-client-wishlist',
  templateUrl: './client-wishlist.component.html',
  styleUrls: ['./client-wishlist.component.css']
})
export class ClientWishlistComponent implements OnInit {

  public wishlist = [];
  public url = `${serverUrl}images/`;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getWishlistInfo();
  }

  deleteWishlist = (id: number) => {
    this.userService.deleteWishlist(id).subscribe(
      response => {
        let tempArray = this.wishlist.filter( e => e.id!=id);
        this.wishlist = tempArray;
      }
    )
  }

  getWishlistInfo = () => {
    let id = this.authService.getUserId();
    this.userService.getWishlist(id).subscribe(
      response => {
        this.wishlist = response['data'];
      }
    )
  }

}
