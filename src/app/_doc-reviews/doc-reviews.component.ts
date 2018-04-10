import { RatingsComponent } from '../_ratings/ratings.component';
import { DocReview } from '../_models/doc_review';
import { Component, OnInit, NgModule, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-doc-reviews',
  templateUrl: './doc-reviews.component.html',
  styleUrls: ['./doc-reviews.component.css']
})


export class DocReviewsComponent implements OnInit {

  public all_reviews: DocReview[];
  public model: DocReview;
  public name_check: boolean;
  public rating_check: boolean;
  public comment_check: boolean;
  public alert_msg: string;
  public reset: boolean;
  constructor() { }

  ngOnInit() {
    this.alert_msg = '';
    this.all_reviews = [];
    this.name_check = false;
    this.rating_check = false;
    this.comment_check = false;
    this.model = {};
    this.reset = false;
  }

  public addReview(myForm: any) {
    if (this.reset) {
      this.name_check = true;
      this.comment_check = true;
      this.rating_check = true;
      this.alert_msg = '';
    }
    if (!this.model.rating) {
      this.rating_check = false;
      this.alert_msg =  'Please enter something in the rating field before submitting!';
    } else {
      this.rating_check = true;
    }
    if (!this.model.comment) {
      this.comment_check = false;
      this.alert_msg = 'Please enter something in the comment field before submitting!';
    } else {
      this.comment_check = true;
    }
    if (!this.model.username) {
      this.name_check = false;
      this.alert_msg =  'Please enter something in the name field before submitting!';
    } else {
      this.name_check = true;
    }

    if (this.comment_check && this.name_check && this.rating_check) {
      this.reset = true;
      this.alert_msg = '';
      this.model.date = new Date(Date.now());
      this.all_reviews.push(this.model);
      this.model = {};
      console.log('you submitted value:', myForm);
      myForm.reset();
    } else {
      this.reset = true;
      this.model = {};
    }

  }
}
