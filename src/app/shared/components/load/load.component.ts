import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load',
  template: `<div class = "loader-animator"></div>`,
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
