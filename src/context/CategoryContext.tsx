import { createContext, useState, useContext, ReactNode } from 'react';

type Category = 'elma' | 'çay' | 'fındık';

type CategoryContextType = {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

type CategoryProviderProps = {
  children: ReactNode;
};

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('elma');

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}
