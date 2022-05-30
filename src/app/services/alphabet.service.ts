import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { words as WORDS_LATIN } from '../words/five-letter-words_latin';
import { words as WORDS_TURKISH_LATIN } from '../words/five-letter-words_turkish_latin';
import { words as WORDS_CYRILLIC } from '../words/five-letter-words_cyrillic';
import { CYRILLIC_TO_LATIN_MAP } from '../words/cyrillic-to-latin-map';

const KEYS_UZ_LATIN = 'QERTYUIOÕPASDFGĞHJKLZXCVBNM'.split('');
const KEYS_UZ_TURKISH_LATIN = 'QERTYUIOÕPASDFGĞHJKLZXŞÇVBNM'.split('');
const KEYS_UZ_CYRILLIC = 'ЙЦУКЕНГШЎЗХҒФҚВАПРОЛДЖЭЯЧСМИТЁБЮ'.split('');

const LOCAL_STORAGE_KEYS = { CURRENT_ALPHABET: 'CURRENT_ALPHABET' };

export class Alphabet {
  public name!: string;
  public words!: string[];
  public letters!: string[];
  public cssClass?: string;
  public shortcuts?: string;
}

const ALPHABETS: Record<string, Alphabet> = {
  UZ_CYRILLIC: {
    name: 'Кирилл',
    words: WORDS_CYRILLIC,
    letters: KEYS_UZ_CYRILLIC,
    cssClass: 'cyrillic',
  },
  UZ_LATIN_NEW: {
    // name: 'Lotin 1995-hozirgi vaqt',
    name: 'Lotin',
    words: WORDS_LATIN,
    letters: KEYS_UZ_LATIN,
    cssClass: 'latin',
  },
  UZ_LATIN_OLD: {
    // name: 'Lotin (1993-1995)',
    name: 'Lotin (Ş va Ç)',
    words: WORDS_TURKISH_LATIN,
    letters: KEYS_UZ_TURKISH_LATIN,
    cssClass: 'turkish-latin',
  },
};

@Injectable({ providedIn: 'root' })
export class AlphabetService {
  public alphabets = Object.values(ALPHABETS);
  public current$ = new BehaviorSubject<Alphabet>(ALPHABETS.UZ_LATIN_NEW);

  public getDefaultAlphabet() {
    const savedName = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_ALPHABET);
    if (savedName) {
      const found = this.alphabets.find((a) => a.name === savedName);
      if (found) {
        this.current$.next(found);
      }
    }
  }

  public setAlphabet(alphabet: Alphabet) {
    this.current$.next(alphabet);
    localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_ALPHABET, alphabet.name);
  }

  public getRandomWord() {
    const current = this.current$.value;
    const random = Math.floor(Math.random() * current.words.length);
    return current.words[random];
  }

  public isWordExists(word: string) {
    const current = this.current$.value;
    return current.words.includes(word);
  }

  public convertToLatin(word: string) {
    if (word.startsWith('е')) {
      word = word.replace(/е/g, 'ye');
    }

    for (const [cyrillic, latin] of Object.entries(CYRILLIC_TO_LATIN_MAP)) {
      word = word.replace(new RegExp(cyrillic, 'g'), latin);
    }

    word = word
      .replace(/õ/g, "o'")
      .replace(/ğ/g, "g'")
      .replace(/ş/g, 'sh')
      .replace(/ç/g, 'ch');

    return word;
  }
}
