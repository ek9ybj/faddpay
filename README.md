FADD Pay
------
Beadandó feladat az ELTE IK - Projekt eszközök kurzushoz.

Rövid leírás
------

A projekt célja egy online fizetési és számlavezetési felület.

A felhasználók regisztráció után belső számlákat vezethetnek, feltölthetik azt külső forrásból, illetve kifizetéseket kezdeményezhetnek a belső számláról. A számlák automatikusan létrejönnek, ha egy adott beérkező devizanemnek megfelelő számla még nem létezik, illetve megszűnnek, ha az adott számla egyenlege lenullázódik. 

Ha rendelkeznek elegendő fedezettel a belső számlájukon, akkor utalhatnak a többi felhasználó belső számláikra, melyek gyakorlatilag instant végrehajtódnak.

Továbbá létrehozhatnak olyan beszedési megbízásokat, melyeket elküldhetnek más felhasználóknak, akik ezeket befizethetik saját számlájukról.

A projekt megvalósításához Node.js-t használunk több kiegészítő csomaggal, mint például Express, Mongoose, doT.js.

Az adatokat tárolásához MongoDB-t használunk, mely egy nem-relációs adatbázis.

Egységes fejlesztési környezet a Visual Studio Code, melyben megtalálható beépített kód helyesség ellenőrző és automatikus formázás.
A fejlesztés közben folyamatos tesztelés történik.

Végpontok
------
- /user/register : regisztráció
- /user/login : bejelentkezés
- /account : felhasználói főoldal
- /account/deposit : egyenleg feltöltése
- /account/history : tranzakciós előzmények
- /payment/send : utalás másik felhasználónak
- /payment/request : fizetési közelezettség létrehozása

Csapattagok
------
Anga Dániel  
Dóczy Dániel Csaba  
Schreier Ferenc  
Gajdács Ádám  
