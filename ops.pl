ti.
fe.
fi.
te.
se.
ni.
ne.
si.

consume.
sleep.
blast.
play.

animal(consume).
animal(sleep).
animal(blast).
animal(play).

di(ti).
di(fi).
de(te).
de(fe).
oi(ni).
oi(si).
oe(ne).
oe(se).

function(ti).
function(fe).
function(fi).
function(te).
function(se).
function(ni).
function(ne).
function(si).

introverted(ti).
introverted(fi).
introverted(si).
introverted(ni).
introverted(consume).
introverted(sleep).

extroverted(te).
extroverted(fe).
extroverted(se).
extroverted(ne).
extroverted(blast).
extroverted(play).

energy(play).
energy(sleep).
info(blast).
info(consume).

axis(ti,fe).
axis(fe,ti).
axis(fi,te).
axis(te,fi).
axis(si,ne).
axis(ne,si).
axis(ni,se).
axis(se,ni).

oppositeDirection(F1,F2):- introverted(F1),extroverted(F2);extroverted(F1),introverted(F2).

observer(se).
observer(ni).
observer(ne).
observer(si).

decider(ti).
decider(fi).
decider(fe).
decider(te).

mbtiType(F1,F2,F3,F4) :-
  observer(F1),
  decider(F2),
  decider(F3),
  observer(F4),
  axis(F1,F4),
  axis(F2,F3),
  oppositeDirection(F1,F2),
  oppositeDirection(F3,F4).

mbtiType(F1,F2,F3,F4) :-
  decider(F1),
  observer(F2),
  observer(F3),
  decider(F4),
  axis(F1,F4),
  axis(F2,F3),
  oppositeDirection(F1,F2),
  oppositeDirection(F3,F4).


animal(X,Y,consume) :- di(X), oe(Y); oe(X), di(Y).
animal(X,Y,blast):- oi(X), de(Y); de(X), oi(Y).
animal(X,Y,play):- oe(X), de(Y); de(X), oe(Y).
animal(X,Y,sleep):- oi(X), di(Y); di(X), oi(Y).

all_different(A1, A2, A3, A4) :-
    dif(A1, A2),
    dif(A1, A3),
    dif(A1, A4),
    dif(A2, A3),
    dif(A2, A4),
    dif(A3, A4).

animalOrder(F1,F2,F3,F4,A1,A2,A3,A4,SavF1,SavF2):-
  %standard
  mbtiType(F1,F2,F3,F4),
  animal(F1,F2,A1), %A
  animal(F2,F4,A2), %B
  animal(F1,F3,A3), %C
  animal(F3,F4,A4), %D
  all_different(A1,A2,A3,A4), 
  SavF1 = F1,
  SavF2 = F2;

  mbtiType(F1,F2,F3,F4),
  animal(F1,F2,A1), %A
  animal(F2,F4,A2), %B
  animal(F3,F4,A3), %D
  animal(F1,F3,A4), %C
  all_different(A1,A2,A3,A4), 
  SavF1 = F1,
  SavF2 = F2;

  mbtiType(F1,F2,F3,F4),
  animal(F1,F2,A1), %A
  animal(F1,F3,A2), %C
  animal(F2,F4,A3), %B
  animal(F3,F4,A4), %D
  all_different(A1,A2,A3,A4), 
  SavF1 = F1,
  SavF2 = F2;

  mbtiType(F1,F2,F3,F4),
  animal(F1,F2,A1), %A
  animal(F1,F3,A2), %C
  animal(F3,F4,A3), %D
  animal(F2,F4,A4), %B
  all_different(A1,A2,A3,A4), 
  SavF1 = F1,
  SavF2 = F2;

  %jumpers
  mbtiType(F1,F2,F3,F4),
  animal(F1,F3,A1), %C
  animal(F1,F2,A2), %A
  animal(F2,F4,A3), %B
  animal(F3,F4,A4), %D
  all_different(A1,A2,A3,A4), 
  SavF1 = F1,
  SavF2 = F3;

  mbtiType(F1,F2,F3,F4),
  animal(F1,F3,A1), %C
  animal(F1,F2,A2), %A
  animal(F3,F4,A3), %D
  animal(F2,F4,A4), %B
  all_different(A1,A2,A3,A4), 
  SavF1 = F1,
  SavF2 = F3;

  mbtiType(F1,F2,F3,F4),
  animal(F1,F3,A1), %C
  animal(F3,F4,A2), %D
  animal(F1,F2,A3), %A
  animal(F2,F4,A4), %B
  all_different(A1,A2,A3,A4), 
  SavF1 = F1,
  SavF2 = F3;

  mbtiType(F1,F2,F3,F4),
  animal(F1,F3,A1), %C
  animal(F3,F4,A2), %D
  animal(F2,F4,A3), %B
  animal(F1,F2,A4), %A
  all_different(A1,A2,A3,A4),
  SavF1 = F1,
  SavF2 = F3.

  print_animal_orders :-
    animalOrder(F1,F2,F3,F4,A1,A2,A3,A4,SavF1,SavF2),
    format('~w/~w ~w ~w ~w ~w ~w ~w ~w ~w~n', [SavF1,SavF2,F1,F2,F3,F4,A1,A2,A3,A4]),
    fail.



