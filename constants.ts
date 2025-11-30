import { StyleMode } from './types';

export const STYLE_MODES = [
  { id: StyleMode.Office, label: 'Office', icon: 'briefcase' },
  { id: StyleMode.Party, label: 'Party', icon: 'sparkles' },
  { id: StyleMode.Streetwear, label: 'Streetwear', icon: 'zap' },
  { id: StyleMode.Casual, label: 'Casual', icon: 'coffee' },
  { id: StyleMode.Wedding, label: 'Wedding', icon: 'heart' },
  { id: StyleMode.Gym, label: 'Gym', icon: 'dumbbell' },
  { id: StyleMode.Winter, label: 'Winter', icon: 'snowflake' },
  { id: StyleMode.Summer, label: 'Summer', icon: 'sun' },
];

export const MOCK_LOADING_STEPS = [
  "Scanning body geometry...",
  "Analyzing skin undertones...",
  "Extracting wardrobe palette...",
  "Consulting AI stylist engine...",
  "Rendering high-fidelity previews..."
];

export const PLACEHOLDER_IMAGE = "https://picsum.photos/400/600";
