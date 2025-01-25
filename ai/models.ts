// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'llama-3.3-70b-versatile',
    label: 'LLaMA 3.1 70B Versatile',
    apiIdentifier: 'llama-3.3-70b-versatile',
    description: 'Highly capable model for a wide range of tasks with large-scale context understanding.',
  },
  {
    id: 'llama-3.1-13b-fast',
    label: 'LLaMA 3.1 13B Fast',
    apiIdentifier: 'llama-3.1-13b-fast',
    description: 'Smaller model optimized for speed and lightweight tasks.',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'llama-3.3-70b-versatile';
