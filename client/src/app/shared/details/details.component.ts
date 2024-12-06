import { Component, OnInit } from '@angular/core';
import { Animals } from '../../types/animal';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
animal: Animals | undefined;
animalId: string | undefined;

constructor(private route: ActivatedRoute,
  private apiService: ApiService,
  private router: Router) {
}

ngOnInit(): void {
  this.animalId = this.route.snapshot.params['id'];
  if(this.animalId) {
    this.apiService.getAnimal(this.animalId).subscribe(animal => {
      this.animal = animal
    })
  }else {
    console.log('No animal id');
  }
}
}
