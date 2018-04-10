import { DocReview } from '../_models/doc_review';
import { DocReviewsComponent } from '../_doc-reviews/doc-reviews.component';
import { Component, Input, OnInit, NgModule, HostListener } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../app.module';


@Component({
  selector: 'app-rating',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})


export class RatingsComponent implements OnInit {

  @Input()
  public rating: number;

  constructor() { }
  ngOnInit() {
  }
}
