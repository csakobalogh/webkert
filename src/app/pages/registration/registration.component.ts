import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  signUpForm: FormGroup;
  isLoading = false;
  showForm = true;
  signupError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', Validators.required],
      name: this.fb.group({
        firstname: ['', [Validators.required, Validators.minLength(2)]],
        lastname: ['', [Validators.required, Validators.minLength(2)]]
      })
    });
  }

  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'Please correct any errors on the form before submitting.';
      return;
    }

    const password = this.signUpForm.get('password')?.value;
    const rePassword = this.signUpForm.get('rePassword')?.value;

    if (password !== rePassword) {
      this.signupError = 'The passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const email = this.signUpForm.get('email')?.value;
    const nameGroup = this.signUpForm.get('name')?.value;

    const userData: Partial<User> = {
      name: {
        firstname: nameGroup?.firstname || '',
        lastname: nameGroup?.lastname || ''
      },
      email: email || '',
      cartItems: []
    };

    this.authService.signUp(email, password, userData)
      .then(userCredential => {
        console.log('Registration successful:', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.error('Registration error:', error);
        this.isLoading = false;
        this.showForm = true;

        switch (error.code) {
          case 'auth/email-already-in-use':
            this.signupError = 'This email is already in use.';
            break;
          case 'auth/invalid-email':
            this.signupError = 'Invalid email format.';
            break;
          case 'auth/weak-password':
            this.signupError = 'Password is too weak. Use at least 6 characters.';
            break;
          default:
            this.signupError = 'An error occurred during registration. Please try again later.';
        }
      });
  }
}