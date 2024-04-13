import { TypeLists, TypeListsSelect } from "@/interface/generics";
import { CategoryLists, SubcategoryLists } from "@/interface/generics/ISubcategories.interface";
import { MultiValue } from "react-select";

export interface Expert {
  _id: string;
  user: User;
  firstName: string;
  lastName: string;
  bgPhoto: string;
  picture: string;
  profileInfo: PersonalInfo | null;
  status: IExpertStatus;
  skills: list[];
  languages: DataLanguage[];
  location: ExpertLocationResponse;
  experience: number | null;
  workmode: IExpertWorkMode | null;
  degrees: IExpertDegree[];
  services: IExpertService[];
  portfolios: { portfolio: IExpertPortfolio; createdAt: string }[];
  subcategories: SubcategoryLists[];
}

export interface PersonalInfo {
  _id: string;
  description: string;
  title: string;
  exp_id: number;
}


export interface GeoLocation{
  type: string;
  coordinates: number[];
}
export interface ExpertLocationResponse {
  name: string;
  geoLocation: GeoLocation;
}


export interface ExpertLocation {
  name: string;
  lat: number;
  lng: number;
}
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  bgPhoto: string;
  picture: string;
  profileInfo: PersonalInfo | null;
  status: IExpertStatus;
  skills: list[];
  languages: DataLanguage[];
  experience: number | null;
  workmode: IExpertWorkMode | null;
  degrees: IExpertDegree[];
  services: IExpertService[];
  portfolio: { portfolio: IExpertPortfolio[]; createdAt: string };
}

export interface list {
  _id: string;
  name: string;
}

export interface IExpertExperience {
  experience: TypeLists;
}

export interface DataLanguage {
  language: FluffyLanguage;
  proficiency: TypeLists;
}

export interface Language {
  language: FluffyLanguage;
}

export interface FluffyLanguage {
  _id: string;
  name: string;
  iso: string;
  flag: string;
}

export interface Proficiency {
  proficiency: TypeLists;
}
export interface IExpertStatus {
  status: TypeLists;
  createdAt: string;
}

export interface IExpertWorkMode {
  workmode: TypeLists;
  createdAt: string;
}
export interface IExpertDegree {
  _id: string;
  field: string;
  academicDegree: string;
  start: string;
  end: string;
  school: string;
  exp_id: number;
}

export interface IExpertService {
  _id: string;
  title: string;
  price: number;
  description: string;
  exp_id: number;
}

export interface IExpertPortfolio {
  cite: string;
  image: string;
  _id: string;
}
