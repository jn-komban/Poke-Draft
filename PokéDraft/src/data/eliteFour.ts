import type { PokeType } from "./pokemon";
import type { Region } from "./gyms";

export interface EliteMember {
  name: string;
  title: "Elite Four" | "Champion";
  type: PokeType;
  team: { name: string; types: PokeType[]; level: number; bst: number }[];
}

export interface RegionalEliteFour {
  region: Region;
  members: EliteMember[]; // 4 elite four + 1 champion
}

export const ELITE_FOUR: RegionalEliteFour[] = [
  // ===== Kanto =====
  {
    region: "Kanto",
    members: [
      { name: "Lorelei", title: "Elite Four", type: "ice",
        team: [
          { name: "Dewgong",  types: ["water","ice"], level: 52, bst: 475 },
          { name: "Cloyster", types: ["water","ice"], level: 51, bst: 525 },
          { name: "Slowbro",  types: ["water","psychic"], level: 52, bst: 490 },
          { name: "Jynx",     types: ["ice","psychic"], level: 54, bst: 455 },
          { name: "Lapras",   types: ["water","ice"], level: 54, bst: 535 },
        ]},
      { name: "Bruno", title: "Elite Four", type: "fighting",
        team: [
          { name: "Onix",     types: ["rock","ground"], level: 51, bst: 385 },
          { name: "Hitmonchan", types: ["fighting"], level: 53, bst: 455 },
          { name: "Hitmonlee", types: ["fighting"], level: 53, bst: 455 },
          { name: "Onix",     types: ["rock","ground"], level: 54, bst: 385 },
          { name: "Machamp",  types: ["fighting"], level: 56, bst: 505 },
        ]},
      { name: "Agatha", title: "Elite Four", type: "ghost",
        team: [
          { name: "Gengar",   types: ["ghost","poison"], level: 54, bst: 500 },
          { name: "Golbat",   types: ["poison","flying"], level: 54, bst: 455 },
          { name: "Haunter",  types: ["ghost","poison"], level: 53, bst: 405 },
          { name: "Arbok",    types: ["poison"], level: 56, bst: 448 },
          { name: "Gengar",   types: ["ghost","poison"], level: 58, bst: 500 },
        ]},
      { name: "Lance", title: "Elite Four", type: "dragon",
        team: [
          { name: "Gyarados", types: ["water","flying"], level: 56, bst: 540 },
          { name: "Dragonair",types: ["dragon"], level: 54, bst: 420 },
          { name: "Dragonair",types: ["dragon"], level: 54, bst: 420 },
          { name: "Aerodactyl",types: ["rock","flying"], level: 58, bst: 515 },
          { name: "Dragonite",types: ["dragon","flying"], level: 60, bst: 600 },
        ]},
      { name: "Blue", title: "Champion", type: "normal",
        team: [
          { name: "Pidgeot",  types: ["normal","flying"], level: 59, bst: 479 },
          { name: "Alakazam", types: ["psychic"], level: 57, bst: 500 },
          { name: "Rhydon",   types: ["ground","rock"], level: 59, bst: 485 },
          { name: "Arcanine", types: ["fire"], level: 61, bst: 555 },
          { name: "Exeggutor",types: ["grass","psychic"], level: 59, bst: 530 },
          { name: "Charizard",types: ["fire","flying"], level: 63, bst: 534 },
        ]},
    ],
  },
  // ===== Johto =====
  {
    region: "Johto",
    members: [
      { name: "Will", title: "Elite Four", type: "psychic",
        team: [
          { name: "Xatu",      types: ["psychic","flying"], level: 40, bst: 470 },
          { name: "Jynx",      types: ["ice","psychic"], level: 41, bst: 455 },
          { name: "Exeggutor", types: ["grass","psychic"], level: 41, bst: 530 },
          { name: "Slowbro",   types: ["water","psychic"], level: 41, bst: 490 },
          { name: "Xatu",      types: ["psychic","flying"], level: 42, bst: 470 },
        ]},
      { name: "Koga", title: "Elite Four", type: "poison",
        team: [
          { name: "Ariados",   types: ["bug","poison"], level: 40, bst: 400 },
          { name: "Venomoth",  types: ["bug","poison"], level: 41, bst: 450 },
          { name: "Forretress",types: ["bug","steel"], level: 43, bst: 465 },
          { name: "Muk",       types: ["poison"], level: 42, bst: 500 },
          { name: "Crobat",    types: ["poison","flying"], level: 44, bst: 535 },
        ]},
      { name: "Bruno", title: "Elite Four", type: "fighting",
        team: [
          { name: "Hitmontop", types: ["fighting"], level: 42, bst: 455 },
          { name: "Hitmonlee", types: ["fighting"], level: 42, bst: 455 },
          { name: "Hitmonchan",types: ["fighting"], level: 42, bst: 455 },
          { name: "Onix",      types: ["rock","ground"], level: 43, bst: 385 },
          { name: "Machamp",   types: ["fighting"], level: 46, bst: 505 },
        ]},
      { name: "Karen", title: "Elite Four", type: "dark",
        team: [
          { name: "Umbreon",   types: ["dark"], level: 42, bst: 525 },
          { name: "Vileplume", types: ["grass","poison"], level: 42, bst: 490 },
          { name: "Gengar",    types: ["ghost","poison"], level: 45, bst: 500 },
          { name: "Murkrow",   types: ["dark","flying"], level: 44, bst: 405 },
          { name: "Houndoom",  types: ["dark","fire"], level: 47, bst: 500 },
        ]},
      { name: "Lance", title: "Champion", type: "dragon",
        team: [
          { name: "Gyarados",  types: ["water","flying"], level: 44, bst: 540 },
          { name: "Dragonite", types: ["dragon","flying"], level: 47, bst: 600 },
          { name: "Dragonite", types: ["dragon","flying"], level: 47, bst: 600 },
          { name: "Aerodactyl",types: ["rock","flying"], level: 46, bst: 515 },
          { name: "Charizard", types: ["fire","flying"], level: 46, bst: 534 },
          { name: "Dragonite", types: ["dragon","flying"], level: 50, bst: 600 },
        ]},
    ],
  },
  // ===== Hoenn =====
  {
    region: "Hoenn",
    members: [
      { name: "Sidney", title: "Elite Four", type: "dark",
        team: [
          { name: "Mightyena", types: ["dark"], level: 46, bst: 420 },
          { name: "Shiftry",   types: ["grass","dark"], level: 48, bst: 480 },
          { name: "Cacturne",  types: ["grass","dark"], level: 46, bst: 475 },
          { name: "Crawdaunt", types: ["water","dark"], level: 48, bst: 468 },
          { name: "Absol",     types: ["dark"], level: 49, bst: 465 },
        ]},
      { name: "Phoebe", title: "Elite Four", type: "ghost",
        team: [
          { name: "Dusclops",  types: ["ghost"], level: 48, bst: 455 },
          { name: "Banette",   types: ["ghost"], level: 49, bst: 455 },
          { name: "Sableye",   types: ["dark","ghost"], level: 50, bst: 380 },
          { name: "Banette",   types: ["ghost"], level: 49, bst: 455 },
          { name: "Dusclops",  types: ["ghost"], level: 51, bst: 455 },
        ]},
      { name: "Glacia", title: "Elite Four", type: "ice",
        team: [
          { name: "Sealeo",    types: ["ice","water"], level: 50, bst: 410 },
          { name: "Glalie",    types: ["ice"], level: 50, bst: 480 },
          { name: "Sealeo",    types: ["ice","water"], level: 52, bst: 410 },
          { name: "Glalie",    types: ["ice"], level: 52, bst: 480 },
          { name: "Walrein",   types: ["ice","water"], level: 53, bst: 530 },
        ]},
      { name: "Drake", title: "Elite Four", type: "dragon",
        team: [
          { name: "Shelgon",   types: ["dragon"], level: 52, bst: 420 },
          { name: "Altaria",   types: ["dragon","flying"], level: 54, bst: 490 },
          { name: "Flygon",    types: ["ground","dragon"], level: 53, bst: 520 },
          { name: "Flygon",    types: ["ground","dragon"], level: 53, bst: 520 },
          { name: "Salamence", types: ["dragon","flying"], level: 55, bst: 600 },
        ]},
      { name: "Steven", title: "Champion", type: "steel",
        team: [
          { name: "Skarmory",  types: ["steel","flying"], level: 57, bst: 465 },
          { name: "Claydol",   types: ["ground","psychic"], level: 55, bst: 500 },
          { name: "Aggron",    types: ["steel","rock"], level: 56, bst: 530 },
          { name: "Cradily",   types: ["rock","grass"], level: 56, bst: 495 },
          { name: "Armaldo",   types: ["rock","bug"], level: 56, bst: 495 },
          { name: "Metagross", types: ["steel","psychic"], level: 58, bst: 600 },
        ]},
    ],
  },
  // ===== Sinnoh =====
  {
    region: "Sinnoh",
    members: [
      { name: "Aaron", title: "Elite Four", type: "bug",
        team: [
          { name: "Yanmega",   types: ["bug","flying"], level: 49, bst: 515 },
          { name: "Scizor",    types: ["bug","steel"], level: 49, bst: 500 },
          { name: "Vespiquen", types: ["bug","flying"], level: 50, bst: 474 },
          { name: "Heracross", types: ["bug","fighting"], level: 51, bst: 500 },
          { name: "Drapion",   types: ["poison","dark"], level: 53, bst: 500 },
        ]},
      { name: "Bertha", title: "Elite Four", type: "ground",
        team: [
          { name: "Quagsire",  types: ["water","ground"], level: 50, bst: 430 },
          { name: "Sudowoodo", types: ["rock"], level: 50, bst: 410 },
          { name: "Golem",     types: ["rock","ground"], level: 52, bst: 495 },
          { name: "Whiscash",  types: ["water","ground"], level: 52, bst: 468 },
          { name: "Hippowdon", types: ["ground"], level: 55, bst: 525 },
        ]},
      { name: "Flint", title: "Elite Four", type: "fire",
        team: [
          { name: "Houndoom",  types: ["dark","fire"], level: 52, bst: 500 },
          { name: "Rapidash",  types: ["fire"], level: 53, bst: 500 },
          { name: "Infernape", types: ["fire","fighting"], level: 55, bst: 534 },
          { name: "Lopunny",   types: ["normal"], level: 52, bst: 480 },
          { name: "Magmortar", types: ["fire"], level: 55, bst: 540 },
        ]},
      { name: "Lucian", title: "Elite Four", type: "psychic",
        team: [
          { name: "Mr. Mime",  types: ["psychic","fairy"], level: 53, bst: 460 },
          { name: "Espeon",    types: ["psychic"], level: 55, bst: 525 },
          { name: "Bronzong",  types: ["steel","psychic"], level: 54, bst: 500 },
          { name: "Alakazam",  types: ["psychic"], level: 56, bst: 500 },
          { name: "Gallade",   types: ["psychic","fighting"], level: 59, bst: 518 },
        ]},
      { name: "Cynthia", title: "Champion", type: "dragon",
        team: [
          { name: "Spiritomb", types: ["ghost","dark"], level: 58, bst: 485 },
          { name: "Roserade",  types: ["grass","poison"], level: 58, bst: 515 },
          { name: "Togekiss",  types: ["fairy","flying"], level: 60, bst: 545 },
          { name: "Lucario",   types: ["fighting","steel"], level: 60, bst: 525 },
          { name: "Milotic",   types: ["water"], level: 58, bst: 540 },
          { name: "Garchomp",  types: ["dragon","ground"], level: 62, bst: 600 },
        ]},
    ],
  },
];
