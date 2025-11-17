import React from 'react';
import type { FloorArea, Language } from '../types';
import { MaleIcon, FemaleIcon } from './icons';

interface ServicesPanelProps {
  floorAreas: FloorArea[];
  onNavigateToArea: (area: FloorArea) => void;
  isNavigating: boolean;
  language: Language;
  t: (key: string, options?: Record<string, string | number>) => string;
}

export const ServicesPanel: React.FC<ServicesPanelProps> = ({
  floorAreas, onNavigateToArea, isNavigating, language, t
}) => {
  const washrooms = floorAreas
    .filter(area => area.type === 'washroom')
    .sort((a, b) => a.floor - b.floor || a.id.localeCompare(b.id)); // Sort by floor, then ID for stable order
  
  const services = [
    { title: t('washrooms'), items: washrooms }
    // Other services could be added here in the future
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 -mr-2">
        {services.map(service => (
          <div key={service.title} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">{service.title}</h3>
            {service.items.length > 0 ? (
              <ul className="space-y-2">
                {service.items.map(area => (
                  <li key={area.id} className="p-3 rounded-lg bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {area.gender === 'male' && <MaleIcon className="w-6 h-6 text-blue-500" />}
                      {area.gender === 'female' && <FemaleIcon className="w-6 h-6 text-pink-500" />}
                      <div>
                        <p className="font-semibold text-gray-800">{area.name[language]}</p>
                        <span className="text-xs bg-gray-200 text-gray-600 font-medium px-1.5 py-0.5 rounded">
                          {t('floor')} {area.floor}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigateToArea(area)}
                      disabled={isNavigating}
                      className="px-3 py-1.5 text-xs font-semibold rounded-md bg-blue-100 text-blue-700 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                    >
                      {t('navigate')}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No washrooms found.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
