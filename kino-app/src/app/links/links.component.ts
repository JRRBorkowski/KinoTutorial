import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  isClicked: boolean = false

  showList() {
    this.isClicked === false ? this.isClicked = true : this.isClicked = false;
  }

  getUser() {
  }
  constructor() { }

  ngOnInit(): void {
    
  }

}
