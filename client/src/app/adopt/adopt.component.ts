import { Component, OnInit } from '@angular/core';
import { SupportArticleComponent } from '../shared/support-article/support-article.component';
import { Animals } from '../types/animal';
import { ApiService } from '../api.service';
import { AnimalCardComponent } from '../shared/animal-card/animal-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adopt',
  standalone: true,
  imports: [SupportArticleComponent, AnimalCardComponent, FormsModule],
  templateUrl: './adopt.component.html',
  styleUrl: './adopt.component.css',
})
export class AdoptComponent implements OnInit {
  forAdopt: Animals[] = [];
  filteredAnimals: Animals[] = [];
  animalLocations: string[] = [];
  filterCriteria = {
    type: '',
    age: '',
    size: '',
    gender: '',
    specialNeeds: '',
    location: '',
  };
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getAdopt().subscribe((forAdopt) => {
      this.forAdopt = forAdopt;
      this.filteredAnimals = [...forAdopt];
      this.getAnimalLocations();
    });
  }

  getAnimalLocations(): void {
    const location = this.filteredAnimals.map((animal) => animal.location);
    this.animalLocations = [...new Set(location)];
  }

  applyFilter(): void {
    this.filteredAnimals = this.forAdopt.filter((animal) => {
      return (
        (!this.filterCriteria.type || animal.type === this.filterCriteria.type) &&
        (!this.filterCriteria.age || animal.age === this.filterCriteria.age) &&
        (!this.filterCriteria.size || animal.size === this.filterCriteria.size) &&
        (!this.filterCriteria.gender || animal.gender === this.filterCriteria.gender) &&
        (!this.filterCriteria.specialNeeds ||
          animal.specialNeeds === this.filterCriteria.specialNeeds) &&
        (!this.filterCriteria.location || animal.location === this.filterCriteria.location)
      );
    });
  }

  clearFilter(): void {
    this.filterCriteria = {
      type: '',
      age: '',
      size: '',
      gender: '',
      specialNeeds: '',
      location: '',
    };
    this.filteredAnimals = [...this.forAdopt];
  }
}
