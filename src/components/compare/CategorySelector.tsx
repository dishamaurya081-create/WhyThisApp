import React from 'react';
import { Category } from '../../types';
import { CATEGORIES } from '../../data/permissions';
import { Flashlight, FileText, CloudSun, Check } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (id: Category) => {
    switch (id) {
      case 'torch':
        return <Flashlight className="w-5 h-5 text-amber-500" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'weather':
        return <CloudSun className="w-5 h-5 text-cyan-500" />;
    }
  };

  return (
    <div>
      <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-500 mb-2">
        Step 1 — Choose App Category
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(Object.keys(CATEGORIES) as Category[]).map(catKey => {
          const cat = CATEGORIES[catKey];
          const isSelected = selectedCategory === catKey;

          return (
            <button
              key={catKey}
              type="button"
              onClick={() => onSelectCategory(catKey)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-brand-50/70 border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
              <div className="p-2 rounded-lg bg-slate-100 w-fit mb-2.5">
                {getCategoryIcon(catKey)}
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{cat.name}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                {cat.tagline}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
