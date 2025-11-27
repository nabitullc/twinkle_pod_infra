import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Every Child is the Hero
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Personalized stories where your child becomes the main character
        </p>
        <Link href="/stories">
          <Button className="text-lg px-8 py-3">Start Reading</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-2">100+ Stories</h3>
          <p className="text-gray-600">Bedtime, adventure, moral tales and more</p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">👶</div>
          <h3 className="text-xl font-bold mb-2">Age-Appropriate</h3>
          <p className="text-gray-600">Stories tailored for ages 3-10</p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-xl font-bold mb-2">Track Progress</h3>
          <p className="text-gray-600">Save favorites and continue reading</p>
        </div>
      </div>

      <div className="bg-purple-50 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
        <p className="text-gray-700 mb-6">Create an account to track your child&apos;s reading journey</p>
        <Link href="/login">
          <Button variant="primary">Get Started Free</Button>
        </Link>
      </div>
    </div>
  );
}
