'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useChild } from '@/contexts/ChildContext';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  const { user, logout } = useAuth();
  const { children, selectedChild, selectChild } = useChild();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-600">
          TwinklePod
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/stories" className="text-gray-700 hover:text-purple-600">Stories</Link>
          
          {user ? (
            <>
              <Link href="/library" className="text-gray-700 hover:text-purple-600">Library</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-purple-600">Dashboard</Link>
              
              {children.length > 0 && (
                <select
                  value={selectedChild?.child_id || ''}
                  onChange={(e) => {
                    const child = children.find(c => c.child_id === e.target.value);
                    if (child) selectChild(child);
                  }}
                  className="border rounded px-3 py-1"
                >
                  {children.map(child => (
                    <option key={child.child_id} value={child.child_id}>
                      {child.name}
                    </option>
                  ))}
                </select>
              )}
              
              <Button onClick={logout} variant="outline">Logout</Button>
            </>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
