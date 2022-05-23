import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { words } from '../words/five-letter-words_latin';
// import { words } from '../words/five-letter-words_cyrillic';

const EMPTY = '⬜️';
const WRONG = '🟨';
const CORRECT = '🟩';

const KEYS_EN_LATIN = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
const KEYS_UZ_LATIN = 'QERTYUIOÕPASDFGĞHJKLZXCVBNM'.split('');
const KEYS_UZ_CYRILLIC = 'ЙЦУКЕНГШЎЗХҒФҚВАПРОЛДЖЭЯЧСМИТЁБЮ'.split('');

@Injectable({ providedIn: 'root' })
export class SozlerService {
  public keys = KEYS_UZ_LATIN;
  public isCyrillc = this.keys === KEYS_UZ_CYRILLIC;

  public submitted$ = new EventEmitter();
  public removed$ = new EventEmitter();
  public restart$ = new EventEmitter();
  public lastLetter$ = new BehaviorSubject('');
  public isGameOver$ = new BehaviorSubject(false);

  public emptyLetters$ = new BehaviorSubject('');
  public wrongLetters$ = new BehaviorSubject('');
  public correctLetters$ = new BehaviorSubject('');

  public restart() {
    this.isGameOver$.next(false);
    this.emptyLetters$.next('');
    this.wrongLetters$.next('');
    this.correctLetters$.next('');
  }

  public getRandomWord() {
    const random = Math.floor(Math.random() * words.length);
    return words[random];
  }

  public isWordExists(word: string) {
    return words.includes(word);
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

  public isCorrect(attempts: string[][], row: number, i: number) {
    return attempts[row] && attempts[row][i] && attempts[row][i] === CORRECT;
  }

  public isWrong(attempts: string[][], row: number, i: number) {
    return attempts[row] && attempts[row][i] && attempts[row][i] === WRONG;
  }

  public changeKeyboardLanguageIfNeeded(code: string, letter: string) {
    if (!code) return;

    if (code.startsWith('Key')) {
      if (code[3] === letter) {
        this.keys = KEYS_UZ_LATIN;
      } else {
        this.keys = KEYS_UZ_CYRILLIC;
      }
      this.isCyrillc = this.keys === KEYS_UZ_CYRILLIC;
    }
  }
}
