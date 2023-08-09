import connection from '../config/connection';
import {User, Thought} from '../models/index';
import mongoose from 'mongoose';
import getRandomName from './data';

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing User
  await User.deleteMany({});

  // Drop existing Thought
  await Thought.deleteMany({});
  // Create empty array to hold the Users
  const User = [];

  for (let i = 0; i < 20; i++) {
    
    const username = getRandomName();
    const email = `${first.toLowerCase()}.${last.toLowerCase()}@example.com`;

    User.push({
      username,
      email,
    });
  }
  // Add students to the collection and await the results
  await User.collection.insertMany(User);

  // Add courses to the collection and await the results
  await Thought.collection.insertOne({
    thoughtText: 'Great!',
    inPerson: false,
    reactions: [...reactions],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(reactions);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
