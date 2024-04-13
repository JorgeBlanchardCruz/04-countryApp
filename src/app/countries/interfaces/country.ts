export interface Country {
  name:         Name;
  tld:          string[];
  cca2:         string;
  ccn3:         string;
  cca3:         string;
  cioc:         string;
  independent:  boolean;
  status:       string;
  unMember:     boolean;
  currencies:   Currencies;
  idd:          Idd;
  capital:      string[];
  altSpellings: string[];
  region:       string;
  subregion:    string;
  languages:    Languages;
  translations: { [key: string]: Translation };
  latlng:       number[];
  landlocked:   boolean;
  borders:      string[];
  area:         number;
  demonyms:     Demonyms;
  flag:         string;
  maps:         Maps;
  population:   number;
  gini:         { [key: string]: number };
  fifa:         string;
  car:          Car;
  timezones:    string[];
  continents:   string[];
  flags:        Flags;
  coatOfArms:   CoatOfArms;
  startOfWeek:  string;
  capitalInfo:  CapitalInfo;
  postalCode?:  PostalCode;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Car {
  signs: string[];
  side:  string;
}

export interface CoatOfArms {
  png: string;
  svg: string;
}

export interface Currencies {
  EUR?: Eur;
  SRD?: Eur;
  USD?: Eur;
  XCD?: Eur;
  XOF?: Eur;
  XPF?: Eur;
  ZAR?: Eur;
  AED?: Eur;
  AFN?: Eur;
  ALL?: Eur;
  AMD?: Eur;
  ANG?: Eur;
  AOA?: Eur;
  ARS?: Eur;
  AUD?: Eur;
  AWG?: Eur;
  AZN?: Eur;
  BAM?: Eur;
  BBD?: Eur;
}

export interface Eur {
  name:   string;
  symbol: string;
}

export interface Demonyms {
  eng: Eng;
  fra: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Idd {
  root:     string;
  suffixes: string[];
}

export interface Languages {
  fra?: string;
  nld?: string;
  por?: string;
  spa?: string;
  deu?: string;
  ita?: string;
  jpn?: string;
  kor?: string;
  zho?: string;
  rus?: string;
  ara?: string;
  hin?: string;
  ben?: string;
  urd?: string;
  pan?: string;
  guj?: string;
  mar?: string;
  tel?: string;
  tam?: string;
  mal?: string;
  kan?: string;
  sin?: string;
  tha?: string;
  mya?: string;
  khm?: string;
  vie?: string;
  msa?: string;
  fil?: string;
  ind?: string;
  pus?: string;
  tuk?: string;
  uzb?: string;
  kaz?: string;
  kir?: string;
  tur?: string;
  tgk?: string;
  tat?: string;
  chv?: string;
  mon?: string;
  hau?: string;
  amh?: string;
  orm?: string;
  som?: string;
  swa?: string;
  run?: string;
  ron?: string;
  bul?: string;
  hrv?: string;
  slv?: string;
  ces?: string;
  slk?: string;
  pol?: string;
  hun?: string;
  sqi?: string;
  ell?: string;
  hye?: string;
  kat?: string;
  aze?: string;
  ukr?: string;
  bel?: string;
  cal?: string;
  cha?: string;
  eng?: string;
  moh?: string;
  iro?: string;
  nav?: string;
  oji?: string;
  cze?: string;
  dan?: string;
  fin?: string;
  isl?: string;
  nor?: string;
  swe?: string;
  est?: string;
  lav?: string;
  lit?: string;
}

export interface Maps {
  googleMaps:     string;
  openStreetMaps: string;
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: NativeName;
}

export interface NativeName {
  fra?: Translation;
  nld?: Translation;
  por?: Translation;
  spa?: Translation;
  deu?: Translation;
  ita?: Translation;
  jpn?: Translation;
  kor?: Translation;
  zho?: Translation;
  rus?: Translation;
  ara?: Translation;
  hin?: Translation;
  ben?: Translation;
}

export interface Translation {
  official: string;
  common:   string;
}

export interface PostalCode {
  format: string;
  regex:  string;
}
