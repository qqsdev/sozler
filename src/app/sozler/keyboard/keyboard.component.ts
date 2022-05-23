import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SozlerService } from '../sozler.service';

@UntilDestroy()
@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardComponent implements OnInit {
  @Output() keyboardEvent = new EventEmitter<string>();

  public keys = this.sozler.keys;
  public isCyrillc = this.sozler.isCyrillc;

  public emptyLetters: string[] = [];
  public wrongLetters: string[] = [];
  public correctLetters: string[] = [];

  private lastKey = '';

  constructor(private sozler: SozlerService) {}

  ngOnInit(): void {
    this.sozler.restart$.pipe(untilDestroyed(this)).subscribe(() => {
      this.emptyLetters = [];
      this.wrongLetters = [];
      this.correctLetters = [];
    });

    this.sozler.emptyLetters$.pipe(untilDestroyed(this)).subscribe((letter) => {
      this.emptyLetters.push(letter);
    });

    this.sozler.wrongLetters$.pipe(untilDestroyed(this)).subscribe((letter) => {
      this.wrongLetters.push(letter);
    });

    this.sozler.correctLetters$
      .pipe(untilDestroyed(this))
      .subscribe((letter) => {
        this.correctLetters.push(letter);
      });
  }

  @HostListener('document:keydown', ['$event'])
  public onKeypress({ key, code }: { key: string; code: string }) {
    let letter = key.toUpperCase();

    this.sozler.changeKeyboardLanguageIfNeeded(code, letter);

    if (code === 'Enter') {
      this.sozler.submitted$.emit();
      return;
    }

    if (code === 'Quote') {
      if (this.lastKey === 'O') {
        letter = 'Õ';
        this.sozler.removed$.emit();
      }
      if (this.lastKey === 'G') {
        letter = 'Ğ';
        this.sozler.removed$.emit();
      }
    }

    if (code === 'Backspace') {
      this.sozler.removed$.emit();

      if (this.lastKey === 'Õ') {
        letter = 'O';
      } else if (this.lastKey === 'Ğ') {
        letter = 'G';
      } else {
        return;
      }
    }

    this.lastKey = letter;

    if (this.keys.includes(letter)) {
      this.keyboardEvent.emit(letter);
    }
  }

  public isWrong(key: string) {
    return this.wrongLetters.includes(key.toLowerCase());
  }

  public isCorrect(key: string) {
    return (
      !this.isWrong(key) && this.correctLetters.includes(key.toLowerCase())
    );
  }

  public isEmpty(key: string) {
    return (
      !this.isCorrect(key) && this.emptyLetters.includes(key.toLowerCase())
    );
  }
}
