'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useChild } from '@/contexts/ChildContext';

interface LibraryStory {
  story_id: string;
  title: string;
  age_range: string;
  duration_minutes: number;
  thumbnail_url: string;
  progress?: number;
  last_read?: string;
}

type Tab = 'continue' | 'favorites' | 'completed';

export default function LibraryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { selectedChild } = useChild();
  const [activeTab, setActiveTab] = useState<Tab>('continue');
  const [stories, setStories] = useState<LibraryStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!selectedChild) {
      router.push('/dashboard');
      return;
    }
    fetchLibrary();
  }, [user, selectedChild, activeTab]);

  const fetchLibrary = async () => {
    if (!selectedChild) return;
    setLoading(true);
    try {
      const { data } = await api.get('/api/library', {
        params: {
          child_id: selectedChild.child_id,
          tab: activeTab,
        },
      });
      setStories(data);
    } catch (error) {
      console.error('Failed to fetch library:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'continue', label: 'Continue Reading' },
    { key: 'favorites', label: 'Favorites' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        {selectedChild ? `${selectedChild.name}'s Library` : 'My Library'}
      </h1>

      <div className="flex gap-4 mb-8 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium transition ${
              activeTab === tab.key
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : stories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {activeTab === 'continue' && 'No stories in progress'}
            {activeTab === 'favorites' && 'No favorite stories yet'}
            {activeTab === 'completed' && 'No completed stories yet'}
          </p>
          <Link href="/stories">
            <button className="text-purple-600 hover:underline">Browse Stories</button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <Link key={story.story_id} href={`/stories/${story.story_id}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">{story.title}</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Age {story.age_range}</span>
                    <span>{story.duration_minutes} min</span>
                  </div>
                  {story.progress !== undefined && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-purple-600 h-1.5 rounded-full"
                        style={{ width: `${story.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
