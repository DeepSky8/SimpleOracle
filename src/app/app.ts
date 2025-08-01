import { Component, signal } from '@angular/core';
import { Header } from "./display/header/header";
import { Body } from "./display/body/body";

@Component({
  selector: 'app-root',
  imports: [Header, Body],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('SimpleOracle');
}
