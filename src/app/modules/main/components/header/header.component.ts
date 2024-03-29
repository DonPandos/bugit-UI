import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authService: AuthService;

  constructor(private router: Router, authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit(): void {
  }

  onSignUpClick() {
    this.router.navigate(['/signup']);
  }

  onSignInClick() {
    this.router.navigate(['/signin']);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
