import { Component, Input, OnInit } from '@angular/core';
import { Animals } from '../../types/animal';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
animal: any = {
  status: 'Adopt',
  name: '',
  type: 'Dog',
  age: 'Young',
  size: 'Small',
  gender: 'Male',
  specialNeeds: 'Yes',
  location: '',
  image: '',
  description: '',
};

constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if(id) {
    this.apiService.getAnimal(id).subscribe((animal) => {
      this.animal = animal;
    })
  }
}

editAnimal() {
  this.apiService.updateAnimal(this.animal._id, this.animal).subscribe(() => {
    alert('Animal updated successfully!');
    this.router.navigate([`/animals/${this.animal._id}/details`])
  })
}

cancelForm() {
  const id = this.route.snapshot.paramMap.get('id');
  this.router.navigate([`/animals/${id}/details`])
}
}
