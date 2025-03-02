# Système de Gestion de Tâches avec GraphQL

## Description
Ce projet est une API GraphQL pour la gestion de tâches, développée avec Node.js, Express et Apollo Server. Il permet de créer, lire, mettre à jour et supprimer des tâches via des requêtes et mutations GraphQL.

## Prérequis
- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)

## Installation
1. Clonez ce dépôt ou téléchargez les fichiers source
2. Naviguez vers le répertoire du projet
   ```bash
   cd tp-graphql
   ```
3. Installez les dépendances
   ```bash
   npm install
   ```

## Démarrage du serveur
Pour démarrer le serveur GraphQL, exécutez la commande suivante :
```bash
node index.js
```

Le serveur sera accessible à l'adresse : http://localhost:5000/graphql

## Structure du projet
```
tp-graphql/
├── index.js              # Configuration du serveur
├── taskSchema.gql        # Définition du schéma GraphQL
├── taskSchema.js         # Chargement du schéma
├── taskResolver.js       # Implémentation des résolveurs
└── package.json          # Dépendances du projet
```

## Fonctionnalités
- Récupération de toutes les tâches
- Récupération d'une tâche spécifique par ID
- Ajout d'une nouvelle tâche
- Marquage d'une tâche comme terminée
- Modification de la description d'une tâche
- Suppression d'une tâche

## Exemples d'utilisation

### Récupérer toutes les tâches
```graphql
query {
  tasks {
    id
    title
    description
    completed
    duration
  }
}
```

### Récupérer une tâche spécifique
```graphql
query {
  task(id: "1") {
    id
    title
    description
    completed
    duration
  }
}
```

### Ajouter une nouvelle tâche
```graphql
mutation {
  addTask(
    title: "Optimisation de Base de Données"
    description: "Analyser et optimiser les requêtes SQL pour améliorer les performances"
    duration: 5
    completed: false
  ) {
    id
    title
    description
    duration
    completed
  }
}
```

### Marquer une tâche comme terminée
```graphql
mutation {
  completeTask(id: "1") {
    id
    title
    completed
  }
}
```

### Changer la description d'une tâche
```graphql
mutation {
  changeDescription(
    id: "2"
    description: "Nouvelle description pour cette tâche"
  ) {
    id
    title
    description
  }
}
```

### Supprimer une tâche
```graphql
mutation {
  deleteTask(id: "3") {
    id
    title
  }
}
```

## Avantages de GraphQL
- Récupération précise des données (uniquement ce qui est demandé)
- Une seule requête pour obtenir des données complexes
- Introspection forte et documentation automatique
- Évolution du schéma sans casser les clients existants

## Technologies utilisées
- Node.js
- Express
- Apollo Server
- GraphQL

## Remarques
Ce projet est une démonstration simple d'une API GraphQL. Dans un environnement de production, il serait recommandé d'ajouter :
- Une base de données pour la persistance des données
- Une authentification et autorisation
- Des tests unitaires et d'intégration
- Une gestion des erreurs plus robuste