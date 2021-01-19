## Alles onder elkaar ipv achter elkaar
Willen we dit implementeren op de bestaande Questions + CheckerPage components? Of maken we een nieuwe "view" die een optimale weergave voor collega's geeft?


Willen we een losse view voor collega's? 
 - moet dit een losse pagina zijn.  
```
Dit is een andere flow. Het is dus logisch hier een apparte pagina van te maken.  Componenten en functies kunnen we blijven gebruiken. 
```
 - Hoe gaan we om met wijzigen van vragen.
```
Ik ben er van uit gegaan dat we hier mee bedoelen op de toekomstige vragen. 
Op het moment dat de toekomstige vragen niet wijzigen is deze vraag ook niet van toepassing

Update van het aanvraagformulier gaat op dezelfde manier als we ook sttr files updaten. 
```
 - Doen we elke answer al gelijk handlen, of alles on submit? 
```
Dit is afhankelijk van of de vragen wijzigen. Naar alle waarschijnlijkheid is dit niet het geval. En is er dus geen reden om elke vraag gelijk te handelen en kunnen we dit het beste behandelen als een formulier. ``` 
```
- Hoe gaan we om met herhalende vragen in het aanvraagformulier? 
```
Bijvoorbeeld, in de situatie van meerdere bomen op een kaart? 
Gaan we dan er vanuit dat er bij elke boom ongeveer dezelfde informatie geven moet worden? Waarschijnlijk niet.
Maar herhalen we dan het hele formulier voor elke boom? 
Of herhalen we elke vraag meerdere keren? 
Dit is Annick op dit momment nog het onderzoeken. 
```
 - Wat moet er voor gebeuren? 
 ```
Dit moet er gedaan worden: 
 - We hebben een functie nodig die correct de routes afhandelt van de dev homepage naar de juiste formulier 
 - De routes array moet uitgebreid worden met type formulier (checker|aanvraag). 
 - We moeten een page aanvragen hebben
 - Mochten we een functie op meerdere plekken nodig hebben moet deze geexporteerd worden, en misschien verplaats. 
 - Functie voor submit hele pagina
 - Autofill maken om vragen te beantwoorden op basis van informatie die voor ons al beschikbaar is. 
 - Testen schrijven
 - Formulier uitkomsten opslaan als PDF
```
- Functionaliteiten lijst 
```
Correct route handling from dev home
```

 - Hoeveel werk is het? 
```
Ik zou rekenen op een POC in 1 sprint. 
Frontend + Backend
```

Zijn er nog meer opties? 
```
We zouden ook de huidige pagina kunnen ombouwen om meerdere vragen te tonen. 
Het nadeel hier van is, dat we de page op een andere manier gaan gebruiken dan hij bedoelt is. 

Dus betekent dat we dus functies moeten aanpassen of toevoegen. En dat de page minder overzichtelijk wordt. En de kans op bugs toe neemt. 

```

