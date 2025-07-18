import { ServiceCategory, ServiceItem } from '../types/service-types';

export function filterServicesByCategory(services: ServiceItem[], category: ServiceCategory): ServiceItem[] {
  return services.filter(service => service.category === category);
}

export function getServicesByCategory(services: ServiceItem[]): Record<ServiceCategory, ServiceItem[]> {
  const result: Record<ServiceCategory, ServiceItem[]> = {
    Consulting: [],
    Development: [],
    Automation: [],
    Training: [],
  };

  services.forEach(service => {
    result[service.category].push(service);
  });

  return result;
}

export function formatServicePrice(price: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
  }).format(price);
}