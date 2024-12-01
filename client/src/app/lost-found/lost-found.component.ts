import { Component, OnInit } from '@angular/core';
import { SupportArticleComponent } from "../shared/support-article/support-article.component";
import { AnimalCardComponent } from '../shared/animal-card/animal-card.component';
import { Animals } from '../types/animal';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-lost-found',
  standalone: true,
  imports: [SupportArticleComponent, AnimalCardComponent],
  templateUrl: './lost-found.component.html',
  styleUrl: './lost-found.component.css'
})
export class LostFoundComponent implements OnInit{
  lostAndFound: Animals[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.lostAndFoundLatest().subscribe((lostAndFound) => {
      this.lostAndFound = lostAndFound;
    })
  }
}
