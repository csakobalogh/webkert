import { Component } from '@angular/core';
import { RouterLink, /* RouterLinkActive */ } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-page-not-found',
  imports: [
    RouterLink, 
    // RouterLinkActive, 
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

}
