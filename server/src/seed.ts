import mongoose from 'mongoose';
import Course from './models/Course';
require('dotenv').config();

const courses = [
  {
    title: 'Beginner Foundations: Zero to 1000 ELO',
    slug: 'beginner-foundations',
    description: 'Master the chessboard from square one. Learn piece moves, opening principles, basic checkmating nets, and fundamental tactical patterns like pins and forks.',
    shortDescription: 'Master rules, piece power, opening principles, checkmate patterns, and basic endgame techniques with personalized guidance.',
    skillLevel: 'beginner',
    ageGroup: 'kids',
    duration: 12,
    sessionsPerWeek: 2,
    sessionDuration: 60,
    price: 3499,
    currency: 'INR',
    maxStudents: 4,
    currentStudents: 2,
    schedule: [{ dayOfWeek: 1, startTime: '17:00', endTime: '18:00' }, { dayOfWeek: 3, startTime: '17:00', endTime: '18:00' }],
    topics: ['Board Geometry', 'Piece Values & Movements', 'Basic Checkmates', 'Opening Principles'],
    prerequisites: ['No prior experience required'],
    isActive: true,
    isFeatured: true,
    tags: ['beginner', 'kids', 'tactics'],
  },
  {
    title: 'Intermediate Tactics & Positional Mastery (1000–1400)',
    slug: 'intermediate-tactics-mastery',
    description: 'Elevate your tactical vision and strategic thinking. Learn positional play, deep calculations, pawn structures, and active piece coordination in complex middlegames.',
    shortDescription: 'Deepen positional understanding, calculation depth, candidate moves, pawn structures, and active piece play in middlegames.',
    skillLevel: 'intermediate',
    ageGroup: 'juniors',
    duration: 16,
    sessionsPerWeek: 2,
    sessionDuration: 60,
    price: 4499,
    currency: 'INR',
    maxStudents: 4,
    currentStudents: 3,
    schedule: [{ dayOfWeek: 2, startTime: '18:00', endTime: '19:00' }, { dayOfWeek: 4, startTime: '18:00', endTime: '19:00' }],
    topics: ['Tactical Themes', 'Pawn Structures', 'King Safety & Attacks', 'Rook Endgames'],
    prerequisites: ['Basic rules and standard piece movement known'],
    isActive: true,
    isFeatured: true,
    tags: ['intermediate', 'strategy', 'middlegame'],
  },
  {
    title: 'Advanced & Tournament Champions (1400–1800+)',
    slug: 'advanced-tournament-champions',
    description: 'Intensive coaching for state, national, and FIDE rated tournaments. Opening repertoires, psychological readiness, master endgames, and customized game analysis.',
    shortDescription: 'Intensive coaching for state, national, and FIDE tournaments. Opening repertoires, psychological readiness, and master endgames.',
    skillLevel: 'advanced',
    ageGroup: 'teens',
    duration: 20,
    sessionsPerWeek: 3,
    sessionDuration: 75,
    price: 6999,
    currency: 'INR',
    maxStudents: 2,
    currentStudents: 1,
    schedule: [{ dayOfWeek: 5, startTime: '18:30', endTime: '19:45' }, { dayOfWeek: 6, startTime: '18:30', endTime: '19:45' }],
    topics: ['Deep Opening Repertoires', 'Master Level Endgames', 'Psychology & Time Management'],
    prerequisites: ['Rating 1300+ or tournament experience'],
    isActive: true,
    isFeatured: true,
    tags: ['advanced', 'fide', 'tournament'],
  },
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    await mongoose.connect(mongoUri, { dbName: 'knightora' });
    console.log('Connected to MongoDB');

    for (const c of courses) {
      await Course.findOneAndUpdate({ slug: c.slug }, c, { upsert: true, new: true });
      console.log(`Seeded course: ${c.title}`);
    }

    console.log('Courses seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
