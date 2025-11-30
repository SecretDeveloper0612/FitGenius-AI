
export interface UserAnalysis {
  gender: string;
  bodyShape: string;
  skinTone: string;
  detectedColors: string[];
  vibe: string;
}

export interface OutfitItem {
  type: string; // Top, Bottom, Shoes, Accessory
  name: string;
  color: string;
  description: string;
  shoppingQuery: string;
}

export interface OutfitRecommendation {
  styleName: string;
  description: string;
  items: OutfitItem[];
  colorPalette: string[];
  visualPrompt: string;
}

export enum StyleMode {
  Office = "Office Professional",
  Party = "Party & Festival",
  Streetwear = "Streetwear & Urban",
  Casual = "Smart Casual",
  Wedding = "Wedding & Ethnic",
  Gym = "Gym & Athleisure",
  Winter = "Winter Cozy",
  Summer = "Summer Light"
}

export enum AppState {
  Landing,
  Uploading,
  Analyzing,
  Results,
  Features,
  Showcase,
  Pricing,
  About,
  Blog,
  Contact,
  Auth
}
