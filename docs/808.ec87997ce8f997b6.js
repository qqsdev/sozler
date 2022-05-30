"use strict";(self.webpackChunksozler=self.webpackChunksozler||[]).push([[808],{808:(Ft,j,u)=>{u.r(j),u.d(j,{SozlerModule:()=>At});var p=u(9808),x=u(8099),X=u(7423),V=u(4594),q=u(3118),P=u(3697);function k(e,t,n,r){var c,s=arguments.length,i=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(c=e[l])&&(i=(s<3?c(i):s>3?c(t,n,i):c(t,n))||i);return s>3&&i&&Object.defineProperty(t,n,i),i}var G=u(5529),nt=u(2654),o=(u(5254),u(8896),u(8139),u(5e3));u(1709),u(3489),u(9312),u(7221);var ht=u(7625);const dt=o.GuJ,pt=Symbol("__destroy"),K=Symbol("__decoratorApplied");function B(e){return"string"==typeof e?Symbol(`__destroy__${e}`):pt}function R(e,t){e[t]||(e[t]=new G.xQ)}function N(e,t){e[t]&&(e[t].next(),e[t].complete(),e[t]=null)}function W(e){e instanceof nt.w&&e.unsubscribe()}function J(e,t){return function(){var n;if(e&&e.call(this),N(this,B()),t.arrayName&&function yt(e){Array.isArray(e)&&e.forEach(W)}(this[t.arrayName]),t.checkProperties)for(const r in this)(null===(n=t.blackList)||void 0===n?void 0:n.includes(r))||W(this[r])}}function E(e={}){return t=>{!function ft(e){return!!e[dt]}(t)?function mt(e,t){e.prototype.ngOnDestroy=J(e.prototype.ngOnDestroy,t)}(t,e):function bt(e,t){const n=e.\u0275pipe;n.onDestroy=J(n.onDestroy,t)}(t,e),function gt(e){e.prototype[K]=!0}(t)}}function f(e,t){return n=>{const r=B(t);return"string"==typeof t?function wt(e,t,n){const r=e[t];R(e,n),e[t]=function(){r.apply(this,arguments),N(this,n),e[t]=r}}(e,t,r):R(e,r),n.pipe((0,ht.R)(e[r]))}}Symbol("CheckerHasBeenSet");var Y=u(591),D=u(4966),T=u(4649),v=u(2198),$=u(2868);function Ct(e,t){if(1&e&&(o.TgZ(0,"div",6),o._uU(1),o.qZA()),2&e){const n=t.$implicit,r=t.index,s=o.oxw().index,i=o.oxw();o.ekj("current-row",s===i.currentRow)("wrong",i.isWrong(s,r))("correct",i.isCorrect(s,r)),o.xp6(1),o.hij(" ",n," ")}}function Ot(e,t){if(1&e&&(o.TgZ(0,"div",3)(1,"div",4),o.YNc(2,Ct,2,7,"div",5),o.qZA()()),2&e){const n=t.$implicit,r=o.oxw();o.ekj("incorrect",r.incorrectWord),o.xp6(2),o.Q6J("ngForOf",n)}}function _t(e,t){if(1&e&&(o.ynx(0),o.TgZ(1,"a",7)(2,"mat-icon"),o._uU(3,"auto_stories"),o.qZA(),o._uU(4),o.qZA(),o.BQk()),2&e){const n=o.oxw();o.xp6(1),o.Q6J("href",n.wikiLink(),o.LSH),o.xp6(3),o.hij(" ",n.solution," ")}}let m=class{constructor(t,n){this.sozler=t,this.alphabet=n,this.solution="",this.attemptsCount=13,this.wordFoundEvent=new o.vpe,this.isGameOver$=this.sozler.isGameOver$,this.guesses=[],this.attempts=[],this.currentIndex=0,this.currentRow=0,this.incorrectWord=!1,this.wordFound=!1,this.subscribtions=[]}ngOnInit(){this.initialize()}wikiLink(){return`https://uz.wiktionary.org/wiki/${this.alphabet.convertToLatin(this.solution)}`}isCorrect(t,n){return this.sozler.isCorrect(this.attempts,t,n)}isWrong(t,n){return this.sozler.isWrong(this.attempts,t,n)}initialize(){this.solution=this.solution||this.sozler.getRandomWord(),this.guesses=(5,Array.apply(null,Array(this.attemptsCount)).map(()=>Array(5))),this.currentGuess=this.guesses[0],this.currentRow=0,this.currentIndex=0,this.attempts=[],this.incorrectWord=!1,this.wordFound=!1,this.unsubscribeFromEvents(),this.subscribeToEvents()}unsubscribeFromEvents(){if(this.subscribtions.length)for(const t of this.subscribtions)t.unsubscribe();this.subscribtions=[]}subscribeToEvents(){this.subscribtions.push(this.sozler.restart$.pipe(f(this)).subscribe(()=>this.initialize())),this.subscribtions.push(this.sozler.lastLetter$.pipe(f(this),(0,v.h)(()=>!this.wordFound),(0,v.h)(t=>!!t),(0,v.h)(()=>this.currentIndex<5),(0,$.b)(()=>this.incorrectWord=!1)).subscribe(t=>{if(this.currentGuess&&(this.currentGuess[this.currentIndex]=t,this.currentIndex=this.currentIndex+1,this.currentGuess.length)){const n=this.currentGuess.join("").toLowerCase().trim();5===n.length&&(this.sozler.isWordExists(n)||(this.incorrectWord=!0))}})),this.subscribtions.push(this.sozler.removed$.pipe(f(this),(0,v.h)(()=>!this.wordFound),(0,v.h)(()=>this.currentIndex>0),(0,$.b)(()=>this.incorrectWord=!1)).subscribe(()=>{this.currentGuess&&(this.currentIndex=this.currentIndex-1,this.currentGuess[this.currentIndex]="")})),this.subscribtions.push(this.sozler.submitted$.pipe(f(this),(0,v.h)(()=>!this.wordFound),(0,$.b)(()=>this.incorrectWord=!1)).subscribe(()=>{if(!this.currentGuess||!this.currentGuess.length)return;const t=this.currentGuess.join("").toLowerCase().trim();5===t.length&&(this.sozler.isWordExists(t)?(this.attempts[this.currentRow]=this.sozler.verifyInput(this.solution,t),this.currentRow=this.currentRow+1,this.currentIndex=0,this.currentGuess=this.guesses[this.currentRow],t===this.solution&&(this.wordFound=!0,this.wordFoundEvent.emit(!0))):this.incorrectWord=!0),this.currentRow>=this.attemptsCount&&(this.sozler.isGameOver$.next(!0),this.wordFoundEvent.emit(!1))}))}};function Mt(e,t){if(1&e){const n=o.EpF();o.ynx(0),o.TgZ(1,"div",5),o.NdJ("click",function(){const i=o.CHM(n).$implicit;return o.oxw(2).onKeypress({key:i,code:""})}),o._uU(2),o.qZA(),o.BQk()}if(2&e){const n=t.$implicit,r=o.oxw(2);o.xp6(1),o.ekj("correct",r.isCorrect(n))("wrong",r.isWrong(n))("empty",r.isEmpty(n)),o.xp6(1),o.hij(" ",n," ")}}m.\u0275fac=function(t){return new(t||m)(o.Y36(D.R),o.Y36(T.v))},m.\u0275cmp=o.Xpm({type:m,selectors:[["app-guesses"]],inputs:{solution:"solution",attemptsCount:"attemptsCount"},outputs:{wordFoundEvent:"wordFoundEvent"},decls:4,vars:4,consts:[["class","guess-grid",3,"incorrect",4,"ngFor","ngForOf"],[1,"solution"],[4,"ngIf"],[1,"guess-grid"],[1,"guess-row"],["class","guess-letter",3,"current-row","wrong","correct",4,"ngFor","ngForOf"],[1,"guess-letter"],["target","_blank",3,"href"]],template:function(t,n){1&t&&(o.YNc(0,Ot,3,3,"div",0),o.TgZ(1,"div",1),o.YNc(2,_t,5,2,"ng-container",2),o.ALo(3,"async"),o.qZA()),2&t&&(o.Q6J("ngForOf",n.guesses),o.xp6(2),o.Q6J("ngIf",o.lcZ(3,2,n.isGameOver$)))},directives:[p.sg,p.O5,x.Hw],pipes:[p.Ov],styles:[".guess-grid[_ngcontent-%COMP%]   .guess-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(5,1fr)}.guess-grid[_ngcontent-%COMP%]   .guess-row[_ngcontent-%COMP%]   .guess-letter[_ngcontent-%COMP%]{min-width:2rem;aspect-ratio:.9;background-color:#222;border:1px solid white;font-weight:500;font-size:1.4rem;line-height:1.4rem;text-align:center;display:grid;place-items:center}.guess-grid[_ngcontent-%COMP%]   .guess-row[_ngcontent-%COMP%]   .guess-letter.wrong[_ngcontent-%COMP%]{background-color:#e6b31a}.guess-grid[_ngcontent-%COMP%]   .guess-row[_ngcontent-%COMP%]   .guess-letter.correct[_ngcontent-%COMP%]{background-color:#80bf40}.guess-grid.incorrect[_ngcontent-%COMP%]   .guess-letter.current-row[_ngcontent-%COMP%]{color:red}.solution[_ngcontent-%COMP%]{min-height:2.3rem;padding:.5rem;font-size:1.1rem;font-weight:500;text-align:center;text-transform:uppercase}.solution[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;gap:.3rem;color:#ddd}.solution[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#fff}@media (max-width: 400px){.solution[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff}}"]}),m=k([E()],m);const kt=function(e){return[e]};function zt(e,t){if(1&e){const n=o.EpF();o.ynx(0),o.TgZ(1,"div",1),o.YNc(2,Mt,3,7,"ng-container",2),o.TgZ(3,"div",3),o.NdJ("click",function(){return o.CHM(n),o.oxw().onKeypress({key:"Backspace",code:"Backspace"})}),o.TgZ(4,"mat-icon"),o._uU(5,"backspace"),o.qZA()(),o.TgZ(6,"div",4),o.NdJ("click",function(){return o.CHM(n),o.oxw().onKeypress({key:"Enter",code:"Enter"})}),o.TgZ(7,"mat-icon"),o._uU(8,"keyboard_return"),o.qZA()()(),o.BQk()}if(2&e){const n=t.ngIf;o.xp6(1),o.Q6J("ngClass",o.VKq(2,kt,n.cssClass)),o.xp6(1),o.Q6J("ngForOf",n.letters)}}let b=class{constructor(t,n){this.sozler=t,this.alphabet=n,this.keyboardEvent=new o.vpe,this.currentAlphabet$=this.alphabet.current$,this.emptyLetters=[],this.wrongLetters=[],this.correctLetters=[],this.lastKey="",this.shortcuts=""}ngOnInit(){this.sozler.restart$.pipe(f(this)).subscribe(()=>{this.emptyLetters=[],this.wrongLetters=[],this.correctLetters=[],this.lastKey=""}),this.sozler.emptyLetters$.pipe(f(this)).subscribe(t=>{this.emptyLetters.push(t)}),this.sozler.wrongLetters$.pipe(f(this)).subscribe(t=>{this.wrongLetters.push(t)}),this.sozler.correctLetters$.pipe(f(this)).subscribe(t=>{this.correctLetters.push(t)}),this.alphabet.current$.pipe(f(this)).subscribe(t=>{this.shortcuts=t.shortcuts})}onKeypress({key:t,code:n}){const r=this.currentAlphabet$.value;let s=t.toUpperCase();if("Enter"!==n){if(r.letters.includes("\xc7")&&"KeyC"===n&&(s="\xc7"),r.letters.includes("\u015e")&&("S"===this.lastKey&&"KeyH"===n&&(s="\u015e",this.sozler.removed$.emit()),"\u015e"===this.lastKey&&"Backspace"===n))return this.sozler.removed$.emit(),s="S",this.lastKey=s,void this.keyboardEvent.emit(s);if("Quote"===n&&("O"===this.lastKey&&(s="\xd5",this.sozler.removed$.emit()),"G"===this.lastKey&&(s="\u011e",this.sozler.removed$.emit())),"Backspace"===n)if(this.sozler.removed$.emit(),"\xd5"===this.lastKey)s="O";else{if("\u011e"!==this.lastKey)return;s="G"}this.lastKey=s,r.letters.includes(s)&&this.keyboardEvent.emit(s)}else this.sozler.submitted$.emit()}isWrong(t){return this.wrongLetters.includes(t.toLowerCase())}isCorrect(t){return!this.isWrong(t)&&this.correctLetters.includes(t.toLowerCase())}isEmpty(t){return!this.isCorrect(t)&&this.emptyLetters.includes(t.toLowerCase())}};function St(e,t){if(1&e){const n=o.EpF();o.ynx(0),o.TgZ(1,"app-guesses",5),o.NdJ("wordFoundEvent",function(){const i=o.CHM(n).$implicit;return o.oxw().handleWordFound(i)}),o.ALo(2,"async"),o.qZA(),o.BQk()}if(2&e){const n=t.$implicit,r=o.oxw();o.xp6(1),o.Q6J("solution",n.word)("attemptsCount",o.lcZ(2,2,r.attemptsCount$)||r.defaultAttemptsCount)}}b.\u0275fac=function(t){return new(t||b)(o.Y36(D.R),o.Y36(T.v))},b.\u0275cmp=o.Xpm({type:b,selectors:[["app-keyboard"]],hostBindings:function(t,n){1&t&&o.NdJ("keydown",function(s){return n.onKeypress(s)},!1,o.evT)},outputs:{keyboardEvent:"keyboardEvent"},decls:2,vars:3,consts:[[4,"ngIf"],[1,"keyboard",3,"ngClass"],[4,"ngFor","ngForOf"],[1,"key","backspace",3,"click"],[1,"key","enter",3,"click"],[1,"key",3,"click"]],template:function(t,n){1&t&&(o.YNc(0,zt,9,4,"ng-container",0),o.ALo(1,"async")),2&t&&o.Q6J("ngIf",o.lcZ(1,1,n.currentAlphabet$))},directives:[p.O5,p.mk,p.sg,x.Hw],pipes:[p.Ov],styles:[".keyboard[_ngcontent-%COMP%]{max-width:100%;display:grid;grid-template-columns:repeat(10,1fr)}.keyboard.cyrillic[_ngcontent-%COMP%]{grid-template-columns:repeat(12,1fr)}.keyboard.cyrillic[_ngcontent-%COMP%]   .enter[_ngcontent-%COMP%]{grid-column:11/13;grid-row:2/4}.keyboard.cyrillic[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]:nth-child(21){grid-column:11;grid-row:2;z-index:2}.keyboard.latin[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]:nth-child(19){grid-column:9;grid-row:2;z-index:2}.keyboard.latin[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]:nth-child(20){grid-column:10;grid-row:2;z-index:2}.keyboard.turkish-latin[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]:nth-child(19){grid-column:9;grid-row:2;z-index:2}.keyboard.turkish-latin[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]:nth-child(20){grid-column:10;grid-row:2;z-index:2}.keyboard.turkish-latin[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]:nth-child(28){grid-column:9;grid-row:3;z-index:2}.keyboard[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]{cursor:pointer;padding:.5rem;background-color:#222;border:1px solid white;font-weight:500;font-size:1.4rem;line-height:1.4rem;text-align:center;display:flex;align-items:center;justify-content:center}.keyboard[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]:hover{background-color:#444}.keyboard[_ngcontent-%COMP%]   .key.empty[_ngcontent-%COMP%]{background-color:gray}.keyboard[_ngcontent-%COMP%]   .key.wrong[_ngcontent-%COMP%]{background-color:#d9ac26}.keyboard[_ngcontent-%COMP%]   .key.correct[_ngcontent-%COMP%]{background-color:#80b34d}.keyboard[_ngcontent-%COMP%]   .backspace[_ngcontent-%COMP%]{grid-column:1;grid-row:3}.keyboard[_ngcontent-%COMP%]   .enter[_ngcontent-%COMP%]{padding-right:.6rem;padding-bottom:.5rem;grid-column:9/11;grid-row:2/4;display:flex;align-items:flex-end;justify-content:flex-end}@media (max-width: 400px){.keyboard.latin[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%], .keyboard.turkish-latin[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]{padding:.6rem .4rem}.keyboard.cyrillic[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]{padding:.6rem .2rem}}"]}),b=k([E()],b);class Dt{constructor(t,n,r=!1){this.index=t,this.word=n,this.found=r}}let y=class{constructor(t,n,r){this.route=t,this.sozler=n,this.alphabetService=r,this.defaultAttemptsCount=6,this.availableAlphabets=this.alphabetService.alphabets,this.currentAlphabet$=this.alphabetService.current$,this.games$=new Y.X([]),this.attemptsCount$=new Y.X(this.defaultAttemptsCount),this.wordsCount=1}ngOnInit(){this.alphabetService.getDefaultAlphabet(),this.route.paramMap.pipe(f(this)).subscribe(t=>{const n=t.get("words-count");n&&!Number.isNaN(n)&&(this.wordsCount=+n,this.restart())}),this.sozler.restart$.pipe(f(this)).subscribe(()=>this.createNewGame()),this.alphabetService.current$.pipe(f(this)).subscribe(()=>this.restart())}createNewGame(){const t=(e=this.wordsCount,Array.apply(null,Array(e)).map((t,n)=>n)).map(n=>new Dt(n,this.alphabetService.getRandomWord()));var e;this.games$.next([]),this.games$.next(t),this.attemptsCount$.next(this.calculateAttempsCount(this.wordsCount)),this.sozler.isGameOver$.next(!1)}handleKeyboardEvent(t){this.sozler.lastLetter$.next(t)}restart(){this.sozler.restart()}handleWordFound(t){t.found=!0,this.games$.value.every(r=>r.found)&&this.sozler.isGameOver$.next(!0)}calculateAttempsCount(t){return t>=8?13:t>=4?9:t>=2?7:6}};y.\u0275fac=function(t){return new(t||y)(o.Y36(P.gz),o.Y36(D.R),o.Y36(T.v))},y.\u0275cmp=o.Xpm({type:y,selectors:[["app-sozler"]],decls:7,vars:6,consts:[[1,"sozler","flex-column"],[4,"ngFor","ngForOf"],[1,"flex-spacer"],[1,"app-keyboard"],[3,"keyboardEvent"],[3,"solution","attemptsCount","wordFoundEvent"]],template:function(t,n){1&t&&(o.TgZ(0,"div",0)(1,"div"),o.YNc(2,St,3,4,"ng-container",1),o.ALo(3,"async"),o.qZA(),o._UZ(4,"div",2),o.TgZ(5,"div",3)(6,"app-keyboard",4),o.NdJ("keyboardEvent",function(s){return n.handleKeyboardEvent(s)}),o.qZA()()()),2&t&&(o.xp6(1),o.Gre("guesses-row words-count-",n.wordsCount,""),o.xp6(1),o.Q6J("ngForOf",o.lcZ(3,4,n.games$)))},directives:[p.sg,m,b],pipes:[p.Ov],styles:[".sozler[_ngcontent-%COMP%]{height:100%}.guesses-row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;column-gap:.6rem}.app-keyboard[_ngcontent-%COMP%]{position:sticky;bottom:0;z-index:1000;display:flex;justify-content:center;width:100%;padding-bottom:2px;background-color:#333}"]}),y=k([E()],y);const Tt=[{path:"",component:y},{path:":words-count",component:y}];let $t=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[P.Bz.forChild(Tt)],P.Bz]}),e})(),At=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[p.ez,$t,x.Ps,V.g0,X.ot,q.Tx]]}),e})()}}]);