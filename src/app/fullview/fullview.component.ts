import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Routes, Router} from '@angular/router';
import {AppService} from '../app.service'
@Component({
  selector: 'app-fullview',
  templateUrl: './fullview.component.html',
  styleUrls: ['./fullview.component.css']
})
export class FullviewComponent implements OnInit {
public lang;
public word;
public inflectionName;
public inlfection;
public entities;

  constructor(public activatedRoute:ActivatedRoute,public appService:AppService) {  	
  activatedRoute.params.subscribe((params) => {
  	 this.lang = params.id;
  	 this.word =params.word;
     });
     this.getalldata();
  }

  ngOnInit() {
  }
getalldata(){
	this.appService.getInflection(this.lang,this.word).then((res)=>{
 	//console.log(res,'sdasdcasdcasdc')
	if(res && res['results'])this.inflectionName =res['results'][0]['id'];
	//console.log(this.inflectionName,'check this out')
	if(res && res['results']) this.inlfection = res['results']

   console.log(this.inlfection,'here');

})
	this.appService.getentries(this.lang,this.word).then((res)=>{
	this.word =res;
})
}

}
