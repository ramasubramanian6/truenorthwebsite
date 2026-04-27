require('dotenv').config();
const mongoose = require('mongoose');
const Career = require('../models/Career');

const seedCareers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for careers seeding');

    const careersExist = await Career.countDocuments();
    if (careersExist > 0) {
      console.log('Careers already seeded');
    } else {
      const careers = [
        {
          title: 'Senior Full Stack Developer',
          description: 'Lead development of scalable web applications using modern technologies.',
          requirements: ['5+ years experience', 'React/Node.js', 'MongoDB'],
          location: 'Tirunelveli, India',
          type: 'Full-time',
          team: 'Engineering',
          active: true
        },
        {
          title: 'DevOps Engineer',
          description: 'Manage cloud infrastructure and CI/CD pipelines.',
          requirements: ['AWS/Azure', 'Docker', 'Kubernetes'],
          location: 'Remote',
          type: 'Full-time',
          team: 'Infrastructure',
          active: true
        },
        {
          title: 'UI/UX Designer',
          description: 'Design intuitive user interfaces for web and mobile applications.',
          requirements: ['Figma', 'Adobe XD', 'Prototyping'],
          location: 'Tirunelveli, India',
          type: 'Contract',
          team: 'Design',
          active: true
        }
      ];

      await Career.insertMany(careers);
      console.log('Careers seeded successfully');
    }

    mongoose.disconnect();
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
};

seedCareers();