import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  constructor(private authService: AuthService, private router: Router) {}
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
