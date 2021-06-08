import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

//Implementa OnInit que sirve para que se una vez abres la página por primera vez
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
