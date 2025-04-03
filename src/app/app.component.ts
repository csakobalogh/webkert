import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    MenuComponent, 
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'webkert-szonyeg-webshop';
  
  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
}
