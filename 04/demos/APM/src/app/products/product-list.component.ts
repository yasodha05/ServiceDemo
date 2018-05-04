import {
  Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewChildren, QueryList,
  Renderer2
} from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    showImage: boolean;
    listFilter: string;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    @ViewChild('filterElement') filterElementRef: ElementRef;
    private _sub: Subscription;
    @ViewChild(NgModel) filterInput: NgModel;
    // @ViewChildren('filterElement, nameElement')
    // inputElementRefs: QueryList<ElementRef>;
    // @ViewChildren(NgModel)
    // inputElementRefs: QueryList<NgModel>;

    // Needed when using an ngIf around the element
    // private _filterInput: NgModel;

    // get filterInput(): NgModel {
    //     return this._filterInput;
    // }

    // @ViewChild(NgModel)
    // set filterInput(value: NgModel) {
    //     this._filterInput = value;
    //     console.log(this.filterInput);
    //     if (this.filterInput && !this._sub) {
    //         console.log('Subscribing');
    //         this._sub = this.filterInput.valueChanges.subscribe(
    //             () => {
    //                 this.performFilter(this.listFilter);
    //                 console.log('Performed the filter');
    //             }
    //         );
    //     }
    //     if (this.filterElementRef) {
    //         this.filterElementRef.nativeElement.focus();
    //     }
    // }

    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService,private renderer:Renderer2) { }

    ngAfterViewInit(): void {
        this.filterInput.valueChanges.subscribe(
            () => this.performFilter(this.listFilter)
        );
        if (this.filterElementRef) {
            this.filterElementRef.nativeElement.focus();
        }

        // console.log(this.inputElementRefs);
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
