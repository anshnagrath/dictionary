import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-errorview',
  templateUrl: './errorview.component.html',
  styleUrls: ['./errorview.component.css']
})
export class ErrorviewComponent implements OnInit {
public error;msg;
  constructor(public activatedRoute : ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      this.error = params.error;
    });

   }

  ngOnInit() {
//console.log(JSON.parse(this.error),'check the error here');
if(this.error == 404)this.msg = "!!!!!oops seams like you made a typo please check the word properly";
if(this.error == 403)this.msg = "authentication failure";
if(this.error == 500)this.msg = "internal server error";
if(this.error == 414)this.msg = "Request URI Too Long";
if(this.error == 502)this.msg = "Bad Gateway";
console.log(this.msg,'check msg here')

  }

}
