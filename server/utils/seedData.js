const mongoose = require('mongoose');
const User = require('../models/User');
const Event = require('../models/Event');
const Post = require('../models/Post');
const News = require('../models/News');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codingarena');
    
    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    await Post.deleteMany({});
    await News.deleteMany({});

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@codingarena.com',
      password: 'admin123',
      role: 'admin',
      avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    });
    await adminUser.save();

    // Create sample users
    const users = await User.insertMany([
      {
        name: 'Alex Rodriguez',
        email: 'alex@example.com',
        password: 'password123',
        avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        skills: ['JavaScript', 'Python', 'Algorithms'],
        achievements: [
          { title: 'Problem Solver', description: 'Solved 100+ problems', icon: 'trophy' },
          { title: 'Speed Demon', description: 'Fastest solution in contest', icon: 'zap' }
        ],
        stats: { eventsParticipated: 15, eventsWon: 3, totalScore: 2450 }
      },
      {
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        password: 'password123',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        skills: ['React', 'Node.js', 'MongoDB'],
        achievements: [
          { title: 'UI Wizard', description: 'Created stunning interfaces', icon: 'star' },
          { title: 'React Pro', description: 'React expert level achieved', icon: 'code' }
        ],
        stats: { eventsParticipated: 12, eventsWon: 2, totalScore: 2100 }
      }
    ]);

    // Create sample events
    const events = await Event.insertMany([
      {
        title: 'Weekly DSA Challenge',
        description: 'Test your data structures and algorithms knowledge',
        longDescription: 'This comprehensive coding challenge will test your understanding of fundamental data structures and algorithms...',
        date: new Date('2025-01-15'),
        time: '18:00',
        duration: '3 hours',
        difficulty: 'Medium',
        category: 'DSA',
        maxParticipants: 500,
        prizePool: {
          total: '$500',
          distribution: [
            { position: 1, amount: '$250' },
            { position: 2, amount: '$150' },
            { position: 3, amount: '$100' }
          ]
        },
        rules: [
          'No external libraries allowed except standard language libraries',
          'Solutions must be submitted within the time limit',
          'Code must be original and written during the contest'
        ],
        schedule: [
          { time: '18:00', event: 'Registration closes & contest begins' },
          { time: '18:15', event: 'Problem statements released' },
          { time: '21:00', event: 'Contest ends & solutions submitted' }
        ],
        registrationUrl: 'https://forms.google.com/contest-registration',
        createdBy: adminUser._id,
        participants: [
          { user: users[0]._id, score: 95, timeCompleted: '2h 15m', rank: 1 },
          { user: users[1]._id, score: 92, timeCompleted: '2h 28m', rank: 2 }
        ]
      }
    ]);

    // Create sample posts
    await Post.insertMany([
      {
        title: 'Optimizing Binary Search: A Deep Dive',
        content: 'I\'ve been working on optimizing binary search algorithms for competitive programming. Here are some advanced techniques I discovered...',
        author: users[0]._id,
        category: 'dsa',
        tags: ['algorithms', 'binary-search', 'optimization'],
        likes: [{ user: users[1]._id }],
        comments: [
          { user: users[1]._id, content: 'Great insights! Thanks for sharing.' }
        ]
      }
    ]);

    // Create sample news
    await News.insertMany([
      {
        title: 'Coding Arena Reaches 10,000 Active Users Milestone',
        excerpt: 'We\'re thrilled to announce that our community has grown to over 10,000 active developers!',
        content: 'This milestone represents months of hard work from our team and incredible engagement from our community...',
        author: adminUser._id,
        category: 'announcements',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2',
        readTime: '3 min read',
        isPublished: true,
        isTrending: true,
        tags: ['milestone', 'community', 'growth']
      }
    ]);

    console.log('✅ Sample data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();