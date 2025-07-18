export type ServiceCategory = 'Consulting' | 'Development' | 'Automation' | 'Training';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  price?: number;
  duration?: string;
  features?: string[];
  isPopular?: boolean;
}

export interface ServiceAccordionState {
  [key: string]: boolean;
}