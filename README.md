# [Projet Fisheye](https://karlito14.github.io/projet6Fisheye/)

## Projet numéro 6 de la formation Openclassrooms Développeur d'Application JavaScript / React

FishEye est un site web qui permet aux photographes indépendants de présenter leurs meilleurs travaux. Les visiteurs peuvent consulter les projets des photographes et les contacter via un formulaire.

### Objectifs

- Récupérer les données JSON avec fetch
- Page d'accueil affiché dynamiquement selon la data
- Page photographe dynamique selon le photographe choisi
- Le site doit etre accessible aux utilisateurs malvoyants

### Éléments fournis

- [Maquette](https://www.figma.com/file/Q3yNeD7WTK9QHDldg9vaRl/UI-Design-FishEye-FR?type=design&node-id=0-1&mode=design&t=xZxRRPEtKdk9O3af-0)
- [Notes de réunion](https://course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/Notes+de+reunion.pdf) avec les exigences
- [Data des photographes et de leurs travaux](https://github.com/OpenClassrooms-Student-Center/Front-End-Fisheye/blob/main/data/photographers.json)

### Cahier des charges

#### Page d'accueil

- Liste de tous les photographes avec leur nom, leur slogan, leur
  localisation, leur prix/heure et une image miniature de leur choix
- Lorsque l'utilisateur clique sur la vignette d'un photographe, il est redirigé vers sa page

#### Page du photographe

- Affiche une galerie des travaux du photographe
- Les photographes peuvent montrer à la fois des photos et des vidéos
- Lorsque l'utilisateur clique sur l'icône "Like", le nombre de likes affiché est incrémenté
- Le nombre de likes total d’un photographe doit correspondre à la
  somme des likes de chacun de ses médias
- Les médias peuvent être triés par popularité ou par titre ou par date
- Lorsque l'utilisateur clique sur un média, celui-ci doit s’ouvrir dans une lightbox. Il est possible de faire défiler les médias avec la souris et le clavier
- Afficher un bouton pour contacter le photographe

* Le formulaire de contact est une modale qui s'affiche par-dessus
  le reste
* Il comprend des champs pour les noms, l'adresse électronique et
  le message

### Instructions

- Le code est séparé en différents fichiers (HTML, CSS, JavaScript)
- Une version moderne (ES6 ou supérieure) de JavaScript est utilisée et les fonctionnalités obsolètes ne sont pas utilisées

### Tester le projet

Pour tester le projet :

Cliquez [ici](https://karlito14.github.io/projet6Fisheye/) ou cloner le dépot github

Réalisé par [Carlos Leiroz](https://www.linkedin.com/in/carlos-leiroz/)
