import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Characteristics } from './characteristics.js';

Meteor.methods({
    'characteristics.upsert'(characteristicObject) {

        check(characteristicObject.name, String);

        return Characteristics.upsert(
            { _id: characteristicObject.id },
            {
                $set: {
                    name: characteristicObject.name,
                    image_url: characteristicObject.image_url,
                    launch_sentence: characteristicObject.launch_sentence,
                    createdAt: new Date()
                }
            });
    },

    'characteristics.yolo'() {

        Characteristics.insert({
            name: "informatic",
            label: "informatic",
            image_url: "/img/computing.svg",
            help: "Capacité à pousser les machines dans leurs retranchements.",
            category: "hacking"
        });

        Characteristics.insert({
            name: "mechatronic",
            label: "Mécatronique",
            image_url: "/img/processor.svg",
            help: "Savoir-faire en mécanique et électronique. La robotique moins l\'informatique, en somme.",
            category: "hacking"
        });

        Characteristics.insert({
            name: "administratif",
            label: "Administratif",
            image_url: "/img/book-pile.svg",
            help: "Savoir exploiter une loi, refuter des charges, identifier la tête pensante d'une holding, falsifier des fiches de payes... Avec le sourire.",
            category: "hacking"
        });

        Characteristics.insert({
            name: "diy",
            label: "Bricolage",
            image_url: "/img/screwdriver.svg",
            help: "Comme Mc Giver ? Comme Mc Giver.",
            category: "hacking"
        });

        Characteristics.insert({
            name: "biohack",
            category: "hacking",
            label: "Biohack",
            help: "Physique, chimie, bio. Et donc poisons, explosifs, adhesifs. Pour commencer.",
            image_url: "/img/molecule.svg"
        });

        Characteristics.insert({
            name: "illustration",
            category: "Créativité",
            label: "Illustration",
            help: "Dessiner, peindre, réaliser des images en deux dimensions.",
            image_url: "/img/palette.svg"
        });

        Characteristics.insert({
            name: "audio",
            category: "Créativité",
            label: "Audio",
            help: "Musicien, dj ou ingénieur du son, savoir faire danser les ondes.",
            image_url: "/img/music-spell.svg"
        });

        Characteristics.insert({
            name: "vidéo",
            category: "Créativité",
            label: "Vidéo",
            help: "Savoir créer, diffuser et éditer des vidéos, effets spéciaux compris.",
            image_url: "/img/video-camera.svg"
        });

        Characteristics.insert({
            name: "3darts",
            category: "Créativité",
            label: "3D",
            help: "L'art de modeliser, texturer et animer des images en 3 dimensions.",
            image_url: "/img/cube.svg"
        });

        Characteristics.insert({
            name: "observation",
            category: "Physique",
            label: "Repérage",
            help: "Avoir le sens de l'observation et du détail.",
            image_url: "/img/sherlock-holmes.svg"
        });

        Characteristics.insert({
            name: "furtivity",
            category: "Physique",
            label: "Furtivité",
            help: "Parfois, il vaut mieux passer inaperçu. Souvent en fait.",
            image_url: "/img/cloak-dagger.svg"
        });

        Characteristics.insert({
            name: "resistance",
            category: "Physique",
            label: "Résistance",
            help: "Endurer ; qui endure construit sa force.",
            image_url: "/img/fire-silhouette.svg"
        });

        Characteristics.insert({
            name: "martial-arts",
            category: "Physique",
            label: "Arts Martiaux",
            help: "Le délicat art ancestral de réduire vos adversaires en bouillie. Avec élégance.",
            image_url: "/img/ninja-heroic-stance.svg"
        });

        Characteristics.insert({
            name: "parkour",
            category: "Physique",
            label: "Parkour",
            help: "Mélange d'athlétisme, d'acrobatie et de gymnastique avec ce petit côté urbain chic.",
            image_url: "/img/acrobatic.svg"
        });

        Characteristics.insert({
            name: "letters",
            category: "Savoirs",
            label: "Lettres",
            help: "Les Lettres sont fleuries à qui sait se cultiver.",
            image_url: "/img/spell-book.svg"
        });

        Characteristics.insert({
            name: "economy",
            category: "Savoirs",
            label: "Économie",
            help: "Science des actions, des fusion, des démons.",
            image_url: "/img/gold-stack.svg"
        });

        Characteristics.insert({
            name: "astronomy",
            category: "Savoirs",
            label: "Astronomie",
            help: "De tout temps les hommes... (bla bla bla) ...les étoiles. Leur poésie subtile en fait d'éternelles amies.",
            image_url: "/img/dust-cloud.svg"
        });

        Characteristics.insert({
            name: "sociology",
            category: "Savoirs",
            label: "Sociologie",
            help: "La science des foules, les secrets de l'Homme, l'amour des statistiques.",
            image_url: "/img/minions.svg"
        });

        Characteristics.insert({
            name: "taming",
            category: "Savoirs",
            label: "Dressage",
            help: "Faut il faire le mort ou se tenir sur un pied face à un ours ? Cette compétence vous permet de le savoir.",
            image_url: "/img/griffin-symbol.svg"
        });

        Characteristics.insert({
            name: "histogeo",
            category: "Savoirs",
            label: "Histoire Géo",
            help: "Je vois. Vous êtes un homme de culture vous aussi.",
            image_url: "/img/atlas.svg"
        });

        Characteristics.insert({
            name: "healing",
            category: "Savoirs",
            label: "Médecine",
            help: "Etre capable d'exercer un diagnostic différentiel pour démasquer une sarcoïdose galopante ou un lupus. Ou retirer une balle.",
            image_url: "/img/love-injection.svg"
        });

        Characteristics.insert({
            name: "network",
            category: "Relations sociales",
            label: "Réseau",
            help: "L'art de savoir à qui demander service.",
            image_url: "/img/telepathy.svg"
        });

        Characteristics.insert({
            name: "seduction",
            category: "Relations sociales",
            label: "Séduction",
            help: "Plaire aux autres humains offre parfois des perspectives intéressantes.",
            image_url: "/img/shining-heart.svg"
        });

        Characteristics.insert({
            name: "body_language",
            category: "Relations sociales",
            label: "Language gestuel",
            help: "Savoir décrypter les émotions et les pensées dans les gestes.",
            image_url: "/img/anatomy.sv"
        });

        Characteristics.insert({
            name: "intimidation",
            category: "Relations sociales",
            label: "Intimidation",
            help: "Effrayer pour se faire obéir. Ou pour se donner un genre.",
            image_url: "/img/octoman.svg"
        });

    }
});