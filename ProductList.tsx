import React, { useState, useMemo } from 'react';
import type { Product, Language } from '../types';
import { SearchIcon } from './icons';

interface ProductListProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  shoppingList: number[];
  onToggleShoppingList: (productId: number) => void;
  isShopkeeperMode: boolean;
  language: Language;
  t: (key: string) => string;
}

export const ProductList: React.FC<ProductListProps> = ({
  products, onUpdateProduct, shoppingList, onToggleShoppingList, isShopkeeperMode, language, t
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Product> & { name?: Partial<Record<Language, string>>, category?: Partial<Record<Language, string>> }>({});

  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category[language].toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm, language]);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditData({
        ...product,
        name: {...product.name},
        category: {...product.category}
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSave = () => {
    if (!editingId) return;
    const originalProduct = products.find(p => p.id === editingId);
    if (!originalProduct) return;
    
    const updatedProduct: Product = {
        ...originalProduct,
        ...editData,
        price: Number(editData.price) || originalProduct.price,
        name: { ...originalProduct.name, [language]: editData.name?.[language] || originalProduct.name[language] },
        category: { ...originalProduct.category, [language]: editData.category?.[language] || originalProduct.category[language] },
    };
    onUpdateProduct(updatedProduct);
    handleCancel();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: 'price' | 'name' | 'category') => {
    const { value } = e.target;
    if (field === 'price') {
      setEditData(prev => ({ ...prev, price: Number(value) }));
    } else {
      setEditData(prev => ({
        ...prev,
        [field]: { ...prev[field], [language]: value }
      }));
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="relative mb-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={t('searchProducts')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 -mr-2">
        <ul className="space-y-2">
          {filteredProducts.map(product => (
            <li key={product.id} className={`p-3 rounded-lg transition-all ${editingId === product.id ? 'bg-blue-50 shadow-md' : 'bg-gray-50'}`}>
              {editingId === product.id ? (
                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-medium text-gray-500">{t('productName')}</label>
                        <input value={editData.name?.[language] || ''} onChange={(e) => handleInputChange(e, 'name')} className="mt-1 w-full text-sm p-1.5 border border-gray-300 rounded-md"/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-gray-500">{t('category')}</label>
                            <input value={editData.category?.[language] || ''} onChange={(e) => handleInputChange(e, 'category')} className="mt-1 w-full text-sm p-1.5 border border-gray-300 rounded-md"/>
                        </div>
                        <div>
                             <label className="text-xs font-medium text-gray-500">{t('price')}</label>
                            <input type="number" value={editData.price || ''} onChange={(e) => handleInputChange(e, 'price')} className="mt-1 w-full text-sm p-1.5 border border-gray-300 rounded-md"/>
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-gray-500">{t('floor')}</label>
                            <p className="mt-1 w-full text-sm p-1.5 bg-gray-100 border border-gray-300 rounded-md">{product.floor}</p>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-2">
                        <button onClick={handleSave} className="bg-green-500 text-white font-semibold px-3 py-1.5 rounded-md text-xs">Save</button>
                        <button onClick={handleCancel} className="bg-gray-200 text-gray-700 font-semibold px-3 py-1.5 rounded-md text-xs">Cancel</button>
                    </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{product.name[language]}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-500">{product.category[language]}</p>
                         <span className="text-xs bg-gray-200 text-gray-600 font-medium px-1.5 py-0.5 rounded">
                            {t('floor')} {product.floor}
                        </span>
                    </div>
                    <p className="text-sm font-bold text-gray-600 mt-1">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {isShopkeeperMode && (
                        <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white font-semibold px-3 py-1.5 rounded-md text-xs w-full text-center">Edit</button>
                    )}
                    <button
                      onClick={() => onToggleShoppingList(product.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md w-full ${
                        shoppingList.includes(product.id) ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {shoppingList.includes(product.id) ? t('remove') : t('addToList')}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};