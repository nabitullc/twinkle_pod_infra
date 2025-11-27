'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useChild } from '@/contexts/ChildContext';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  const { user, logout } = useAuth();
  const { children, selectedChild, selectChild } = useChild();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            TwinklePod
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <Link href="/stories" className="block text-gray-700 hover:text-purple-600">
              Stories
            </Link>
            {user ? (
              <>
                <Link href="/library" className="block text-gray-700 hover:text-purple-600">
                  Library
                </Link>
                <Link href="/dashboard" className="block text-gray-700 hover:text-purple-600">
                  Dashboard
                </Link>
                {children.length > 0 && (
                  <select
                    value={selectedChild?.child_id || ''}
                    onChange={(e) => {
                      const child = children.find(c => c.child_id === e.target.value);
                      if (child) selectChild(child);
                    }}
                    className="w-full border rounded px-3 py-2"
                  >
                    {children.map(child => (
                      <option key={child.child_id} value={child.child_id}>
                        {child.name}
                      </option>
                    ))}
                  </select>
                )}
                <Button onClick={logout} variant="outline" className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" className="block">
                <Button className="w-full">Login</Button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};
