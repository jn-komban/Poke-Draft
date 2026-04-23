import type { PokeType } from "./pokemon";

export type Region = "Kanto" | "Johto" | "Hoenn" | "Sinnoh";

export interface GymLeader {
  name: string;
  city: string;
  badge: string;
  type: PokeType;
  region: Region;
  team: { name: string; types: PokeType[]; level: number; bst: number }[];
}

export const GYMS: GymLeader[] = [
  // ===== Kanto =====
  { name: "Brock", city: "Pewter", badge: "Boulder", type: "rock", region: "Kanto",
    team: [
      { name: "Geodude", types: ["rock", "ground"], level: 12, bst: 300 },
      { name: "Onix",    types: ["rock", "ground"], level: 14, bst: 385 },
    ]},
  { name: "Misty", city: "Cerulean", badge: "Cascade", type: "water", region: "Kanto",
    team: [
      { name: "Staryu",   types: ["water"], level: 18, bst: 340 },
      { name: "Starmie",  types: ["water", "psychic"], level: 21, bst: 520 },
    ]},
  { name: "Lt. Surge", city: "Vermilion", badge: "Thunder", type: "electric", region: "Kanto",
    team: [
      { name: "Voltorb",  types: ["electric"], level: 21, bst: 330 },
      { name: "Pikachu",  types: ["electric"], level: 18, bst: 320 },
      { name: "Raichu",   types: ["electric"], level: 24, bst: 485 },
    ]},
  { name: "Erika", city: "Celadon", badge: "Rainbow", type: "grass", region: "Kanto",
    team: [
      { name: "Victreebel", types: ["grass", "poison"], level: 29, bst: 490 },
      { name: "Tangela",    types: ["grass"], level: 24, bst: 435 },
      { name: "Vileplume",  types: ["grass", "poison"], level: 29, bst: 490 },
    ]},
  { name: "Koga", city: "Fuchsia", badge: "Soul", type: "poison", region: "Kanto",
    team: [
      { name: "Koffing", types: ["poison"], level: 37, bst: 340 },
      { name: "Muk",     types: ["poison"], level: 39, bst: 500 },
      { name: "Weezing", types: ["poison"], level: 43, bst: 490 },
    ]},
  { name: "Sabrina", city: "Saffron", badge: "Marsh", type: "psychic", region: "Kanto",
    team: [
      { name: "Kadabra", types: ["psychic"], level: 38, bst: 405 },
      { name: "Mr. Mime", types: ["psychic", "fairy"], level: 37, bst: 460 },
      { name: "Alakazam", types: ["psychic"], level: 43, bst: 500 },
    ]},
  { name: "Blaine", city: "Cinnabar", badge: "Volcano", type: "fire", region: "Kanto",
    team: [
      { name: "Growlithe", types: ["fire"], level: 42, bst: 350 },
      { name: "Ponyta",    types: ["fire"], level: 40, bst: 410 },
      { name: "Rapidash",  types: ["fire"], level: 42, bst: 500 },
      { name: "Arcanine",  types: ["fire"], level: 47, bst: 555 },
    ]},
  { name: "Giovanni", city: "Viridian", badge: "Earth", type: "ground", region: "Kanto",
    team: [
      { name: "Rhyhorn",  types: ["ground", "rock"], level: 45, bst: 345 },
      { name: "Dugtrio",  types: ["ground"], level: 42, bst: 425 },
      { name: "Nidoqueen",types: ["poison", "ground"], level: 44, bst: 505 },
      { name: "Nidoking", types: ["poison", "ground"], level: 45, bst: 505 },
      { name: "Rhydon",   types: ["ground", "rock"], level: 50, bst: 485 },
    ]},

  // ===== Johto =====
  { name: "Falkner", city: "Violet", badge: "Zephyr", type: "flying", region: "Johto",
    team: [
      { name: "Pidgey",    types: ["normal", "flying"], level: 7, bst: 251 },
      { name: "Pidgeotto", types: ["normal", "flying"], level: 9, bst: 349 },
    ]},
  { name: "Bugsy", city: "Azalea", badge: "Hive", type: "bug", region: "Johto",
    team: [
      { name: "Metapod", types: ["bug"], level: 14, bst: 205 },
      { name: "Kakuna",  types: ["bug", "poison"], level: 14, bst: 205 },
      { name: "Scyther", types: ["bug", "flying"], level: 16, bst: 500 },
    ]},
  { name: "Whitney", city: "Goldenrod", badge: "Plain", type: "normal", region: "Johto",
    team: [
      { name: "Clefairy", types: ["fairy"], level: 18, bst: 323 },
      { name: "Miltank",  types: ["normal"], level: 20, bst: 490 },
    ]},
  { name: "Morty", city: "Ecruteak", badge: "Fog", type: "ghost", region: "Johto",
    team: [
      { name: "Gastly",   types: ["ghost", "poison"], level: 21, bst: 230 },
      { name: "Haunter",  types: ["ghost", "poison"], level: 21, bst: 405 },
      { name: "Gengar",   types: ["ghost", "poison"], level: 25, bst: 500 },
      { name: "Haunter",  types: ["ghost", "poison"], level: 23, bst: 405 },
    ]},
  { name: "Chuck", city: "Cianwood", badge: "Storm", type: "fighting", region: "Johto",
    team: [
      { name: "Primeape", types: ["fighting"], level: 29, bst: 455 },
      { name: "Poliwrath", types: ["water", "fighting"], level: 31, bst: 510 },
    ]},
  { name: "Jasmine", city: "Olivine", badge: "Mineral", type: "steel", region: "Johto",
    team: [
      { name: "Magnemite", types: ["electric", "steel"], level: 30, bst: 325 },
      { name: "Magnemite", types: ["electric", "steel"], level: 30, bst: 325 },
      { name: "Steelix",   types: ["steel", "ground"], level: 35, bst: 610 },
    ]},
  { name: "Pryce", city: "Mahogany", badge: "Glacier", type: "ice", region: "Johto",
    team: [
      { name: "Seel",    types: ["water"], level: 27, bst: 325 },
      { name: "Dewgong", types: ["water", "ice"], level: 29, bst: 475 },
      { name: "Piloswine", types: ["ice", "ground"], level: 31, bst: 450 },
    ]},
  { name: "Clair", city: "Blackthorn", badge: "Rising", type: "dragon", region: "Johto",
    team: [
      { name: "Dragonair",  types: ["dragon"], level: 38, bst: 420 },
      { name: "Dragonair",  types: ["dragon"], level: 38, bst: 420 },
      { name: "Gyarados",   types: ["water", "flying"], level: 38, bst: 540 },
      { name: "Kingdra",    types: ["water", "dragon"], level: 41, bst: 540 },
    ]},

  // ===== Hoenn =====
  { name: "Roxanne", city: "Rustboro", badge: "Stone", type: "rock", region: "Hoenn",
    team: [
      { name: "Geodude", types: ["rock", "ground"], level: 14, bst: 300 },
      { name: "Nosepass", types: ["rock"], level: 15, bst: 375 },
    ]},
  { name: "Brawly", city: "Dewford", badge: "Knuckle", type: "fighting", region: "Hoenn",
    team: [
      { name: "Machop",   types: ["fighting"], level: 16, bst: 305 },
      { name: "Makuhita", types: ["fighting"], level: 19, bst: 237 },
    ]},
  { name: "Wattson", city: "Mauville", badge: "Dynamo", type: "electric", region: "Hoenn",
    team: [
      { name: "Voltorb",  types: ["electric"], level: 20, bst: 330 },
      { name: "Electrike", types: ["electric"], level: 20, bst: 295 },
      { name: "Magneton", types: ["electric", "steel"], level: 22, bst: 465 },
      { name: "Manectric", types: ["electric"], level: 24, bst: 475 },
    ]},
  { name: "Flannery", city: "Lavaridge", badge: "Heat", type: "fire", region: "Hoenn",
    team: [
      { name: "Numel",    types: ["fire", "ground"], level: 24, bst: 305 },
      { name: "Slugma",   types: ["fire"], level: 24, bst: 250 },
      { name: "Camerupt", types: ["fire", "ground"], level: 26, bst: 460 },
      { name: "Torkoal",  types: ["fire"], level: 29, bst: 470 },
    ]},
  { name: "Norman", city: "Petalburg", badge: "Balance", type: "normal", region: "Hoenn",
    team: [
      { name: "Spinda",   types: ["normal"], level: 27, bst: 360 },
      { name: "Vigoroth", types: ["normal"], level: 27, bst: 440 },
      { name: "Linoone",  types: ["normal"], level: 29, bst: 420 },
      { name: "Slaking",  types: ["normal"], level: 31, bst: 670 },
    ]},
  { name: "Winona", city: "Fortree", badge: "Feather", type: "flying", region: "Hoenn",
    team: [
      { name: "Swellow", types: ["normal", "flying"], level: 29, bst: 455 },
      { name: "Pelipper", types: ["water", "flying"], level: 29, bst: 440 },
      { name: "Skarmory", types: ["steel", "flying"], level: 31, bst: 465 },
      { name: "Altaria", types: ["dragon", "flying"], level: 33, bst: 490 },
    ]},
  { name: "Tate & Liza", city: "Mossdeep", badge: "Mind", type: "psychic", region: "Hoenn",
    team: [
      { name: "Claydol",  types: ["ground", "psychic"], level: 41, bst: 500 },
      { name: "Xatu",     types: ["psychic", "flying"], level: 41, bst: 470 },
      { name: "Lunatone", types: ["rock", "psychic"], level: 42, bst: 460 },
      { name: "Solrock",  types: ["rock", "psychic"], level: 42, bst: 460 },
    ]},
  { name: "Wallace", city: "Sootopolis", badge: "Rain", type: "water", region: "Hoenn",
    team: [
      { name: "Luvdisc",   types: ["water"], level: 40, bst: 330 },
      { name: "Whiscash",  types: ["water", "ground"], level: 42, bst: 468 },
      { name: "Sealeo",    types: ["ice", "water"], level: 40, bst: 410 },
      { name: "Seaking",   types: ["water"], level: 42, bst: 450 },
      { name: "Milotic",   types: ["water"], level: 43, bst: 540 },
    ]},

  // ===== Sinnoh =====
  { name: "Roark", city: "Oreburgh", badge: "Coal", type: "rock", region: "Sinnoh",
    team: [
      { name: "Geodude",   types: ["rock", "ground"], level: 12, bst: 300 },
      { name: "Onix",      types: ["rock", "ground"], level: 12, bst: 385 },
      { name: "Cranidos",  types: ["rock"], level: 14, bst: 350 },
    ]},
  { name: "Gardenia", city: "Eterna", badge: "Forest", type: "grass", region: "Sinnoh",
    team: [
      { name: "Cherubi",   types: ["grass"], level: 19, bst: 275 },
      { name: "Turtwig",   types: ["grass"], level: 19, bst: 318 },
      { name: "Roserade",  types: ["grass", "poison"], level: 22, bst: 515 },
    ]},
  { name: "Maylene", city: "Veilstone", badge: "Cobble", type: "fighting", region: "Sinnoh",
    team: [
      { name: "Meditite",  types: ["fighting", "psychic"], level: 27, bst: 280 },
      { name: "Machoke",   types: ["fighting"], level: 27, bst: 405 },
      { name: "Lucario",   types: ["fighting", "steel"], level: 30, bst: 525 },
    ]},
  { name: "Crasher Wake", city: "Pastoria", badge: "Fen", type: "water", region: "Sinnoh",
    team: [
      { name: "Gyarados",  types: ["water", "flying"], level: 27, bst: 540 },
      { name: "Quagsire",  types: ["water", "ground"], level: 27, bst: 430 },
      { name: "Floatzel",  types: ["water"], level: 30, bst: 495 },
    ]},
  { name: "Fantina", city: "Hearthome", badge: "Relic", type: "ghost", region: "Sinnoh",
    team: [
      { name: "Duskull",     types: ["ghost"], level: 32, bst: 295 },
      { name: "Haunter",     types: ["ghost", "poison"], level: 34, bst: 405 },
      { name: "Mismagius",   types: ["ghost"], level: 36, bst: 495 },
    ]},
  { name: "Byron", city: "Canalave", badge: "Mine", type: "steel", region: "Sinnoh",
    team: [
      { name: "Magneton",  types: ["electric", "steel"], level: 36, bst: 465 },
      { name: "Steelix",   types: ["steel", "ground"], level: 36, bst: 610 },
      { name: "Bastiodon", types: ["rock", "steel"], level: 39, bst: 495 },
    ]},
  { name: "Candice", city: "Snowpoint", badge: "Icicle", type: "ice", region: "Sinnoh",
    team: [
      { name: "Sneasel",   types: ["dark", "ice"], level: 40, bst: 430 },
      { name: "Piloswine", types: ["ice", "ground"], level: 40, bst: 450 },
      { name: "Abomasnow", types: ["grass", "ice"], level: 42, bst: 494 },
      { name: "Froslass",  types: ["ice", "ghost"], level: 44, bst: 480 },
    ]},
  { name: "Volkner", city: "Sunyshore", badge: "Beacon", type: "electric", region: "Sinnoh",
    team: [
      { name: "Jolteon",   types: ["electric"], level: 46, bst: 525 },
      { name: "Raichu",    types: ["electric"], level: 46, bst: 485 },
      { name: "Luxray",    types: ["electric"], level: 48, bst: 523 },
      { name: "Electivire",types: ["electric"], level: 50, bst: 540 },
    ]},
];
