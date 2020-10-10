import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-show',
  templateUrl: './view-show.component.html',
  styleUrls: ['./view-show.component.scss']
})
export class ViewShowComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
       this.id = +params.id; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
  }

}
