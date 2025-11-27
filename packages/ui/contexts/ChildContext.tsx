'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';
import { useAuth } from './AuthContext';

interface Child {
  child_id: string;
  name: string;
  age: number;
}

interface ChildContextType {
  children: Child[];
  selectedChild: Child | null;
  selectChild: (child: Child) => void;
  refreshChildren: () => Promise<void>;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const ChildProvider = ({ children: reactChildren }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  useEffect(() => {
    if (user) {
      refreshChildren();
    }
  }, [user]);

  const refreshChildren = async () => {
    try {
      const { data } = await api.get('/api/children');
      setChildren(data);
      if (data.length > 0 && !selectedChild) {
        setSelectedChild(data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch children:', error);
    }
  };

  const selectChild = (child: Child) => {
    setSelectedChild(child);
    localStorage.setItem('selectedChildId', child.child_id);
  };

  return (
    <ChildContext.Provider value={{ children, selectedChild, selectChild, refreshChildren }}>
      {reactChildren}
    </ChildContext.Provider>
  );
};

export const useChild = () => {
  const context = useContext(ChildContext);
  if (!context) throw new Error('useChild must be used within ChildProvider');
  return context;
};
