import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const routes: Routes = [
    // Statikus eleresi utvonalak
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'registration', component: RegistrationComponent},

    // Parameterezett utvonalak
    // ...

    // Ures eleresi utvonal
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    // {path: '**', component: HomeComponent}

    // Wildcard utvonal
    {path: '**', component: PageNotFoundComponent}
];
