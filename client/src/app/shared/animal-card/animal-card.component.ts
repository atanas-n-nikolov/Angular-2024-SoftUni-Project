import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Animals } from '../../types/animal';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.css'
})
export class AnimalCardComponent {
  @Input() animal!: Animals;
}
