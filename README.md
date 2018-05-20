FADD Pay
------
Beadandó feladat az ELTE IK - Projekt eszközök kurzushoz.

Rövid leírás
------

A projekt célja egy online fizetési és számlavezetési felület megvalósítása.

A felhasználók regisztráció után belső számlákat vezethetnek, feltölthetik azt külső forrásból, illetve kifizetéseket kezdeményezhetnek a belső számláról. A számlák automatikusan létrejönnek, ha egy adott beérkező devizanemnek megfelelő számla még nem létezik, illetve megszűnnek, ha az adott számla egyenlege lenullázódik. 

Ha rendelkeznek elegendő fedezettel a belső számlájukon, akkor utalhatnak a többi felhasználó belső számláikra, melyek gyakorlatilag instant végrehajtódnak.

Továbbá létrehozhatnak olyan beszedési megbízásokat, melyeket elküldhetnek más felhasználóknak, akik ezeket befizethetik saját számlájukról.

A projekt megvalósításához Node.js-t használunk több kiegészítő csomaggal, mint például Express, Mongoose, doT.js.

Az adatokat tárolásához MongoDB-t használunk, mely egy nem-relációs adatbázis.

Egységes fejlesztési környezet a Visual Studio Code, melyben megtalálható beépített kód helyesség ellenőrző és automatikus formázás.
A fejlesztés közben folyamatos tesztelés történik.

Jenkins: http://195.201.139.237:8080

Végpontok
------
- /user/register : regisztráció
- /user/login : bejelentkezés
- /user : felhasználói főoldal
- /account/deposit : egyenleg feltöltése
- /account/history : tranzakciós előzmények
- /payment/send : utalás másik felhasználónak
- /payment/request : fizetési kötelezettség létrehozása
- /payment/request/id : adott fizetési kötelezettség
- /admin : felhasználók kezelése

Telepítés
------
1. [Node.js](https://nodejs.org/en/) letöltése és telepítése
2. [MongoDB Community Server](https://www.mongodb.com/download-center) letöltése és telepítése
    1. C:\data\db mappaszerkezet létrehozása
    2. 'mongod' parancs futtatása admin parancssorban
3. Repo letöltése egy tetszőleges mappába
4. 'npm install' parancs kiadása az előbbi mappában
5. Alkalmazás indítása a 'node app' parancs kiadásával
    - Leállítás Ctrl+C
- Unit testek futtatása 'mocha' parancs kiadásával

Csapattagok
------
Anga Dániel  
Dóczy Dániel Csaba  
Schreier Ferenc  
Gajdács Ádám  
