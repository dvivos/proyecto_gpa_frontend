import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ruta: string = '';

  constructor(private router: Router) {

    this.router.events.subscribe( event  => {
      if (event instanceof NavigationStart) {
           this.ruta = event.url;
      }});
  }

  ngOnInit(): void {
  }



}
