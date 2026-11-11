'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Parent of 9-year-old student',
    rating: 5,
    text: "My daughter has transformed completely since joining Knightora. She went from not knowing how pieces move to winning her school tournament in just 6 months. The coaches are incredibly patient and encouraging.",
    avatar: '👩',
    location: 'Mumbai',
    achievement: 'School Tournament Winner',
  },
  {
    name: 'Arjun Mehta',
    role: 'Student, Age 15',
    rating: 5,
    text: "The structured curriculum at Knightora is exceptional. I improved from a beginner to achieving a FIDE rating within a year. The coaches genuinely care about each student's progress.",
    avatar: '👦',
    location: 'Delhi',
    achievement: 'FIDE Rated Player',
  },
  {
    name: 'Dr. Ravi Gupta',
    role: 'Parent of twin students',
    rating: 5,
    text: "Both my children attend Knightora. The academy's approach of personalised coaching has been remarkable. Their concentration and analytical skills have improved dramatically in school as well.",
    avatar: '👨',
    location: 'Bangalore',
    achievement: 'Improved School Performance',
  },
  {
    name: 'Sneha Patel',
    role: 'Adult Learner',
    rating: 5,
    text: "I always wanted to learn chess as an adult but was hesitant. Knightora's adult program is perfectly paced. Six months in, I am already participating in club tournaments!",
    avatar: '👩',
    location: 'Ahmedabad',
    achievement: 'Club Tournament Participant',
  },
  {
    name: 'Kabir Singh',
    role: 'Student, Age 12',
    rating: 5,
    text: "Chess at Knightora is so much fun! Coach explains everything clearly and the practice games help me understand my mistakes. I love coming to class every week.",
    avatar: '🧒',
    location: 'Chennai',
    achievement: 'State Junior Qualifier',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < count ? 'text-[#c9a227] fill-current' : 'text-gray-600'} />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(a => (a + 1) % testimonials.length);

  const getVisible = () => {
    const indices = [
      (active - 1 + testimonials.length) % testimonials.length,
      active,
      (active + 1) % testimonials.length,
    ];
    return indices.map(i => ({ ...testimonials[i], index: i }));
  };

  return (
    <section className="section bg-[#080c18] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 text-[22rem] leading-none opacity-[0.02] select-none pointer-events-none font-serif -translate-y-16 translate-x-10 text-[#c9a227]">
        ❝
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-14">
          <div className="section-label justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
            Student Stories
          </div>
          <h2 className="section-title text-center">
            Voices from Our{' '}
            <span className="text-gold-gradient">Community</span>
          </h2>
          <p className="section-desc mx-auto text-center">
            Hear what our students and parents have to say about their Knightora experience.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
            {getVisible().map(({ name, role, rating, text, avatar, location, achievement, index }, i) => (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`card cursor-pointer transition-all duration-300 ${
                  i === 1
                    ? 'scale-105 border-[rgba(201,162,39,0.4)] shadow-[0_8px_40px_rgba(201,162,39,0.2)]'
                    : 'opacity-70 hover:opacity-90'
                }`}
              >
                <div className="testimonial-quote">"</div>
                <p className="text-sm text-[rgba(232,232,232,0.75)] leading-relaxed mb-5 -mt-2">
                  {text}
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{avatar}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{name}</p>
                    <p className="text-xs text-[rgba(232,232,232,0.5)]">{role}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <StarRating count={rating} />
                  <span className="badge badge-gold text-[10px]">{achievement}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile single */}
          <div className="md:hidden mb-8">
            <div className="card">
              <div className="testimonial-quote">"</div>
              <p className="text-sm text-[rgba(232,232,232,0.75)] leading-relaxed mb-5 -mt-2">
                {testimonials[active].text}
              </p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{testimonials[active].avatar}</span>
                <div>
                  <p className="font-semibold text-white text-sm">{testimonials[active].name}</p>
                  <p className="text-xs text-[rgba(232,232,232,0.5)]">{testimonials[active].role}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <StarRating count={testimonials[active].rating} />
                <span className="badge badge-gold text-[10px]">{testimonials[active].achievement}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-[rgba(201,162,39,0.3)] flex items-center justify-center hover:bg-[rgba(201,162,39,0.1)] transition-colors text-[#c9a227]">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active ? 'w-6 h-2 bg-[#c9a227]' : 'w-2 h-2 bg-[rgba(201,162,39,0.3)] hover:bg-[rgba(201,162,39,0.5)]'
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-[rgba(201,162,39,0.3)] flex items-center justify-center hover:bg-[rgba(201,162,39,0.1)] transition-colors text-[#c9a227]">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
