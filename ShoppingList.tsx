import React from 'react';
import type { Product, Language } from '../types';

interface ShoppingListProps {
  products: Product[];
  shoppingList: number[];
  onToggleShoppingList: (productId: number) => void;
  onStartNavigation: () => void;
  onCancelNavigation: () => void;
  isNavigating: boolean;
  language: Language;
  t: (key: string) => string;
}

export const ShoppingList: React.FC<ShoppingListProps> = ({
  products, shoppingList, onToggleShoppingList, onStartNavigation, onCancelNavigation, isNavigating, language, t
}) => {
  const listItems = products.filter(p => shoppingList.includes(p.id));

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 -mr-2">
        {listItems.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">{t('emptyList')}</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {listItems.map(item => (
              <li key={item.id} className="p-3 rounded-lg bg-gray-50 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{item.name[language]}</p>
                   <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-500">{item.category[language]}</p>
                         <span className="text-xs bg-gray-200 text-gray-600 font-medium px-1.5 py-0.5 rounded">
                            {t('floor')} {item.floor}
                        </span>
                    </div>
                </div>
                <button
                  onClick={() => onToggleShoppingList(item.id)}
                  className="text-xs font-semibold rounded-md bg-red-100 text-red-700 px-3 py-1.5 self-start"
                >
                  {t('remove')}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-700">{t('totalItems')}</span>
            <span className="font-bold text-lg text-gray-900">{listItems.length}</span>
        </div>
        {isNavigating ? (
            <button onClick={onCancelNavigation} className="w-full bg-red-500 text-white font-bold py-3 rounded-lg">
                {t('cancelNavigation')}
            </button>
        ) : (
            <button
              onClick={onStartNavigation}
              disabled={listItems.length === 0}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg disabled:bg-gray-300"
            >
              {t('startNavigation')}
            </button>
        )}
      </div>
    </div>
  );
};