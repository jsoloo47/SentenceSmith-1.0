process.env.DATABASE_URL =
  process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/mern';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'mern';
process.env.OPENAI_API_KEY =
  process.env.OPENAI_API_KEY ||
  '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';
