'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useRef } from 'react';

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-b from-blue-50/30 to-white">
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative text-center mb-32 min-h-[80vh] flex flex-col justify-center -mx-4 px-4"
        style={{ y, opacity }}
      >
        {/* Background Image - Responsive */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-gray-100"
            style={{
              backgroundImage: 'url(/hero-bg.jpg)', // Add your image to public/hero-bg.jpg
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
        <motion.div 
          className="mb-6 text-6xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
        >
          ✨
        </motion.div>
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-500 via-blue-800 to-blue-950 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Every Child is the Hero of Their Story
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Magical bedtime stories that spark imagination and inspire dreams 🌙
        </motion.p>
        <motion.div 
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link href="/stories">
            <Button size="lg" className="shadow-lg hover:shadow-xl">
              🚀 Start Reading
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              ✨ Create Account
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Process Steps */}
      <AnimatedSection>
        <div className="mb-32">
          <motion.h2 
            className="text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Three simple steps to magical bedtime moments
          </motion.p>
          
          <div className="space-y-12">
            {[
              { num: '01', title: 'Create Profile', desc: 'Add your child and set their age preferences', emoji: '👶' },
              { num: '02', title: 'Choose Story', desc: 'Browse 100+ stories by category and age', emoji: '📚' },
              { num: '03', title: 'Read Together', desc: 'Track progress and save favorites', emoji: '❤️' }
            ].map((step, i) => (
              <motion.div 
                key={i}
                className="flex gap-8 items-start"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.15,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <motion.div 
                  className="text-6xl font-bold text-blue-200"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: i * 0.15 + 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {step.num}
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.span 
                      className="text-4xl"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: i * 0.15 + 0.3,
                        type: "spring"
                      }}
                    >
                      {step.emoji}
                    </motion.span>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection>
        <div className="mb-32">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Parents Love TwinklePod
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: '📚', title: '100+ Stories', desc: 'Bedtime tales, adventures, and moral stories for every mood' },
              { emoji: '🎯', title: 'Age-Perfect', desc: 'Stories tailored for ages 3-10, growing with your child' },
              { emoji: '⭐', title: 'Track Progress', desc: 'Save favorites and pick up right where you left off' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-blue-50/50 rounded-2xl p-8 shadow-sm border border-blue-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <motion.div 
                  className="text-5xl mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.1 + 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {feature.emoji}
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 via-blue-100 to-gray-100 rounded-3xl p-12 text-center shadow-lg border border-blue-200"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div 
          className="text-5xl mb-4"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6, 
            delay: 0.2,
            type: "spring",
            stiffness: 200
          }}
        >
          🌟
        </motion.div>
        <motion.h2 
          className="text-4xl font-bold mb-4 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Ready to Begin?
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Join thousands of families creating magical bedtime moments
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link href="/login">
            <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
              🎉 Get Started Free
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
