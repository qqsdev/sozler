import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SozlerService } from './sozler.service';

@Component({
  selector: 'app-sozler',
  templateUrl: './sozler.component.html',
  styleUrls: ['./sozler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SozlerComponent implements OnInit {
  constructor(private sozler: SozlerService) {}

  ngOnInit(): void {}

  handleKeyboardEvent(letter: string) {
    this.sozler.lastLetter$.next(letter);
  }

  public restart() {
    this.sozler.restart$.emit();
  }
}
