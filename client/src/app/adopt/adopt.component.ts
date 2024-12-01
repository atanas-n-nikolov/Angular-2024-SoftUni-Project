import { Component, OnInit } from '@angular/core';
import { SupportArticleComponent } from "../shared/support-article/support-article.component";
import { Animals } from '../types/animal';
import { ApiService } from '../api.service';
import { AnimalCardComponent } from '../shared/animal-card/animal-card.component';

@Component({
  selector: 'app-adopt',
  standalone: true,
  imports: [SupportArticleComponent, AnimalCardComponent],
  templateUrl: './adopt.component.html',
  styleUrl: './adopt.component.css'
})
export class AdoptComponent implements OnInit{
  forAdopt: Animals[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getAdopt().subscribe((forAdopt) => {
      this.forAdopt = forAdopt;
    })
  }
}
