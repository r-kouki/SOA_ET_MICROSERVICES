# TP6: Intégration et Manipulation de Données avec Kafka

Ce projet démontre l'intégration de Kafka avec une application Node.js pour la production, la consommation de messages, le stockage dans MongoDB et l'exposition des données via une API REST avec Express.js.

## Objectifs

*   Produire des messages vers un topic Kafka.
*   Consommer des messages depuis un topic Kafka.
*   Stocker les messages consommés dans une base de données MongoDB.
*   Exposer les messages stockés via une API REST.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés et en cours d'exécution :

*   **Node.js et npm:** [Télécharger Node.js](https://nodejs.org/)
*   **Apache Kafka:** [Télécharger Kafka](https://kafka.apache.org/downloads) (Version 3.9.0 binaire recommandée dans le document initial, mais une version récente devrait fonctionner).
*   **Apache Zookeeper:** (Vient généralement avec Kafka)
*   **MongoDB:** [Télécharger MongoDB](https://www.mongodb.com/try/download/community)

## Installation des Dépendances du Projet

1.  Clonez le dépôt (si applicable) ou assurez-vous d'être dans le répertoire `tp6`.
2.  Installez les dépendances Node.js :
    ```bash
    npm install
    ```

## Configuration et Exécution

Suivez ces étapes dans l'ordre pour lancer l'application :

### 1. Démarrer Zookeeper

*   Ouvrez un terminal.
*   Naviguez vers le répertoire d'installation de Kafka.
*   Exécutez :
    *   Sur Linux/macOS : `bin/zookeeper-server-start.sh config/zookeeper.properties`
    *   Sur Windows : `bin\windows\zookeeper-server-start.bat config\zookeeper.properties`

### 2. Démarrer le Serveur Kafka

*   Ouvrez un **nouveau** terminal.
*   Naviguez vers le répertoire d'installation de Kafka.
*   Exécutez :
    *   Sur Linux/macOS : `bin/kafka-server-start.sh config/server.properties`
    *   Sur Windows : `bin\windows\kafka-server-start.bat config\server.properties`

### 3. Créer le Topic Kafka (si ce n'est pas déjà fait)

*   Ouvrez un **nouveau** terminal.
*   Naviguez vers le répertoire d'installation de Kafka.
*   Exécutez la commande suivante pour créer un topic nommé `test-topic` :
    *   Sur Linux/macOS :
        ```bash
        bin/kafka-topics.sh --create --topic test-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
        ```
    *   Sur Windows :
        ```bash
        bin\windows\kafka-topics.bat --create --topic test-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
        ```
    *   *Note : Ajustez `--partitions` et `--replication-factor` selon vos besoins. Pour un environnement de développement local, 1 est généralement suffisant.*

### 4. Démarrer MongoDB

*   Assurez-vous que votre instance MongoDB est en cours d'exécution. Par défaut, elle écoute sur `mongodb://localhost:27017`.
*   L'application `consumer.js` créera automatiquement la base de données `kafka_messages_db` et la collection `messages` si elles n'existent pas.

### 5. Démarrer le Consommateur Kafka et le Serveur API

*   Ouvrez un **nouveau** terminal.
*   Naviguez vers le répertoire `tp6` de ce projet.
*   Exécutez :
    ```bash
    node consumer.js
    ```
*   Vous devriez voir des messages de log indiquant la connexion à MongoDB et Kafka, puis les messages reçus. Le serveur API démarrera sur `http://localhost:3000`.

### 6. Démarrer le Producteur Kafka

*   Ouvrez un **nouveau** terminal.
*   Naviguez vers le répertoire `tp6` de ce projet.
*   Exécutez :
    ```bash
    node producer.js
    ```
*   Vous devriez voir le message "Message produit avec succès" s'afficher toutes les secondes.

## Tester l'API

Une fois que le producteur envoie des messages et que le consommateur les traite et les stocke :

1.  Ouvrez votre navigateur web ou un client API (comme Postman ou curl).
2.  Accédez à l'URL : `http://localhost:3000/messages`
3.  Vous devriez voir une réponse JSON contenant un tableau des messages stockés dans MongoDB.

## Structure des Fichiers

*   `producer.js`: Script Node.js pour produire des messages Kafka.
*   `consumer.js`: Script Node.js pour consommer des messages Kafka, les stocker dans MongoDB et exposer une API REST.
*   `package.json`: Définit les métadonnées du projet et les dépendances.
*   `README.md`: Ce fichier.

## Dépannage

*   **Erreurs de connexion Kafka (`localhost:9092`)**: Assurez-vous que Zookeeper et le serveur Kafka sont démarrés et fonctionnent correctement. Vérifiez les logs de Kafka pour des erreurs.
*   **Erreurs de connexion MongoDB (`mongodb://localhost:27017`)**: Vérifiez que votre serveur MongoDB est en cours d'exécution et accessible.
*   **Le topic n'existe pas**: Assurez-vous d'avoir créé le topic `test-topic` en utilisant les commandes `kafka-topics.sh` ou `.bat`. 