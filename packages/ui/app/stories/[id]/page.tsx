'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useChild } from '@/contexts/ChildContext';
import { Button } from '@/components/ui/Button';

interface Story {
  story_id: string;
  title: string;
  text: string[];
  images: string[];
  image_positions: number[];
  age_range: string;
  tags: string[];
  moral?: string;
  duration_minutes: number;
}

export default function StoryReaderPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { selectedChild } = useChild();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [progress, setProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchStory();
  }, [params.id]);

  useEffect(() => {
    const interval = setInterval(saveProgress, 10000);
    return () => clearInterval(interval);
  }, [progress, selectedChild]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(Math.round(scrolled), 100));
    };

    const ref = contentRef.current;
    ref?.addEventListener('scroll', handleScroll);
    return () => ref?.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchStory = async () => {
    try {
      const { data } = await api.get(`/stories/${params.id}`);
      const storyResponse = await fetch(data.s3_url);
      const storyData = await storyResponse.json();
      setStory(storyData);
      
      if (user && selectedChild) {
        await api.post('/api/interaction', {
          child_id: selectedChild.child_id,
          story_id: params.id,
          event_type: 'view',
        });
      }
    } catch (error) {
      console.error('Failed to fetch story:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async () => {
    if (!user || !selectedChild || !story) return;
    try {
      await api.post('/api/progress', {
        child_id: selectedChild.child_id,
        story_id: story.story_id,
        paragraph_index: Math.floor((progress / 100) * story.text.length),
        percentage: progress,
        completed: progress >= 95,
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!user || !selectedChild || !story) return;
    try {
      await api.post('/api/interaction', {
        child_id: selectedChild.child_id,
        story_id: story.story_id,
        event_type: isFavorite ? 'unfavorite' : 'favorite',
      });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-12 text-center">Loading story...</div>;
  }

  if (!story) {
    return <div className="max-w-4xl mx-auto px-4 py-12 text-center">Story not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <Button onClick={() => router.back()} variant="outline">← Back</Button>
        {user && selectedChild && (
          <Button onClick={toggleFavorite} variant={isFavorite ? 'primary' : 'outline'}>
            {isFavorite ? '★' : '☆'} Favorite
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
        <div className="flex gap-4 text-sm text-gray-600 mb-6">
          <span>Age {story.age_range}</span>
          <span>•</span>
          <span>{story.duration_minutes} min read</span>
          {story.moral && (
            <>
              <span>•</span>
              <span>{story.moral}</span>
            </>
          )}
        </div>

        {user && selectedChild && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        <div ref={contentRef} className="prose max-w-none overflow-y-auto max-h-[600px]">
          {story.text.map((paragraph, index) => (
            <div key={index}>
              <p className="mb-4 text-lg leading-relaxed">{paragraph}</p>
              {story.image_positions.includes(index) && story.images[story.image_positions.indexOf(index)] && (
                <div className="my-6 bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <span className="text-gray-400">Image {story.image_positions.indexOf(index) + 1}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
