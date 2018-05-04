import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,
         Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;
  @Output() valueChange: EventEmitter<string> =
              new EventEmitter<string>();

  @ViewChild('filterElement') filterElementRef: ElementRef;

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log(value);
    this.valueChange.emit(value);
    console.log(this.valueChange);
  }

  constructor() {

  }

  ngAfterViewInit(): void {
       if (this.filterElementRef) {
        this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits:' + this.hitCount;
    }
  }

  ngOnInit() {
      }


}
