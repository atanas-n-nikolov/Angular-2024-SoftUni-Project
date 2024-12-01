import { Component, OnInit } from '@angular/core';
import { Animals } from '../types/animal'
import { ApiService } from '../api.service';
import { SupportArticleComponent } from "../shared/support-article/support-article.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SupportArticleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  forAdopt: Animals[] = [];
  foundAndLost: Animals[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getLatestAdopt().subscribe((forAdopt) => {
      this.forAdopt = forAdopt;
    });
    this.apiService.lostAndFoundLatest().subscribe((foundAndLost) => {
      this.foundAndLost = foundAndLost;
    })
  }
}
