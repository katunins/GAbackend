export const env = {
  project: {
    name: 'App API',
    description: 'App API',
    poweredBy: 'App',
    email: 'hi@app.es',
    port: 3000,
  },
  microservices: {
    headers: { 'content-type': 'application/json' },
  },
  api: {
    morgan: 'dev',
    responseTime: {
      header: false,
      flag: 'response-timer',
    },
    pagination: {
      limit: 10,
      page: 1,
      skip: 0,
    },
  },
  upload: {
    path: 'uploads',
    size: '10mb',
  },
  cors: {
    origin: true,
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length'],
    exposedHeaders: ['x-provider', 'limit', 'page', 'count', 'X-Response-Time'],
  },
  mongodb: {
    // uri: 'mongodb://user:wellcome@nestjs.ikatunin.ru:27017/grandAlbum',
    uri: 'mongodb://user:wellcome@db/grandAlbum',
    debug: false,
  },
  secret: 'feiD77DnnoOISqO',
  salt: 10,
  tokenTime: '1w',
};
