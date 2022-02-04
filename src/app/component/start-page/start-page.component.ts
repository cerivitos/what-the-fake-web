import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
})
export class StartPageComponent implements OnInit {
  version: string = '';

  constructor() {}

  ngOnInit(): void {
    this.version = environment.version;
  }
}
