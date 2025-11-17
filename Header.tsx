import React from 'react';
import type { Language } from '../types';
import { LanguageIcon } from './icons';

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    isShopkeeperMode: boolean;
    setShopkeeperMode: (mode: boolean) => void;
    t: (key: string) => string;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage, isShopkeeperMode, setShopkeeperMode, t }) => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('appTitle')}</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-500 hidden sm:block">{t('shopper')}</span>
                             <label htmlFor="mode-toggle" className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={isShopkeeperMode}
                                    onChange={() => setShopkeeperMode(!isShopkeeperMode)}
                                    id="mode-toggle" 
                                    className="sr-only peer" 
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                            <span className={`text-sm font-medium ${isShopkeeperMode ? 'text-green-600' : 'text-gray-500'}`}>{t('shopkeeper')}</span>
                        </div>
                        <div className="relative">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as Language)}
                                className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                            >
                                <option value="en">English</option>
                                <option value="kn">ಕನ್ನಡ</option>
                                <option value="hi">हिन्दी</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <LanguageIcon className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
