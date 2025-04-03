import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  menuSwitch(pageValue: string) {
    this.selectedPage.emit(pageValue);
  }
}