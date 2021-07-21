let specialChars = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "`",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ",",
    ")",
    "_",
    "+",
    "\\",
    "-",
    "=",
    "[",
    "]",
    "{",
    "}",
    ";",
    "'",
    ":",
    "\"",
    "|",
    ".",
    "<",
    ">",
    "/",
    "?",
    "~",
    "«",
    "»",
    "…",
    "/s",
    "&"
]

let dico_fr = [
    "à cause de",
    "à cause que",
    "à cause",
    "à condition que",
    "à l'",
    "à la suite de quoi",
    "à la",
    "à mesure que",
    "à moins que",
    "à peine … que",
    "à présent que",
    "à propos",
    "à savoir",
    "à telle enseigne que",
    "a-t-il",
    "à",
    "℁",
    "afin que",
    "afin",
    "ainsi que",
    "alors que",
    "alors",
    "apr.",
    "après que",
    "après quoi",
    "après",
    "assavoir",
    "attendu que",
    "attendu",
    "au cas où",
    "au cas que",
    "au fait",
    "au fur et à mesure que",
    "au lieu de quoi",
    "au lieu que",
    "au même titre que",
    "au moment où",
    "au motif que",
    "au point que",
    "au sinon",
    "au-dedans",
    "au",
    "aucun",
    "aucune",
    "aucunes",
    "aucuns",
    "audit",
    "auquel cas",
    "aussi non",
    "aussi-tôt que",
    "aussi",
    "aussitôt que",
    "aut’",
    "autant que",
    "autre",
    "autres",
    "aux",
    "av.",
    "avant que",
    "avant",
    "avec",
    "avez",
    "beaucoup de",
    "because",
    "bicause",
    "bien d’autre",
    "bien d’autres",
    "bien de la",
    "bien des",
    "bien du",
    "bien que",
    "bon nombre de",
    "buitante",
    "c-à-d",
    "c.-à-d.",
    "c.",
    "c.a.d.",
    "c’est à savoir",
    "c’est bien le diable que",
    "c’est bien le diable si",
    "c’est en quoi",
    "c’est pourquoi",
    "c’est-à-dire",
    "c’est",
    "c/",
    "ca.",
    "ça",
    "ca",
    "càd",
    "car",
    "ce",
    "ceci étant",
    "cedit",
    "cent mille",
    "cent-cinquante-cinq",
    "cent-cinquante-deux",
    "cent-mille",
    "cent-trente",
    "cent",
    "cependant que",
    "cettui",
    "chaque",
    "chez",
    "cinq-cents",
    "cinq-mille",
    "cinq",
    "cinquante-cinq",
    "cinquante-deux",
    "cinquante-et-un",
    "cinquante-huit",
    "cinquante-neuf",
    "cinquante-quatre",
    "cinquante-sept",
    "cinquante-six",
    "cinquante-trois",
    "cinquante",
    "circa",
    "combiennième",
    "combiennièmes",
    "combientième",
    "combientièmes",
    "comme pour",
    "comme quoi",
    "comme si",
    "comme",
    "concernant",
    "considérant que",
    "contre",
    "courant",
    "d’abord que",
    "d’autant moins que",
    "d’autant moins",
    "d’autant plus que",
    "d’autant que",
    "d’où",
    "d",
    "dans ce cas",
    "dans la mesure où",
    "dans le moment où",
    "dans le moment que",
    "dans le temps que",
    "dans",
    "de façon que",
    "de l'",
    "de la",
    "de manière à ce que",
    "de même que",
    "de peur que",
    "de sorte qu’",
    "de sorte que",
    "de telle façon que",
    "de telle sorte qu’",
    "de telle sorte que",
    "de",
    "dedans",
    "dehors",
    "déjà",
    "depuis que",
    "depuis",
    "derrière",
    "des fois que",
    "dès lors que",
    "dès que",
    "des",
    "dés",
    "dès",
    "desorte que",
    "dessous",
    "dessus",
    "deux cents",
    "deux ou trois",
    "deux trois",
    "deux-cents",
    "deux-mille",
    "deux",
    "devant que de",
    "devant que",
    "devant",
    "devers",
    "différentes",
    "différents",
    "dire que",
    "divers",
    "diverses",
    "dix mille",
    "dix-huit",
    "dix-mille",
    "dix-neuf",
    "dix-sept",
    "dix",
    "dixit",
    "donc",
    "douze",
    "ds",
    "du moment que",
    "du plus loin que",
    "du",
    "dudit",
    "durant qu’",
    "durant que",
    "durant",
    "dvt",
    "eh bien",
    "emmi",
    "en attendant que",
    "en cas que",
    "en dépit que",
    "en dérivation",
    "en l’espèce",
    "en quoi",
    "en sorte qu’",
    "en sorte que",
    "en tant qu’",
    "en tant que",
    "en",
    "encore que",
    "endéans",
    "entenant",
    "entre",
    "entremi",
    "envers",
    "environ",
    "ergo",
    "ès",
    "est",
    "et",
    "et/ou",
    "étant donné que",
    "être",
    "excepté",
    "fa que",
    "fait à fait que",
    "fait que",
    "fait",
    "faites",
    "fak",
    "faque",
    "fasse le ciel que",
    "faute de quoi",
    "fois",
    "force",
    "forces",
    "fors",
    "grâce",
    "hormis",
    "hors",
    "huit vingts",
    "huit-cents",
    "huit-mille",
    "huit",
    "huitante-neuf",
    "huitante",
    "i.e.",
    "icelui",
    "id est",
    "il en vaut que",
    "il est de fait que",
    "il est possible que",
    "il n’empêche que",
    "il n’en reste pas moins que",
    "il n’est pas dit que",
    "il pourrait bien se faire que",
    "il se peut que",
    "il se pourrait que",
    "il serait possible que",
    "il",
    "ils",
    "j’ai",
    "je dis pas",
    "je ne sais quel",
    "je ne sais quelle",
    "je ne sais quelles",
    "je ne sais quels",
    "je",
    "joignant",
    "jouxte",
    "jusqu'",
    "jusqu'à",
    "jusqu'au",
    "jusqu’à ce que",
    "jusqu’à tant que",
    "jusqu’à temps que",
    "jusqu’au moment où",
    "jusqu",
    "jusque",
    "kék",
    "l'",
    "l’on",
    "l",
    "la",
    "le fait est que",
    "le",
    "led.",
    "ledit",
    "lequel",
    "les",
    "lès",
    "lesd.",
    "leur",
    "leurdit",
    "lez",
    "lors même que",
    "lorsqu’",
    "lorsqu’une fois",
    "lorsque",
    "lousté",
    "m’enfin",
    "ma",
    "maint",
    "mainte",
    "maintenant que",
    "maintes",
    "maints",
    "mais",
    "malgré que",
    "malgré",
    "me",
    "mehó",
    "même si",
    "même",
    "meuh",
    "mézalor",
    "mieux",
    "mil",
    "mille et un",
    "mille",
    "moins",
    "mon",
    "mondit",
    "moult",
    "moulte",
    "moultes",
    "moults",
    "moyennant",
    "n’a",
    "n’est",
    "n’importe quel",
    "n’importe quelle",
    "n’importe quelles",
    "n’importe quels",
    "n",
    "ne",
    "neuf-cents",
    "neuf-mille",
    "neuf",
    "ni plus ni moins que",
    "ni",
    "niveau",
    "noinante",
    "nombre de",
    "non plus",
    "nonante-cinq",
    "nonante-et-un",
    "nonante",
    "nonobstant que",
    "nonobstant",
    "nos",
    "notre",
    "nôtre",
    "nous",
    "nul",
    "nulle",
    "octante",
    "okazou",
    "on ne sait quel",
    "on ne sait quelle",
    "on ne sait quelles",
    "on ne sait quels",
    "on sait bien",
    "on",
    "ont",
    "onze",
    "or çà",
    "or donc",
    "or",
    "ordoncque",
    "ordoncques",
    "ôté",
    "ou alors",
    "ou bedon",
    "ou bien",
    "où ce que",
    "où que",
    "ou sinon",
    "ou",
    "où",
    "ousque",
    "oùsque",
    "outre",
    "par ces motifs",
    "par conséquent",
    "par où",
    "par-delà",
    "par-dessus",
    "par-devant",
    "par-devers",
    "par",
    "parce qu’",
    "parce que",
    "parce",
    "parceque",
    "parmi",
    "parmis",
    "partant",
    "pas un",
    "pas une",
    "pas",
    "pasque",
    "passé",
    "pcq",
    "pendant qu’",
    "pendant que",
    "pendant",
    "peu",
    "peut",
    "peux",
    "pis",
    "plein",
    "plus d’une",
    "plus ou moins",
    "plus",
    "plusieurs",
    "pour autant que",
    "pour ne pas dire",
    "pour peu que",
    "pour que",
    "pour",
    "pourceque",
    "pourque",
    "pourquoi",
    "pourveu que",
    "pourvu que",
    "pr",
    "présentement que",
    "presque tous",
    "presque tout",
    "presque toute",
    "presque toutes",
    "puis",
    "puisqu’",
    "puisque",
    "qd",
    "qq",
    "qu'",
    "qu",
    "quand bien même",
    "quand je pense",
    "quand on pense",
    "quand",
    "quant",
    "quantième",
    "quantité de",
    "quarante-cinq",
    "quarante-deux",
    "quarante-douze",
    "quarante-et-un",
    "quarante-huit",
    "quarante-neuf",
    "quarante-quatre",
    "quarante-sept",
    "quarante-six",
    "quarante-trois",
    "quarante-vingt",
    "quarante",
    "quat’",
    "quatorze",
    "quatre cent quatre",
    "quatre-cents",
    "quatre-mille",
    "quatre-vingt-cinq",
    "quatre-vingt-deux",
    "quatre-vingt-dix-huit",
    "quatre-vingt-dix-neuf",
    "quatre-vingt-dix-sept",
    "quatre-vingt-dix",
    "quatre-vingt-douze",
    "quatre-vingt-huit",
    "quatre-vingt-neuf",
    "quatre-vingt-onze",
    "quatre-vingt-quatorze",
    "quatre-vingt-quatre",
    "quatre-vingt-quinze",
    "quatre-vingt-seize",
    "quatre-vingt-sept",
    "quatre-vingt-six",
    "quatre-vingt-treize",
    "quatre-vingt-trois",
    "quatre-vingt-un",
    "quatre-vingt",
    "quatre-vingts",
    "quatre",
    "quatres",
    "quatrevingt",
    "quatrevingts",
    "que dis-je",
    "que non pas",
    "que’ques",
    "que",
    "quel",
    "quelle",
    "quelqu’",
    "quelque",
    "quelquefois que",
    "quelques",
    "quels",
    "quèque",
    "quèques",
    "question",
    "qui",
    "quinze",
    "quoiqu’",
    "quoique",
    "rapport que",
    "re",
    "rez",
    "s.v.",
    "s'il est ainsi que",
    "s’",
    "s",
    "s/s",
    "sa",
    "sampai",
    "sans ça",
    "sans que",
    "sans",
    "sauf que",
    "sauf",
    "savoir",
    "se",
    "seize",
    "selon que",
    "selon",
    "senza",
    "sept vingts",
    "sept-cents",
    "sept-mille",
    "sept",
    "septante-et-un",
    "septante",
    "ses",
    "seulement si",
    "si bien que",
    "si ce n’est que",
    "si ce n’est",
    "si et seulement si",
    "si jamais",
    "si même",
    "si oui ou non",
    "si peu que",
    "si seulement",
    "si tant est que",
    "si",
    "sinon",
    "sitôt que",
    "six vingt dix",
    "six vingts",
    "six-cent-soixante-six",
    "six-cents",
    "six-mille",
    "six-vingts",
    "six",
    "soit",
    "soixante et onze",
    "soixante-cinq",
    "soixante-deux",
    "soixante-dix-huit",
    "soixante-dix-neuf",
    "soixante-dix-sept",
    "soixante-douze",
    "soixante-et-onze",
    "soixante-et-un",
    "soixante-quatorze",
    "soixante-quatre",
    "soixante-quinze",
    "soixante-seize",
    "soixante-sept",
    "soixante-six",
    "soixante-treize",
    "soixante-trois",
    "soixante",
    "son",
    "sondit",
    "sont",
    "soubs",
    "sous prétexte que",
    "sous réserve de",
    "sous réserve que",
    "sous",
    "ss",
    "ssi",
    "su’",
    "sub",
    "suis",
    "suivant que",
    "suivant",
    "sur",
    "surtout que",
    "ta",
    "tandis qu’",
    "tandis que",
    "tandis",
    "tant et si bien que",
    "tant il y a que",
    "tant que",
    "tel et tel",
    "tel ou tel",
    "telle et telle",
    "telle ou telle",
    "telles et telles",
    "telles ou telles",
    "tels et tels",
    "tels ou tels",
    "tien",
    "ton",
    "touchant",
    "tous",
    "toustes",
    "tout ce qu’il y a de",
    "tout",
    "toute sorte de",
    "toute",
    "toutes sortes de",
    "toutes",
    "treize",
    "trente et un",
    "trente-cinq",
    "trente-deux",
    "trente-douze",
    "trente-et-un",
    "trente-huit",
    "trente-neuf",
    "trente-quatre",
    "trente-sept",
    "trente-six",
    "trente-trois",
    "trente",
    "trétout",
    "trois-cents",
    "trois-mille",
    "trois",
    "trouducune",
    "tt",
    "un et un seul",
    "un ou plusieurs",
    "un tas de",
    "un",
    "un(e)",
    "une couple de",
    "une fois que",
    "une manière de",
    "une ou plusieurs",
    "une pluralité de",
    "une",
    "va",
    "vais",
    "vers",
    "versus",
    "veut",
    "veux",
    "via",
    "vingt et un",
    "vingt-cinq",
    "vingt-deux",
    "vingt-et-un",
    "vingt-huit",
    "vingt-neuf",
    "vingt-quatre",
    "vingt-sept",
    "vingt-six",
    "vingt-trois",
    "vingt",
    "vo",
    "voici",
    "voilà",
    "vos",
    "vostre",
    "votre",
    "vôtre",
    "vous",
    "vs.",
    "vs",
    "vu que",
    "vu",
    "y.c.",
    "y",
    "zéro"
]
let dico_en = [
    "a bunch of",
    "a couple of",
    "a lot of",
    "a plurality of",
    "a way of",
    "a",
    "℁",
    "about",
    "above",
    "accepting",
    "according to",
    "adjoins",
    "after what",
    "after",
    "against",
    "all kinds of",
    "all that is",
    "all the less that",
    "all the less",
    "all the same",
    "all",
    "almost all",
    "almost everything",
    "also no",
    "also",
    "although",
    "among",
    "and / or",
    "and",
    "any kind of",
    "any",
    "approximately",
    "apr.",
    "are",
    "as and when",
    "as for",
    "as if",
    "as long as",
    "as much as",
    "as soon as",
    "as well as",
    "as",
    "assavoir",
    "at",
    "au",
    "audit",
    "aut’",
    "av.",
    "backwards",
    "barely ... that",
    "because of",
    "because",
    "because",
    "before that of",
    "before",
    "behind",
    "below",
    "besides",
    "better",
    "between",
    "beyond",
    "bicause",
    "buitante",
    "but",
    "by the way",
    "by where",
    "by-side",
    "by",
    "c.",
    "c.a.d.",
    "c/",
    "ca.",
    "ca",
    "car",
    "ce",
    "cent",
    "ces",
    "circa",
    "combiennths",
    "combientièmes",
    "concerning",
    "consequently",
    "considering that",
    "current",
    "currently that",
    "d",
    "date",
    "de l'",
    "de",
    "depending on",
    "desort that",
    "despite that",
    "despite",
    "devers",
    "dice",
    "different",
    "divers",
    "do",
    "ds",
    "du",
    "during",
    "dvt",
    "each",
    "eight hundred",
    "eight thousand",
    "eight",
    "eighteen",
    "eighty-eight",
    "eighty-five",
    "eighty-four",
    "eighty-nine",
    "eighty-one",
    "eighty-seven",
    "eighty-six",
    "eighty-three",
    "eighty-two",
    "eighty",
    "either",
    "emmi",
    "en",
    "enemy",
    "ès",
    "especially since",
    "especially that",
    "even if",
    "even that",
    "even when",
    "except that",
    "except",
    "expected",
    "fa que",
    "fact that",
    "fak",
    "faque",
    "fifteen",
    "fifty-eight",
    "fifty-five",
    "fifty-four",
    "fifty-nine",
    "fifty-one",
    "fifty-seven",
    "fifty-six",
    "fifty-three",
    "fifty-two",
    "fifty",
    "first that",
    "five hundred",
    "five thousand",
    "five",
    "following what",
    "for these reasons",
    "for",
    "force",
    "force",
    "forces",
    "fors",
    "forty-eight",
    "forty-five",
    "forty-four",
    "forty-nine",
    "forty-one",
    "forty-seven",
    "forty-six",
    "forty-three",
    "forty-twenty",
    "forty-two",
    "forty",
    "four hundred and four",
    "four hundred",
    "four thousand",
    "four",
    "fourteen",
    "from further than",
    "from the",
    "from where",
    "from",
    "full",
    "given that",
    "good number of",
    "good of",
    "he",
    "here is",
    "here",
    "however that",
    "I do not know which",
    "I don't know which",
    "I don't say",
    "i.e.",
    "I",
    "icelui",
    "id is",
    "ie",
    "if and only if",
    "if ever",
    "if it is so that",
    "if not",
    "if only",
    "if same",
    "in case",
    "in derivation",
    "in front",
    "in spite of",
    "in the moment that",
    "in the same way as",
    "in the time that",
    "in this case",
    "in what",
    "in which case",
    "in",
    "inside",
    "insofar as",
    "instead of what",
    "instead of",
    "is",
    "it could be that",
    "it could well be that",
    "it does not prevent",
    "it does not say that",
    "it is a fact that",
    "it is possible that",
    "it is worth that",
    "it is",
    "it may be that",
    "it would be possible that",
    "it's the devil if",
    "it's the devil that",
    "joining",
    "just in case",
    "kék",
    "know",
    "l'",
    "l’on",
    "l",
    "la",
    "le",
    "led.",
    "lès",
    "lesd.",
    "less",
    "lest",
    "leurdit",
    "level",
    "lez",
    "like what",
    "like",
    "lousté",
    "ma",
    "made that",
    "maint",
    "make heaven that",
    "many others",
    "many",
    "may",
    "me finally",
    "mehó",
    "meuh",
    "mezalor",
    "mil",
    "mon",
    "mondit",
    "more or less",
    "more than one",
    "moult",
    "moulte",
    "moultes",
    "moults",
    "much else",
    "n’a",
    "n",
    "nay",
    "neither more nor less than",
    "neither",
    "new",
    "next",
    "ni",
    "nine hundred",
    "nine thousand",
    "nineteen",
    "ninety-eight",
    "ninety-five",
    "ninety-four",
    "ninety-nine",
    "ninety-one",
    "ninety-seven",
    "ninety-six",
    "ninety-three",
    "ninety-two",
    "ninety",
    "noinante",
    "none",
    "not one",
    "not to say",
    "not",
    "notwithstanding that",
    "notwithstanding",
    "now that",
    "nul",
    "null",
    "number of",
    "octante",
    "of said",
    "of",
    "okazou",
    "on the grounds that",
    "on",
    "once",
    "one and only one",
    "one hundred and fifty-five",
    "one hundred and fifty-two",
    "one hundred and thirty",
    "one hundred thousand",
    "one or more",
    "only if",
    "onze",
    "or çà",
    "or donc",
    "or else",
    "or so",
    "or",
    "or",
    "ordoncque",
    "ordoncques",
    "other",
    "others",
    "otherwise",
    "ou bedon",
    "our",
    "ours",
    "ousque",
    "oùsque",
    "out",
    "outside",
    "over",
    "pasque",
    "past",
    "pcq",
    "pis",
    "plus",
    "pr",
    "provided that",
    "qd",
    "qq",
    "qu’",
    "quant",
    "quantity of",
    "quat’",
    "que",
    "question",
    "re",
    "removed",
    "report that",
    "rez",
    "s.v.",
    "s’",
    "s",
    "s/s",
    "sa",
    "said",
    "said",
    "same",
    "sampai",
    "say that",
    "se",
    "seen",
    "seize",
    "sept-cents",
    "sept",
    "ses",
    "seven thousand",
    "seven twenty",
    "seventeen",
    "seventy-eight",
    "seventy-five",
    "seventy-four",
    "seventy-nine",
    "seventy-one",
    "seventy-seven",
    "seventy-six",
    "seventy-three",
    "seventy-two",
    "seventy",
    "several",
    "si",
    "since",
    "six hundred sixty-six",
    "six twenty ten",
    "six twenty",
    "six-cents",
    "six-thousand",
    "six",
    "sixty-five",
    "sixty-four",
    "sixty-one",
    "sixty-seven",
    "sixty-six",
    "sixty-three",
    "sixty-two",
    "sixty",
    "so little that",
    "so much so that",
    "so that",
    "so",
    "some",
    "someone",
    "sometimes that",
    "sometimes",
    "son",
    "sondit",
    "soubs",
    "ss",
    "ssi",
    "starting",
    "su’",
    "sub",
    "subject to",
    "such and such",
    "such or such",
    "such that",
    "ta",
    "ten thousand",
    "ten",
    "thanks to",
    "that is to know",
    "that is to say",
    "that not",
    "that's why",
    "the fact is",
    "the fact remains that",
    "the",
    "their",
    "then",
    "therefore",
    "therefore",
    "they",
    "third",
    "thirteen",
    "thirty-eight",
    "thirty-five",
    "thirty-four",
    "thirty-nine",
    "thirty-one",
    "thirty-seven",
    "thirty-six",
    "thirty-three",
    "thirty-twelve",
    "thirty-two",
    "thirty",
    "this being",
    "this",
    "though",
    "thousand and one",
    "thousand",
    "three hundred",
    "three-thousand",
    "three",
    "tien",
    "times",
    "to be",
    "to know",
    "to such an extent that",
    "to the point that",
    "to",
    "ton",
    "touching",
    "trétout",
    "trouducune",
    "tt",
    "twelve",
    "twenty-eight",
    "twenty-five",
    "twenty-four",
    "twenty-nine",
    "twenty-one",
    "twenty-seven",
    "twenty-six",
    "twenty-three",
    "twenty-two",
    "twenty",
    "two hundred",
    "two or three",
    "two thousand",
    "two three",
    "two",
    "un",
    "un(e)",
    "under the pretext that",
    "under",
    "unless",
    "until the moment",
    "until",
    "various",
    "versus",
    "via",
    "vo",
    "vostre",
    "vs.",
    "vs",
    "we do not know which",
    "we know",
    "well",
    "what is it",
    "when I think",
    "when once",
    "when you think",
    "when",
    "where what",
    "where",
    "whereas",
    "wherever",
    "whether or not",
    "which",
    "while",
    "why",
    "with",
    "within",
    "without that",
    "without",
    "y.c.",
    "y",
    "yield",
    "you",
    "your",
    "yours",
    "zero"
]

let getDictionnary = () => {
    switch (document.documentElement.lang) {
        case 'fr':
            return specialChars.concat(dico_fr)
        case 'en':
            return specialChars.concat(dico_en)
        default:
            return []
    }
}