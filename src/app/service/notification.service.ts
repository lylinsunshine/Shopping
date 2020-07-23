import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess = (content: string) => {
    this.toastr.success(content, 'Notification', {
      closeButton: true,
      enableHtml: true,
    });
  }

  showError = (content: string) => {
    this.toastr.error(content, 'Notification', {
      closeButton: true,
      enableHtml: true,
    });
  }

  showInfo = (content: string) => {
    this.toastr.info(content, 'Notification', {
      closeButton: true,
      enableHtml: true,
    });
  }

  
}
