'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { services, ServiceCategory, ServiceItem } from '../data';

const categories: ServiceCategory[] = [
  'Consulting',
  'Development',
  'Automation',
  'Training',
];

const categoryLabels: Record<ServiceCategory, string> = {
  Consulting: 'Consulting',
  Development: 'Development',
  Automation: 'Automation',
  Training: 'Training',
};

export default function ServiceAccordionShowcase() {
  const [open, setOpen] = useState<Record<ServiceCategory, boolean>>({
    Consulting: true,
    Development: false,
    Automation: false,
    Training: false,
  });

  const grouped: Record<ServiceCategory, ServiceItem[]> = categories.reduce(
    (acc, cat) => {
      acc[cat] = services.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<ServiceCategory, ServiceItem[]>
  );

  return (
    <div className="space-y-4">
      {categories.map((cat) => {
        const isOpen = open[cat];
        return (
          <div key={cat} className="border border-[#2A2A2A] rounded-lg">
            {/* Header */}
            <button
              onClick={() => setOpen({ ...open, [cat]: !isOpen })}
              className="w-full flex items-center justify-between px-6 py-4 bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors"
            >
              <span className="text-lg font-bold text-[#F9F9F9] font-heading">
                {categoryLabels[cat]}
              </span>
              {isOpen ? (
                <ChevronUp size={20} className="text-[#F9F9F9]" />
              ) : (
                <ChevronDown size={20} className="text-[#F9F9F9]" />
              )}
            </button>

            {/* Body */}
            {isOpen && (
              <div className="divide-y divide-[#2A2A2A]">
                {grouped[cat].map((service) => (
                  <div key={service.title} className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h3 className="text-xl font-bold text-[#F9F9F9] font-heading mb-2 sm:mb-0">
                        {service.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-[#7A7A7A]">
                        <span>{service.price}</span>
                        <span>•</span>
                        <span>{service.duration}</span>
                      </div>
                    </div>
                    <p className="text-[#7A7A7A] mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mb-2">
                      <h4 className="text-[#F9F9F9] font-semibold mb-2 text-sm">含まれる内容</h4>
                      <ul className="space-y-1 ml-1">
                        {service.contents.map((c) => (
                          <li key={c} className="flex items-start text-[#7A7A7A] text-sm">
                            <CheckCircle size={14} className="text-[#1479FF] mr-2 flex-shrink-0 mt-0.5" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
