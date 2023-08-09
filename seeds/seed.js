
const connection = require('../config/connection');
const User = require('../models/User');
const Thought = require('../models/Thought');
const userData = require('./userData.js');
const thoughtData = require('./thoughtData.js');


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

      try {
        await User.deleteMany({});
        await Thought.deleteMany({});
    
        await User.insertMany(userData);
        await Thought.insertMany(thoughtData);
  
    
        console.info('Database Seeded.');
      } catch (error) {
        console.error(error);
      }
    
      process.exit(0);
    }
  );