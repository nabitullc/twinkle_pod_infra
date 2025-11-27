'use client';

import { useState } from 'react';
import { useChild } from '@/contexts/ChildContext';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function DashboardPage() {
  const { children, refreshChildren } = useChild();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/children', { name, age: parseInt(age) });
      await refreshChildren();
      setIsModalOpen(false);
      setName('');
      setAge('');
    } catch (error) {
      console.error('Failed to add child:', error);
    }
  };

  const handleDeleteChild = async (childId: string) => {
    if (!confirm('Are you sure you want to delete this child profile?')) return;
    try {
      await api.delete(`/api/children/${childId}`);
      await refreshChildren();
    } catch (error) {
      console.error('Failed to delete child:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Children</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Child</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {children.map((child) => (
          <div key={child.child_id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{child.name}</h3>
                <p className="text-gray-600">Age {child.age}</p>
              </div>
              <button
                onClick={() => handleDeleteChild(child.child_id)}
                className="text-red-600 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {children.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="mb-4">No children added yet</p>
          <Button onClick={() => setIsModalOpen(true)}>Add Your First Child</Button>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Child">
        <form onSubmit={handleAddChild} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
              min="3"
              max="12"
            />
          </div>
          <Button type="submit" className="w-full">Add Child</Button>
        </form>
      </Modal>
    </div>
  );
}
