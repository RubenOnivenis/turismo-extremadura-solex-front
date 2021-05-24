import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { temasDatos } from 'src/app/services/temas.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  @Input() tema!:temasDatos;
  @Input() id!:number|undefined;

  constructor() { }

  ngOnInit() {
  }

}
