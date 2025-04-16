# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


🔹 Classe User
+----------------+
|     User       |
+----------------+
| - id           |
| - name         |
| - email        |
| - password     |
| - accountType  | // "Applicant" ou "Employer"
+----------------+
| +register()    |
| +login()       |














🔹 Classe Profile
plaintext
CopierModifier
+----------------+
|    Profile     |
+----------------+
| - id           |
| - userId       | // FK vers User
| - email        |
| - fullName     |
| - title        |
| - location     |
| - about        |
| - skills       | // tableau de strings
+----------------+
| +updateProfile() |
Association :
User 1 -------- 1 Profile








🔹 Classe Certification
plaintext
CopierModifier
+----------------------+
|    Certification     |
+----------------------+
| - name               |
| - issuer             |
| - issueDate          |
| - certificateId      |
+----------------------+
Association :
Profile 1 -------- * Certification

🔹 Classe Experience
plaintext
CopierModifier
+---------------------+
|     Experience      |
+---------------------+
| - title             |
| - company           |
| - location          |
| - startDate         |
| - endDate           |
| - description       |
+---------------------+
Association :
Profile 1 -------- * Experience

🔹 Classe Job
plaintext
CopierModifier
+----------------------+
|        Job           |
+----------------------+
| - id                 |
| - jobTitle           |
| - company            |
| - about              |
| - experience         | // Niveau requis
| - jobType            | // Full-Time, Part-Time...
| - location           |
| - package            |
| - postedDaysAgo      |
| - description        |
| - skillRequired      | // tableau de compétences
+----------------------+
Association :
User (Employer) 1 -------- * Job

🔹 Classe Talent
plaintext
CopierModifier
+----------------------+
|       Talent         |
+----------------------+
| - name               |
| - role               |
| - company            |
| - topSkills          | // tableau
| - about              |
| - expectedCtc        |
| - location           |
| - image              |
+----------------------+
Note : Talent peut être une vue enrichie d’un profil Applicant avec des données supplémentaires.


🎯 Acteurs :
•	Utilisateur (User)
•	Employeur (Employer)
•	Système (System / pour envoi de notifications, traitement automatique, etc.)
________________________________________
🔐 1. Authentification & Enregistrement
Utilisateur :
•	S’enregistrer avec email/mot de passe
•	S’enregistrer avec compte Google/LinkedIn
•	Se connecter avec email/mot de passe
•	Se connecter avec Google/LinkedIn
•	Réinitialiser mot de passe
•	Changer mot de passe après connexion
________________________________________
👤 2. Gestion du Profil
Utilisateur :
•	Créer et modifier son profil (détails, image, contact)
•	Télécharger son CV (PDF ou DOC)
•	Mettre à jour ou supprimer le CV
•	Gérer ses compétences
•	Ajouter/modifier certifications
•	Ajouter/modifier expériences professionnelles
________________________________________
💼 3. Recherche et Candidature aux Emplois
Utilisateur :
•	Rechercher un emploi (mot-clé, localisation, catégorie)
•	Filtrer les résultats (entreprise, expérience, salaire, type)
•	Consulter les détails d’une offre
•	Postuler à une offre avec CV et lettre de motivation
•	Suivre le statut de ses candidatures
________________________________________
🏢 4. Fonctionnalités Employeur
Employeur :
•	Créer une nouvelle offre d’emploi
•	Modifier ou supprimer une offre
•	Définir la visibilité (publique / privée)
•	Consulter les candidatures reçues
•	Contacter les candidats via la plateforme
________________________________________
🔔 5. Notifications et Alertes
Système (en interaction avec l’utilisateur) :
•	Envoyer des alertes email pour nouvelles offres
•	Envoyer des notifications sur le statut de la candidature
________________________________________
⭐ 6. Fonctionnalités Additionnelles
Utilisateur :
•	Sauvegarder des offres pour plus tard
•	Consulter le profil des entreprises
•	Voir son tableau de bord (activités récentes, offres sauvegardées, suggestions)
🧩 Problématique :
Dans un contexte professionnel en constante évolution, de nombreux chercheurs d’emploi peinent à accéder à des offres adaptées à leur profil, tandis que les employeurs rencontrent des difficultés à identifier rapidement des talents qualifiés. Il manque une plateforme centralisée, intelligente et intuitive qui facilite la mise en relation directe entre les candidats et les recruteurs, tout en automatisant la gestion des candidatures, des profils, et des alertes d’emploi.
________________________________________
💡 Ce que ton projet apporte comme solution :
•	Permet aux candidats de créer un profil complet (CV, compétences, certifications…).
•	Facilite la recherche d’emploi ciblée et la candidature directe.
•	Donne aux employeurs un espace pour gérer leurs offres et sélectionner les meilleurs talents.
•	Intègre des notifications automatiques et une interface intuitive.
•	Rend le processus rapide, centralisé et efficace pour les deux parties.


Problématique :
Dans un environnement professionnel en constante évolution, de nombreux chercheurs d'emploi ont du mal à accéder rapidement à des offres correspondant à leurs compétences spécifiques. De même, les employeurs peinent à identifier efficacement des talents qualifiés dans un large éventail de candidatures. Les plateformes actuelles de recrutement ne répondent pas toujours aux besoins de personnalisation et d'interaction directe entre les candidats et les recruteurs. Il existe un manque d'outils intelligents et intégrés permettant de faciliter cette mise en relation de manière fluide et rapide, tout en assurant un suivi automatisé des candidatures et de la gestion des profils. Une plateforme centralisée, intuitive et alimentée par des technologies modernes, comme l’intelligence artificielle pour le matching et la blockchain pour la vérification des compétences, pourrait combler ce vide. Elle offrirait aux candidats un moyen de créer des profils dynamiques et adaptés aux besoins du marché, et aux recruteurs une gestion optimisée des offres, le tout dans un environnement sécurisé et transparent.


