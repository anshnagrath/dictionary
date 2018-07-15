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
  public antonyms = [];
  public syno;
  public synonyms = [];

  public entities;
  public definitions;res;
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
      if (res && res['results']) this.inflectionName = res['results'][0]['id'];
      if (res && res['results']) this.inlfection = res['results']
    })
    this.appService.getSnoAno(this.lang,this.word).then((res)=>{
    console.log(res,'syno ano')
        this.antonyms = [];
        this.synonyms = [];
      this.syno = res['results'][0].lexicalEntries;
    this.syno.forEach((element)=>{
    let obj = {};
    let obj1 = {};
    let lex = element.lexicalCategory;


    element.entries.forEach((ele)=>{
      obj ={}
      obj1 ={}
    ele.senses.forEach((sense)=>{
       obj={}
       obj1 = {}
        if(sense.antonyms) sense.antonyms.forEach((ana)=>{
        obj = {}
        obj['lexCat']= lex;
        obj['antonyms']= ana.text ;
        this.antonyms.push(obj);
        console.log(this.antonyms,'obj check')

         })
        if(sense.synonyms) sense.synonyms.forEach((syno)=>{
          obj1={}
          obj1['lexCat']= lex;
          obj1['synonym']= syno.text
          this.synonyms.push(obj1)
        })
      })

    })


    })
    console.log(this.antonyms,'please')
    })
    this.appService.getentries(this.lang, this.word).then((res) => {
    console.log(res,'res check')
   if(res){
     this.res =res;
    this.lexicalCategory = [];
    this.word = res['results'][0].lexicalEntries;
    console.log(this.word,'**************rt');

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
