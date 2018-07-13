import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {Router} from '@angular/router'
import Typed from 'typed.js';
import {$,jQuery} from 'jquery';
import {HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public words;;
  public searchData=[];
  public data;
  public selectedId;
  public languages;
  public buttons = [];
  public limit = 0;
  constructor(public appService:AppService,public router:Router) { 
  this.getlanguages();
  }

  ngOnInit() {
  var typed = new Typed('#typed', {
    stringsElement: "#typedjs",
    backSpeed:40,
    typeSpeed:40,
    loop:true,
  });
  }


search(event?){
(this.data != undefined)?this.limit= this.data.length:0 
 this.searchData =[];

 this.appService.getAllSearchResult((this.selectedId)?this.selectedId:'en',this.data).then(res=>{ 
 res['results'].forEach((results)=>{
 this.searchData.push(results.word);
 this.searchData = this.searchData.slice(0,8)
})

})
}
nextState(event){
  if(event &&  event.keyCode == 13 && this.data.length>0 ){
  //console.log('ysysysysysysysysysyayayayayaayya');
  let lang = (this.selectedId)?this.selectedId:'en';
  console.log(event,'hey look here for the event ')
this.router.navigate([`/fullview/${this.data}`,lang]);
}
  
}
selectedItem(item){
let lang = (this.selectedId)?this.selectedId:'en';
this.data = item;
this.searchData = [];
let params = new HttpParams();
params=params.set('languagetype',this.selectedId);

setTimeout(()=>{this.router.navigate([`/fullview/${this.data}`,lang])},500)
}
getlanguages(){
  let obj = {};
 this.appService.getAllLanguages().then(res=>{
 console.log(res,'asdasdassdassassz')
 res['results'].forEach((element)=>{
//console.log(element)
obj['id'] = element.sourceLanguage.id;
obj['source'] = element.source;
 this.buttons.push(obj);
 obj = {};
 });
 console.log(this.buttons,'looksdsdsd');
 })
}

}