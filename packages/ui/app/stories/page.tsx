'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { StoryGridSkeleton } from '@/components/ui/LoadingSkeleton';

interface Story {
  story_id: string;
  title: string;
  age_range: string;
  categories: string[];
  duration_minutes: number;
  thumbnail_url: string;
}

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchStories();
  }, [category]);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const params = category ? { category } : {};
      const { data } = await api.get('/stories/list', { params });
      setStories(data);
    } catch (error) {
      console.error('Failed to fetch stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['bedtime', 'animals', 'moral', 'fantasy', 'short', 'funny', 'adventure'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Browse Stories</h1>

      <div className="flex gap-2 mb-8 overflow-x-auto">
        <button
          onClick={() => setCategory('')}
          className={`px-4 py-2 rounded ${!category ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded capitalize ${category === cat ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <StoryGridSkeleton />
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <Link key={story.story_id} href={`/stories/${story.story_id}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">{story.title}</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Age {story.age_range}</span>
                    <span>{story.duration_minutes} min</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
