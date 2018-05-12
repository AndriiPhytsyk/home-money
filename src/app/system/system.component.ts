import {Component, HostBinding} from '@angular/core';
import {fadeTrigger} from '../shared/animations/fade.animations';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  animations: [fadeTrigger]
})
export class SystemComponent {
  @HostBinding('@fade') a = true;
}
