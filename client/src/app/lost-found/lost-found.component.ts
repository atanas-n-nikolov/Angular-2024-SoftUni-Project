import { Component, OnInit } from '@angular/core';
import { SupportArticleComponent } from '../shared/support-article/support-article.component';
import { AnimalCardComponent } from '../shared/animal-card/animal-card.component';
import { Animals } from '../types/animal';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lost-found',
  standalone: true,
  imports: [SupportArticleComponent, AnimalCardComponent, FormsModule],
  templateUrl: './lost-found.component.html',
  styleUrl: './lost-found.component.css',
})
export class LostFoundComponent implements OnInit {
  lostAndFound: Animals[] = [];
  filteredAnimals: Animals[] = [];
  animalLocations: string[] = [];
  filterCriteria = {
    status: '',
    type: '',
    gender: '',
    location: '',
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getLostAndFound().subscribe((lostAndFound) => {
      this.lostAndFound = lostAndFound;
      this.filteredAnimals = [...lostAndFound];
      this.getAnimalLocations();
    });
  }

  getAnimalLocations(): void {
    const location = this.filteredAnimals.map((animal) => animal.location);
    this.animalLocations = [...new Set(location)];
  }

  applyFilter(): void {
    this.filteredAnimals = this.lostAndFound.filter((animal) => {
      return (
        (!this.filterCriteria.status || animal.status === this.filterCriteria.status) &&
        (!this.filterCriteria.type || animal.type === this.filterCriteria.type) &&
        (!this.filterCriteria.gender || animal.gender === this.filterCriteria.gender) &&
        (!this.filterCriteria.location || animal.location === this.filterCriteria.location)
      );
    });
    console.log("Filtered animals:", this.filteredAnimals);
  }

  clearFilter(): void {
    this.filterCriteria = {
      status: '',
      type: '',
      gender: '',
      location: '',
    };
    this.filteredAnimals = [...this.lostAndFound];
  }
}
