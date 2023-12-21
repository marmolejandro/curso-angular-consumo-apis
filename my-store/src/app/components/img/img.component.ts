import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrl: './img.component.scss'
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  img: string = '';

  @Input('img')
  set changeImg(newImg: string){
    this.img = newImg;
    // Code when img input changes
    // console.log('Change just img => ', this.img);
  }

  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://www.m2crowd.com/core/i/placeholder.png';
  // counter = 0;
  // counterFn : number | undefined;

  // ---------------------------------------------------------------------
  // Ciclos
  // ---------------------------------------------------------------------
  constructor(){
    // before render
    // NO async -- once time
    // console.log('Constructor: ', 'imgValue => ', this.img);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // before & during render
    // inputs changes -- many times - each change
    // console.log('ngOnChanges: ', 'imgValue => ', this.img);
    // console.log('Changes: ', changes);
  }
  ngOnInit(): void {
    // before render
    // async - fetch -- once time
    // console.log('ngOnInit: ', 'imgValue => ', this.img);

    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('run counter');
    // }, 1000);
  }
  // Grupo ngDoCheck
  ngAfterViewInit(): void {
    // after render
    // handler children
    // console.log('ngAfterViewInit');
  }
  ngOnDestroy(): void {
    // delete component
    // console.log('ngOnDestroy');
    // clearInterval(this.counterFn); // window
  }

  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------

  imgError(){
    this.img = this.imageDefault
  }

  @Output() imgLoaded(){
    // console.log('Log hijo')
    this.loaded.emit(this.img);
  }
}
