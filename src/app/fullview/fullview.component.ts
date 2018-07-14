import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
@Component({
  selector: 'app-fullview',
  templateUrl: './fullview.component.html',
  styleUrls: ['./fullview.component.css']
})
export class FullviewComponent implements OnInit {
  public lang;
  public word;
  public audio;
  public inflectionName;
  public inlfection;
  public domains;examples;shortdefinations;subsenses;subdomains;subShortdef;
  public entities;
  public definitions;
  public lexicalCategory = [];

  constructor(public activatedRoute: ActivatedRoute, public appService: AppService, public router:Router) {
    activatedRoute.params.subscribe((params) => {
      this.lang = params.id;
      this.word = params.word;
    });
    this.getalldata();
  }

  ngOnInit() {
  }

  getalldata() {
    this.appService.getInflection(this.lang, this.word).then((res) => {
      //console.log(res,'sdasdcasdcasdc')
      if (res && res['results']) this.inflectionName = res['results'][0]['id'];
      //console.log(this.inflectionName,'check this out')
      if (res && res['results']) this.inlfection = res['results']



    })
    this.appService.getentries(this.lang, this.word).then((res) => {
     console.log('check here for error')
    console.log(res,'res check')
   if(res){

    this.lexicalCategory = [];
    this.word = res['results'][0].lexicalEntries;
    console.log(this.word,'**************rt');
    console.log(this.word[0].entries[0].senses[0].definitions[0],'check this word adcasdcasdc')  
    //console.log(this.word,'look here')
    //this.lexicalCategory = res['result'][0].lexicalEntries[0].entries[0]
     //  this.domains = this.word[0].entries[0].senses[0].domains;
    this.definitions  = (this.word[0].entries[0].senses[0].definitions)?this.word[0].entries[0].senses[0].definitions:this.word[0].entries[0].senses[0].definitions[0];
    this.examples     = (this.word[0].entries[0].senses[0].examples)?this.word[0].entries[0].senses[0].examples:this.word[0].entries[0].senses[0].examples;
    this.shortdefinations = (this.word[0].entries[0].senses[0].example)?this.word[0].entries[0].senses[0].example:this.word[0].entries[0].senses[0].short_definitions;
     //  this.subsenses = this.word[0].entries[0].senses[0].subsenses[0].definitions;
     //  this.subdomains = this.word[0].entries[0].senses[0].subsenses[0].domains;
     //  this.subShortdef =  this.word[0].entries[0].senses[0].subsenses[0].domains;
    //console.log( this.subShortdef, this.subdomains,this.subsenses,this.shortdefinations,this.examples,this.definitions,this.domains,'all array')
      this.word.forEach((element) => {
        this.lexicalCategory.push(element.lexicalCategory)
        
      })
      console.log(this.lexicalCategory, 'please check this')
    }else{
      this.router.navigate(['/error'])
    }

    })
  }
   playAudio(){
    this.audio;
    this.audio = this.word[0].pronunciations[0].audioFile;
    let audio = new Audio();
    audio.src = this.audio;
    audio.load();
    audio.play();    
   }

}
