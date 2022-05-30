import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlphabetService } from './alphabet.service';

const EMPTY = '⬜️';
const WRONG = '🟨';
const CORRECT = '🟩';

@Injectable({ providedIn: 'root' })
export class SozlerService {
  public submitted$ = new EventEmitter();
  public removed$ = new EventEmitter();
  public restart$ = new EventEmitter();
  public lastLetter$ = new BehaviorSubject('');
  public isGameOver$ = new BehaviorSubject(false);

  public emptyLetters$ = new BehaviorSubject('');
  public wrongLetters$ = new BehaviorSubject('');
  public correctLetters$ = new BehaviorSubject('');

  constructor(private alphabetService: AlphabetService) {}

  public restart() {
    this.isGameOver$.next(false);
    this.emptyLetters$.next('');
    this.wrongLetters$.next('');
    this.correctLetters$.next('');
    this.lastLetter$.next('');
    this.restart$.emit();
  }

  public getRandomWord() {
    return this.alphabetService.getRandomWord();
  }

  public isWordExists(word: string) {
    return this.alphabetService.isWordExists(word);
  }

  public isCorrect(attempts: string[][], row: number, i: number) {
    return attempts[row] && attempts[row][i] && attempts[row][i] === CORRECT;
  }

  public isWrong(attempts: string[][], row: number, i: number) {
    return attempts[row] && attempts[row][i] && attempts[row][i] === WRONG;
  }

  public verifyInput(solution: string, attempt: string) {
    const solutionLetters = [...solution];
    const attemptLetters = [...attempt];

    return attemptLetters
      .map((item, index) => {
        const isCorrect = item === solutionLetters[index];

        if (isCorrect) {
          solutionLetters[index] = CORRECT;
          this.correctLetters$.next(item);

          return CORRECT;
        }

        return item;
      })
      .map((item) => {
        if (item === CORRECT) return item;

        const found = solutionLetters.indexOf(item);

        if (found >= 0) {
          solutionLetters[found] = WRONG;
          this.wrongLetters$.next(item);

          return WRONG;
        }

        this.emptyLetters$.next(item);
        return EMPTY;
      });
  }
}
