# Tamagui Trello Clone

## Sujet
Réalisez un pseudo Trello en version mobile. 
Il devra pouvoir identifier les utilisateurs, 
permettre d’ajouter/modifier/supprimer des colonnes, 
ajouter/modifier/supprimer des tâches dans les colonnes, 
ajouter/modifier/supprimer des images dans les taches.

[Option] ajouter/modifier/supprimer des tableaux de projet (qui contiendront chacun des colonnes)

Utilisez à minima une navigation en tab pour gestion du compte/projet
Utiliser une navigation par empilement pour voir le détail d’une tache

Si vous avez réalisé l’option vous pouvez utiliser une navigation par empilement pour aller de la liste des tableaux à la gestion du tableau

## Grille d'evaluation

inscription connexion  2,5pt (pensez aux clavier et à la protection du mdp)

authentification par un autre fournisseur google/facebook ou confirmation du compte par e-mail 1pt
CRUD colonnes 3,5pt (1 lecture,1 ajout, 1 modif, 0,5 delete)
CRUD taches 5pt (1,5 lecture,1,5 ajout, 1,5 modif, 0,5 delete)

CRUD tableau 1,5pt (0,5 lecture,0,5 ajout,0,5 modif, 0 delete)

Navigation tab 1pt
Navigation empilement 2pt (1 pour le détail, 1 pour la liste de tableau)
Animation 1,5 pt
Design 2 pt

total sur 20 multiplié par 5 pour avoir une note sur 100

## Modalité de rendu

Lien vers votre repo Github, 
Faire un readme.md dans le dépot qui explique comment lancer/installer le programme
Préciser dans le readme qui à travaillé sur le projet (nom et prenom)

## Compte Rendu

### Avant de lancer l'application

dans ```api/firebase.ts``` utiliser vos credentials firebase.

Rules pour le storage : 

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{userId}/{boardId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Rules pour la RealTimeDatabase : 

```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "users": {
      "$uid": {
        "boards": {
          ".read": "$uid === auth.uid",
          ".write": "$uid === auth.uid"
        }
      }
    }
  }
}
```

Pour l'authentification :  Adresse e-mail/Mot de passe

### Lancer l'application

``` git clone du projet ```

``` cd trellotamagui/ ```

``` npm install ```

``` npm run *plateforme* ```

### Réponse au sujet

Pour le design de ce projet j'ai décidé de copier quasiment trait pour trait l'application mobile Trello.
Une fois connecté il est possible de créer un tableau, puis dans ce tableau il est possible de créer plusieurs listes, dans lesquelles on peut créer plusieurs cartes.
Pour l'implementation de l'image picker, comme dans trello il est possible de changer l'image de fond d'un tableau (un tableau à une image par défaut).
Tableaux, listes et cartes ont chacun un titre modifiable en appuyant dessus et il est bien sur possible de les supprimer.

Je reste disponible sur discord si il y a un quelconque soucis pour lancer le projet.

#### Charly Rousseau
