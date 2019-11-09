# Dojo modern web with Star Wars

- [Dojo modern web with Star Wars](#dojo-modern-web-with-star-wars)
  - [Front](#front)
    - [Router](#router)
    - [Le store](#le-store)
    - [Login](#login)
    - [Dashboard](#dashboard)
  - [Back](#back)
    - [Node.JS](#nodejs)
    - [Socket.io](#socketio)
      - [Côté back](#côté-back)
      - [Côté front](#côté-front)
  - [IOT](#iot)

L'idée de ce dojo est de se plonger dans l'univers de Star Wars pour créer une web app mobile afin de controler un drone BB-8. Quel programme !

Le Dojo se découpe en 3 parties où nous utiliserons des technologies et des méthodes différentes et relativement récentes :

- Front : Svelte, BEM, CSS avancée avec des transiosn et des effets
- Back : Node.JS, Socket.IO
- IOT : Cylon.js

Si vous d'expérimenter d'autres technologie front ou back, aucun problème

## Front

Rentrons dans le vif du sujet, la partie Front sera développée en Svelte en respectant la convention de nommage de classe BEM.

Pour rappel BEM est une convention de nommage de classe facilitant la découpe en composant nottament. Vous pouvez retrouvez des informations sur BEM dans [cette présentation](https://speakerdeck.com/johnmeunier/developer-improve-your-dom-structure-with-bem).

Dans un premier temps, il faut initialiser un nouveau projet Svelte, vous pouvez vous inspirer de la [doc officiel](https://svelte.dev/blog/the-easiest-way-to-get-started). Personnellement j'ai utilisé la méthode _1. Use the REPL_ qui est la plus facile à mettre en place malgré des problèmes possible de proxy.

### Router

L'application sera composée de deux pages :

- Login, cette page servira simplement à se connnecter
- Dashboard, cette page affichera votre nom de droid, votre équipe et vous fournira surtout le cockpit pour controler votre drone.

Pour ce faire, il faut mettre en place un routeur. Svelte n'en contient pas par défaut. Je vous conseille le package `svelte-routing`.

Il vous suffit après d'importer les composants utiles :

```js
import { Router, Link, Route } from "svelte-routing";
```

L'utilisation du router est très classique. Les `route` doivent être compris dans un composant `router` et il faut renseigner au moins deux éléments indispensables :

- `path` : le chemin de votre route
- `component` : le composant à charger quand le paramètre `path` matche.

Par exemple :

```js
<Router {url}>
  <div class="container">
    <Route path="login" component={Login} />
    <Route path="dashboard" component={Dashboard} />
  </div>
</Router>
```

Le paramètre `url` ne sert pas dans notre cas mais doit au moins être indiqué à une string vide.

### Le store

Nous allons utiliser un store pour stocker les données de l'utilisateur actuellement connecté.

Il suffit de créer un fichier `src/stores.js`

```js
import { writable } from "svelte/store";

export const user = writable({
  name: "John",
  surname: "JN-2",
  color: "red"
});
```

Pour utiliser votre store il faut l'importer où vous souhaitez l'utiliser, par exemple dans notre `Login.svelte`

```js
import { user } from "../stores.js";
```

Pour modifier notre utilisateur, il faut utiliser la méthode `update`

```js
user.update(user => ({
  ...user,
  name: e.target.value
}));
```

Et pour écouter une valeur : 

```js
I const unsubscribe = user.subscribe(value => {
  user_value = value;
}); 
```

On aura ici un store qui contiendra à l'initialisation un user avec des informations par défaut.

Maintenant que nous avons mis en place un router et un store, nous pouvons maintenant passer aux détails de chaque page.

Les illustrations sont seulement là à titre d'exemple. L'objectif est de créer une interface dans le thème de Star Wars, faîtes parler votre imagination.

### Login

![Login example](Login.png)

### Dashboard

![Dashboard default](Dashboard-default.png)

![Dashboard power left](Dashboard-power-left.png)

## Back

Le back va permettre de faire le lien entre le post de pilotage et le drone. L'idée est donc de pouvoir récupérer les commandes que vous envoyez dans l'application web (augmentation de la puissance, virage notamment), de les transformer en commande compréhensibles par le drone puis de lui envoyer.

Pour le moment on va se focaliser sur les liens entre l'interface et le serveur.

Cette partie se fera en Node.js avec socket.io.

### Node.JS

Pour initialiser votre projet, vous pouvez en créer un nouveau parallèle à votre front et lancer à l'intérieur :

```
npm init
```

Vous pouvez maintenant créer un nouveau fichier js (par exemple _index.js_) et l'exécuter.

Pour l'exécuter, le plus simple reste la commande :

```
node index.js
```

Je vous conseille cependant d'utiliser [nodemon](https://www.npmjs.com/package/nodemon) qui vous relancera votre serveur automatiquement dès que vous faites une modification à l'intérieur :

```
npm install -g nodemon
nodemon index.js
```

### Socket.io

#### Côté back

En tout premier, il faut ajouter socket.io à votre projet. Pour ce faire, rien de plus simple :

```
npm install socket.io
```

Maintenant que le package socket.io a été ajouté à notre projet, il faut démarrer le serveur.

```js
const io = require("socket.io");
const server = io.listen(3000);
```

Ici on indique que notre serveur sera disponible sur le port 3000.

Socket.io fonctionne sur le principe de trigger sur différents type d'événement envoyé et reçu.

```js
server.on("connection", socket => {
  console.log("### new user detected ###");
  socket.emit("welcome", droneState);
});
```

Ici on indique que lorsque l'événement `connection` est détecté on émet un événement de type `welcome` en envoyant l'objet `droneState` à l'utilisateur connecté au serveur.

En ayant simplement compris cette règle, on peut développer une grande partie de l'application.

Il est également possible d'envoyer un événement à tous les utilisateurs connectés :

```js
socket.broadcast.emit("newState", droneState);
```

Ok, tout ça c'est très bien, maintenant on sait envoyer et recevoir des événements côté serveur mais quid au niveau de l'interface ? Il va falloir également utiliser socket.io pour se connecter à la socket et communiquer avec.

#### Côté front

On va déjà appeler le script de socket.io dans notre html via le fichier `public/index.html`

```html
<script src="http://localhost:3000/socket.io/socket.io.js"></script>
```

Il ne vous reste plus qu'à créer votre socket en se connectant au serveur précédemment lancé :

```js
socket = io("http://localhost:3000");
```

Tout s'utilise maintenant de la même façon qu'en back. Par exemple :

```js
socket.on("newState", newDroneState => {
  droneState = newDroneState;
});
```

Cette exemple permet d'écouter l'événement précédemment émi `newState`, de récupérer le nouvel état du drone, et de l'assigner à l'état affiché dans l'interface.

## IOT
