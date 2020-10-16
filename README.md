# Consequat

Consequat (latinasta suomennettuna _valokuvaus_) on kuvitteellinen kuvanjakopalvelu valokuvaajille. Se on harjoitustyö Helsingin Avoimen Yliopiston [Full Stack -websovelluskehityskurssille](https://courses.helsinki.fi/fi/aytkt21010). Palvelu on pystyssä siis vain koeluontoisesti.

Palvelua voi kokeilla osoitteessa:
https://arik.fi/consequat

Selain ohjataan automaattisesti Heroku-palvelun sivuille, jossa sovellus pyörii. Huomaa, että sovelluksen käynnistäminen voi kestää parikymmentä sekuntia, sillä Herokun ilmainen palvelin "sammutetaan" mikäli käyttäjiä ei ole ollut puoleen tuntiin, ja uudelleenkäynnistyminen ottaa aikansa.

Sovelluksen backend löytyy GitHub-repositoriosta:
https://github.com/arikankainen/consequat-server

<img src="/docs/main.png" width="686">

## Sisällysluettelo

- [Consequat](#consequat)
  - [Sisällysluettelo](#sisällysluettelo)
  - [Toteutus](#toteutus)
  - [Ominaisuudet lyhyesti](#ominaisuudet-lyhyesti)
  - [Käyttö](#käyttö)
    - [Rekisteröityminen ja kirjautuminen](#rekisteröityminen-ja-kirjautuminen)
    - [Navigointi](#navigointi)
    - [Käyttäjävalikko](#käyttäjävalikko)
    - [Kuvien lisäys](#kuvien-lisäys)
    - [Kuvien hallinnointi](#kuvien-hallinnointi)
      - [Kuvien valinta](#kuvien-valinta)
      - [Kuvien lisäys ja poisto](#kuvien-lisäys-ja-poisto)
      - [Kuvien tietojen muokkaus](#kuvien-tietojen-muokkaus)
      - [Kuvien tagien muokkaus](#kuvien-tagien-muokkaus)
      - [Albumin lisäys, muokkaus ja poisto](#albumin-lisäys-muokkaus-ja-poisto)
    - [Asiakastilin hallinnointi](#asiakastilin-hallinnointi)
      - [Tietojen muuttaminen](#tietojen-muuttaminen)
    - [Kuvien selaaminen](#kuvien-selaaminen)
    - [Kuvan näyttäminen](#kuvan-näyttäminen)
    - [Kuvan tiedot ja kommentointi](#kuvan-tiedot-ja-kommentointi)
  - [Mitä jäi puuttumaan?](#mitä-jäi-puuttumaan)

## Toteutus

Sovellus on kirjoitettu kokonaisuudessaan TypeScriptillä. Frontend-puolella käytössä on React, ja kommunikointi backendin kanssa tapahtuu GraphQL:n kautta (Apollo Client). Backend käyttää Apollo Serveriä, ja tietokantana toimii MongoDB Atlas. Valokuvat lähetetään suoraan frontendista Google Firebase Storageen, ja Firebasen palauttamat kuvien osoitetiedot tallennetaan backendin kautta tietokantaan.

Sovelluksen ulkoasu on täysin itse suunniteltu ja toteutettu, eikä se käytä mitään valmiita tyylejä. Ainoastaan valtaosa käyttöliittymän kuvakkeista on lainattu [Font Awesome](https://fontawesome.com/):n kuvakekatalogista.

## Ominaisuudet

Palveluun voidaan lähettää kuvia ja jaotella niitä omiin albumeihin. Niille voidaan lisätä metatietoja kuten nimi, paikka, kuvaus, sekä lista erilaisia avainsanoja eli tageja helpottamaan kuvien löytymistä haulla. Kuvista tallennetaan myös tärkeimmät exif-tiedot, kuten kameran merkki ja malli, aukko, valotusaika, herkkyys, polttoväli, salama, sekä kuvausaika. Kuvia voidaan myös kommentoida, jos ollaan kirjautuneena. Pääsivulla näytetään hakupalkin lisäksi top-10 käytetyimmät tagit, sekä neljä valokuvaa liittyen kyseiseen tagiin.

## Käyttö

Alla pieni tutoriaali koko sovelluksen käyttöön tiivistetysti.

### Rekisteröityminen ja kirjautuminen

Heti alkuun palveluun kannattaa rekisteröityä, jotta mahdollistetaan omien kuvien lisäys sekä muiden kuvien kommentointi. Rekisteröintiin tarvitaan käyttäjänimi (jolla palveluun kirjaudutaan), koko nimi (näytetään valokuvien käyttäjänä sekä kommentoijana), sähköposti (ei näytetä muille käyttäjille), sekä salasana. Salasanan saa halutessaan näkyviin kentän silmäkuvakkeesta.

<img src="/docs/signup.png" width="320">

Rekisteröinnin jälkeen kirjautuminen käyttäjänimellä ja salasanalla.

<img src="/docs/login.png" width="320">

### Navigointi

Sovellus on täysin responsiivinen, tarkoittaen että se toimii yhtä hyvin suurella työpöytänäytöllä kuin pienellä kännykän näytölläkin. Alla sovelluksen navigointipalkki molemmissa tapauksissa. Työpöytänäkymässä kaikki on heti näkyvillä, mobiilinäkymässä osa toiminnoista on valikon takana.

<img src="/docs/header.png" width="686">
<img src="/docs/header_mobile.png" width="395">

### Käyttäjävalikko

Kirjautuneella käyttäjällä on käytössään valikko, josta löytyy kaikki käyttäjään liittyvät toiminnot; kuvien lähetys, kuvien ja asiakastilin hallinnointi, sekä uloskirjautuminen.

<img src="/docs/header_usermenu.png" width="395">

### Kuvien lisäys

Kuvia voidaan lisätä käyttäjävalikon _Upload_-sivulta. Valita voi yhden tai useita kuvia kerralla.

<img src="/docs/upload.png" width="520">

Kun kuvat on valittu, avautuu näkymä joka näyttää lähetettäväksi valitut kuvat. Kuvia ei siis ole vielä lähetetty mihinkään, vaan ne ovat vasta omalla laitteella. Lähetettäväksi voidaan lisätä lisää kuvia _Add_-napilla, tai kuvia voidaan poistaa lähetyslistalta _Remove_-napilla. _Select all_-nappi valitsee tai poistaa kaikkien kuvien valinnan. _Upload_-nappi lähettää palveluun kaikki listalla olevat kuvat, riippumatta kuvien valinnasta. Kuvien päällä olevat lukonkuvat tarkoittaa, että kuvat on piilotettu muilta käyttäjiltä, kunnes kuvat päätetään julkaista kaikkien nähtäville.

<img src="/docs/upload2.png" width="686">

Kuvien lähetyksen ajan näytetään lähetyksen etenemisestä kertova dialogi, jossa näkyy ylemmässä palkissa lähetettävänä olevan kuvan tilanne, sekä alemmassa palkissa kaikkien kuvien yhteenlaskettu tilanne.

<img src="/docs/uploading.png" width="520">

### Kuvien hallinnointi

Käyttäjävalikon _My photos_-sivulta löytyy kuvien hallinnointi. Kuvia voidaan lisätä ja poistaa, kuvien tietoja ja tageja voidaan muokata, albumeja voidaan lisätä, poistaa ja muokata. Albumin nimen edessä olevasta nuolikuvakkeesta albumin sisällön voi piilottaa näkymästä, jolloin albumista näytetään vain nimi ja sen sisältämien kuvien määrä.

<img src="/docs/myphotos.png" width="686">

#### Kuvien valinta

Kuvia voidaan valita klikkaamalla, sekä poistaa valinta klikkaamalla uudelleen jo valittua kuvaa. _Deselect_-napilla voidaan kaikki valinnat poistaa kerralla. Yläpalkki näyttää kuinka monta kuvaa on valittuna, ja jos kuvia on valittuna useammasta eri albumista, näytetään myös se.

<img src="/docs/myphotos_top.png" width="686">

Laajentamalla yläpalkin nuolikuvakkeesta, näytetään vielä lisätietoja valituista kuvista. Harmaana näytettävä _Multiple values_ kertoo, että kyseisen kentän sisältö ei ole sama kaikilla valituilla kuvilla.

<img src="/docs/myphotos_top2.png" width="686">

Jokaisen albumin oikeassa reunassa on lisäksi oma _Select/Deselect_-nappi, jolla kyseisen albumin kaikki kuvat voidaan lisätä valintaan tai sen valinnat poistaa.

<img src="/docs/myphotos_album.png" width="686">

#### Kuvien lisäys ja poisto

Kuvia voidaan lisätä myös tältä sivulta _Add_-napilla. Toiminta on täysin sama kuin _Upload_-sivulla. Kuvia voi poistaa yhden tai useita kerralla, kaikki valitut kuvat poistetaan _Delete_-napista. Toiminto kysyy käyttäjältä varmistuksen ennen poistoa.

<img src="/docs/deleting.png" width="520">

#### Kuvien tietojen muokkaus

Kuvan tietoja voidaan muokata _Edit_-napista. Dialogi näyttää kuvan lisäyspäiväyksen lisäksi muokattavat kentät kuvan nimelle, kuvauspaikalle, albumille, kuvaukselle ja tageille. Voit myös valita näytetäänkö kuva kaikille yleisessä kuvagalleriassa. Huomaa, että oletuksena lähetetyt kuvat eivät näy yleisessä galleriassa, jotta voit ensin muokata kuvan tiedot kohdalleen, ennen julkaisua. Ainoastaan kuvan nimi on pakollinen, muut kentät ovat valinnaisia. Oletuksena kuvan nimenä näytetään kuvan tiedostonimi. Tageja voi lisätä pilkulla eroteltuna useita, mutta tageille on myös oma muokkausdialogi, josta myöhemmin lisää.

<img src="/docs/edit_photo.png" width="520">

Mikäli valittuna on useampi kuin yksi kuva, voidaan muokata kaikkien kuvien tietoja samalla kertaa. Tällöin jokaisen kentän perässä on lukonkuva, joka lukittuna ollessaan kertoo, että kyseisellä kentällä on eri tiedot eri kuvissa. Tällöin kenttää ei kannata muokata, koska sama muokkaus kohdistuisi kaikkien kuvien kenttään, ja aiemmat tiedot menetetään. Mikäli kenttä kuitenkin halutaan muokata samaksi jokaiseen valittuun kuvaan, voidaan lukko avata klikkaamalla. Mikäli lukko on alusta saakka auki, on kyseinen kenttä jo alunperin sama kaikilla valituilla kuvilla, joten sitä voi huoletta muokata. Tallennettaessa tallennetaan ainoastaan kentät, joissa lukko on auki.

<img src="/docs/edit_photos.png" width="520">

#### Kuvien tagien muokkaus

Kuvan avainsanojen eli tagien muokkaukseen löytyy _Tags_-napista myös oma dialogi, jolla on kätevä muokata usean kuvan tageja kerralla. Tekstikenttään voidaan pilkulla eroteltuna kirjoittaa useita tageja kerralla, ja ne lisätään tagilistaan painamalla _enter_ tai _Add new tags_-napilla. Tagilistalla voi näkyä tageja eri väreillä. Jos listalla on harmaita tageja, tarkoittaa se, että kyseinen tagi löytyy vain joistain valituista kuvista, mutta ei kaikista. Oranssit tagit löytyy jokaisesta valitusta kuvasta. Juuri tagilistalle lisätyt, mutta vielä tallentamattomat tagit näkyvät sinisellä. Tageja voi poistaa tagin _x_-merkkiä klikkaamalla, ja tagi poistuu kaikista valituista kuvista, joissa se on. Vasta tallennus _Save_-napista tallentaa muutokset oikeasti.

<img src="/docs/edit_tags.png" width="520">

#### Albumin lisäys, muokkaus ja poisto

Uuden albumin voi lisätä _Create album_-napista. Albumin nimi on pakollinen, mutta kuvaus vapaaehtoinen. Albumin tietoja voi muokata albumin oikeasta reunasta löytyvällä _Edit_-napilla. Albumin voi poistaa samasta kohdasta löytyvällä _Delete_-napilla, joka on näkyvissä vasta kun albumi on tyhjä kuvista.

<img src="/docs/edit_album.png" width="520">

### Asiakastilin hallinnointi

Asiakastilisivulta (_Account_) löytyy käyttäjän rekisteröintivaiheessa antamat tiedot, sekä tietoja käyttäjän kuvista; kuvien kokonaismäärä, kuvat joita ei ole lisätty mihinkään albumiin, piilotetut kuvat, sekä albumien määrä.

<img src="/docs/account.png" width="686">

#### Tietojen muuttaminen

Käyttäjän on mahdollista muuttaa sähköpostiosoitetta ja salasanaa. Kyseisten tietojen oikella puolella on _change_-linkki, jolla saadaan näkyviin dialogi, jolla tiedot voidaan muuttaa. Salasanan tapauksessa vaaditaan sekä vanha salasana, että uusi salasana ja sen varmistus.

<img src="/docs/change_password.png" width="520">

### Kuvien selaaminen

Kuvia voidaan selata joko navigaatiopalkin _Browse_-linkistä (mobiilinäkymässä ko. linkki löytyy valikosta), jolloin selataan kaikkia tietokannasta löytyviä kuvia, tai kirjoittamalla hakukenttään hakusanan, jolloin näytetään vain hakuun täsmäävät kuvat. Kun haku on suoritettu ja haun tulokset näytetään, voidaan _Search options_-napista valita mihin kuvan tietokenttiin haku kohdistetaan. Oletuksena kaikki kentät ovat valittuna, mutta haku voidaan kohdistaa esimerkiksi pelkästään tageihin. Valintojen jälkeen _Apply_-nappi ottaa valinnat käyttöön ja haku suoritetaan uudelleen.

Kuvien tietoja ladataan kuvalistalle tietokannasta kerrallaan 70 kappaletta, ja itse kuva ladataan vasta kun se on käyttäjän näkyvissä listalla. Kun kuvalista on skrollattu alas saakka, aloitetaan lataamaan listalle tiedot seuraavista 70 kuvasta.

<img src="/docs/browsing_photos.png" width="686">

### Kuvan näyttäminen

Kuvalistalta kuvaa klikattaessa se avataan näkymään, jossa kuva näytetään tummalla taustalla. Työpöytänäkymässä tumma alue täyttää koko näytön, mobiilinäkymässä ei. Mobiiliselainten "koko näytön korkeus" ei pidä sisällään esim. skrollatessa piiloutuvia selaimen valikoita, joten näkymä on hankala tehdä niin, että se kattaisi koko näytön ilman mahdollisten valikoiden taakse jäämistä. Näkymässä on ylhäällä linkki, jolla voi palata kuvalistaan tai hakutuloksiin. Mikäli kuva on avattu kuvalistalta, on kuvan sivuilla nuolet, joilla voidaan liikkua eteen/taakse kuvalistalla. Kuvan alta löytyy kameran ja kuvausasetuksien tiedot (mikäli kuva sisältää exif-tiedot).

<img src="/docs/photo.png" width="686">

### Kuvan tiedot ja kommentointi

Kuvaa alaspäin skrollaamalla, saa näkyviin kuvalle annetut tiedot ja kuvauspäiväyksen. Kuvatietoihin mahdollisesti lisätyistä tageista muodostetaan linkit, joita klikkaamalla voidaan näyttää tietokannan kaikki kuvat, joissa on kyseinen tagi. Tietojen alapuolella näytetään käyttäjien kuvaan lisäämät kommentit. Mikäli ollaan kirjautuneena, voidaan omakin kommentti lisätä.

<img src="/docs/photo_info.png" width="686">

## Mitä jäi puuttumaan?

Ihan kaikkea suunniteltua ei rajoitetun ajan puitteissa ehditty tekemään. Nykyisellään albumeita ei voi lainkaan selata, eikä esimerkiksi tietyn käyttäjän kuvia ja albumeita näe. Kuvalistan latausta ja edellisen näkymän tallennusta muistiin pitäisi parantaa, jotta valokuvasta pääsisi palaamaan samaan näkymään, josta sinne mentiin. Nyt kuvalistaan palattaessa haku tehdään uudelleen, jolloin kuvalistalla on vain se aluksi ladattu maksimissaan 70 kuvaa. Myös valokuvan mahdollisten GPS-tietojen näyttö kartalla jäi puuttumaan.
