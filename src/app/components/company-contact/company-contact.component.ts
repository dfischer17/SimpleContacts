import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-contact',
  templateUrl: './company-contact.component.html',
  styleUrls: ['./company-contact.component.scss'],
})
export class CompanyContactComponent implements OnInit {
  @Input() companyname: string;

  constructor() { }

  ngOnInit() {}

}
