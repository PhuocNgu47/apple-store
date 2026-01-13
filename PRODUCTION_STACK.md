# 🚀 Production Stack - Đề Xuất Cho Dự Án Thực Tế

Tài liệu này đề xuất các công cụ và technology stack phù hợp để đưa dự án E-commerce lên production.

## 📊 So Sánh: Development vs Production

| Aspect | Development (Hiện tại) | Production (Đề xuất) |
|--------|----------------------|---------------------|
| **Process Manager** | `node server.js` | PM2 hoặc Docker |
| **Reverse Proxy** | Không có | Nginx |
| **Database** | MongoDB local | MongoDB Atlas hoặc self-hosted |
| **Logging** | `console.log` | Winston + ELK Stack |
| **Monitoring** | Không có | Prometheus + Grafana |
| **Error Tracking** | Không có | Sentry |
| **Caching** | Không có | Redis |
| **Rate Limiting** | Không có | express-rate-limit |
| **SSL/HTTPS** | HTTP | Let's Encrypt |
| **CI/CD** | Manual | GitHub Actions |
| **Backup** | Manual | Automated (MongoDB Atlas) |

---

## 🎯 Stack Đề Xuất Cho Production

### 1. **Process Manager: PM2** ⭐ QUAN TRỌNG

**Tại sao cần:**
- Tự động restart khi crash
- Load balancing (cluster mode)
- Zero-downtime deployment
- Monitoring tích hợp

**Cài đặt:**
```bash
npm install -g pm2
```

**Cấu hình: `ecosystem.config.js`**
```javascript
module.exports = {
  apps: [{
    name: 'ecommerce-api',
    script: './server.js',
    instances: 2,  // Số lượng instances (hoặc 'max' để dùng tất cả CPU cores)
    exec_mode: 'cluster',  // Cluster mode cho load balancing
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '1G',
    watch: false,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
```

**Lệnh thường dùng:**
```bash
# Start
pm2 start ecosystem.config.js

# Stop
pm2 stop ecommerce-api

# Restart
pm2 restart ecommerce-api

# Reload (zero-downtime)
pm2 reload ecommerce-api

# Monitor
pm2 monit

# Logs
pm2 logs ecommerce-api

# Save config để auto-start khi server reboot
pm2 save
pm2 startup
```

---

### 2. **Reverse Proxy: Nginx** ⭐ QUAN TRỌNG

**Tại sao cần:**
- SSL/TLS termination
- Load balancing
- Static file serving
- Compression
- Security headers

**Cấu hình: `/etc/nginx/sites-available/ecommerce`**
```nginx
# Upstream cho backend
upstream backend {
    least_conn;  # Load balancing strategy
    server localhost:5000;
    server localhost:5001;  # Nếu có nhiều instances
    keepalive 64;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;

    # Client body size (cho upload)
    client_max_body_size 10M;

    # Frontend (React build)
    location / {
        root /var/www/ecommerce/frontend/dist;
        try_files $uri $uri/ /index.html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Backend API
    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files
    location /uploads {
        alias /var/www/ecommerce/backend/uploads;
        expires 1y;
        add_header Cache-Control "public";
    }
}
```

**Cài đặt SSL với Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

### 3. **Database: MongoDB Atlas** (Khuyên dùng) hoặc Self-hosted

#### Option A: MongoDB Atlas (Khuyên dùng cho production)

**Ưu điểm:**
- ✅ Managed service, không cần maintain
- ✅ Tự động backup
- ✅ High availability
- ✅ Monitoring tích hợp
- ✅ Security tốt

**Setup:**
1. Đăng ký tại [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Tạo cluster (Free tier có sẵn)
3. Whitelist IP của server
4. Lấy connection string
5. Update `MONGODB_URI` trong `.env`

#### Option B: Self-hosted MongoDB

**Cài đặt:**
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Cấu hình: `/etc/mongod.conf`**
```yaml
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 127.0.0.1  # Chỉ localhost, dùng SSH tunnel hoặc VPN

security:
  authorization: enabled  # Enable authentication
```

**Tạo user:**
```javascript
use admin
db.createUser({
  user: "admin",
  pwd: "strong_password",
  roles: ["root"]
})

use ecommerce
db.createUser({
  user: "ecommerce_user",
  pwd: "strong_password",
  roles: ["readWrite"]
})
```

---

### 4. **Caching: Redis** ⭐ QUAN TRỌNG

**Tại sao cần:**
- Cache products, categories
- Session storage
- Rate limiting
- Real-time features

**Cài đặt:**
```bash
sudo apt install redis-server
sudo systemctl start redis
sudo systemctl enable redis
```

**Cấu hình Backend:**
```bash
npm install redis ioredis
```

**Sử dụng trong code:**
```javascript
// backend/services/cache.js
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

export const cache = {
  async get(key) {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  },

  async set(key, value, ttl = 3600) {
    await redis.setex(key, ttl, JSON.stringify(value));
  },

  async del(key) {
    await redis.del(key);
  },

  async clear(pattern) {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
};

export default redis;
```

**Ví dụ sử dụng:**
```javascript
// Cache products list
router.get('/products', async (req, res) => {
  const cacheKey = `products:${JSON.stringify(req.query)}`;
  
  // Check cache
  const cached = await cache.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }
  
  // Query database
  const products = await Product.find(req.query);
  
  // Cache for 1 hour
  await cache.set(cacheKey, products, 3600);
  
  res.json(products);
});
```

---

### 5. **Logging: Winston** ⭐ QUAN TRỌNG

**Cài đặt:**
```bash
npm install winston winston-daily-rotate-file
```

**Cấu hình: `backend/utils/logger.js`**
```javascript
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'ecommerce-api' },
  transports: [
    // Error logs
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d'
    }),
    // All logs
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

// Console output in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger;
```

**Sử dụng:**
```javascript
import logger from './utils/logger.js';

// Thay vì console.log
logger.info('Server started on port 5000');
logger.error('Database connection failed', { error: err });
logger.warn('Low stock alert', { productId: '123' });
```

---

### 6. **Error Tracking: Sentry** ⭐ QUAN TRỌNG

**Cài đặt:**
```bash
npm install @sentry/node @sentry/react
```

**Backend: `backend/server.js`**
```javascript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// Error handler
app.use(Sentry.Handlers.errorHandler());
```

**Frontend: `frontend/src/main.jsx`**
```javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});
```

---

### 7. **Rate Limiting: express-rate-limit**

**Cài đặt:**
```bash
npm install express-rate-limit
```

**Cấu hình: `backend/middleware/rateLimiter.js`**
```javascript
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redis from '../services/cache.js';

// General API rate limiter
export const apiLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:api:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth rate limiter (stricter)
export const authLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:auth:'
  }),
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 login attempts per 15 minutes
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true,
});
```

**Sử dụng:**
```javascript
import { apiLimiter, authLimiter } from './middleware/rateLimiter.js';

app.use('/api', apiLimiter);
app.use('/api/auth/login', authLimiter);
```

---

### 8. **Monitoring: PM2 + Prometheus + Grafana**

#### PM2 Monitoring (Built-in)
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

#### Prometheus + Grafana (Advanced)

**Cài đặt PM2 Prometheus exporter:**
```bash
npm install pm2-prom-module
pm2 install pm2-prom-module
```

**Cấu hình Grafana dashboard để monitor:**
- CPU, Memory usage
- Request rate, response time
- Error rate
- Database connections

---

### 9. **CI/CD: GitHub Actions**

**Cấu hình: `.github/workflows/deploy.yml`**
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd backend
        npm ci
    
    - name: Run tests
      run: |
        cd backend
        npm test
    
    - name: Deploy to server
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /var/www/ecommerce
          git pull origin main
          cd backend
          npm ci --production
          pm2 reload ecosystem.config.js
```

---

### 10. **Security Enhancements**

#### Helmet.js (Security Headers)
```bash
npm install helmet
```

```javascript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

#### CORS Configuration
```javascript
import cors from 'cors';

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://yourdomain.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

#### Input Validation
```bash
npm install express-validator
```

---

## 📦 Package.json Updates

**Backend dependencies cần thêm:**
```json
{
  "dependencies": {
    // ... existing dependencies
    "redis": "^4.6.0",
    "ioredis": "^5.3.0",
    "winston": "^3.11.0",
    "winston-daily-rotate-file": "^4.7.1",
    "@sentry/node": "^7.91.0",
    "express-rate-limit": "^7.1.0",
    "rate-limit-redis": "^5.0.0",
    "helmet": "^7.1.0",
    "express-validator": "^7.0.1"
  }
}
```

---

## 🐳 Docker Production Setup

**`docker-compose.prod.yml`**
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    restart: always
    volumes:
      - mongo_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
    networks:
      - ecommerce-network

  redis:
    image: redis:7-alpine
    restart: always
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - ecommerce-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    restart: always
    environment:
      NODE_ENV: production
      MONGODB_URI: ${MONGODB_URI}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      REDIS_PASSWORD: ${REDIS_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
      SENTRY_DSN: ${SENTRY_DSN}
    depends_on:
      - mongodb
      - redis
    networks:
      - ecommerce-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
      args:
        - VITE_API_URL=${API_URL}
    restart: always
    networks:
      - ecommerce-network

volumes:
  mongo_data:
  redis_data:

networks:
  ecommerce-network:
    driver: bridge
```

---

## 📋 Checklist Production

### Server Setup
- [ ] Ubuntu 22.04 LTS hoặc tương đương
- [ ] Firewall configured (UFW)
- [ ] SSH key authentication
- [ ] Non-root user với sudo
- [ ] Automatic security updates

### Application
- [ ] PM2 installed và configured
- [ ] Nginx configured với SSL
- [ ] Environment variables set
- [ ] Logs directory created
- [ ] Uploads directory với proper permissions

### Database
- [ ] MongoDB Atlas hoặc self-hosted
- [ ] Authentication enabled
- [ ] Backup strategy
- [ ] Indexes created

### Monitoring
- [ ] PM2 monitoring enabled
- [ ] Sentry configured
- [ ] Log rotation configured
- [ ] Health check endpoint working

### Security
- [ ] Rate limiting enabled
- [ ] Helmet.js configured
- [ ] CORS properly configured
- [ ] Input validation
- [ ] SQL injection protection (MongoDB safe by default)
- [ ] XSS protection

### CI/CD
- [ ] GitHub Actions configured
- [ ] Automated tests
- [ ] Deployment script

---

## 🚀 Deployment Steps

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install -y nginx
   
   # Install Redis
   sudo apt install -y redis-server
   ```

2. **Clone Repository**
   ```bash
   cd /var/www
   git clone <your-repo-url> ecommerce
   cd ecommerce
   ```

3. **Install Dependencies**
   ```bash
   cd backend
   npm ci --production
   
   cd ../frontend
   npm ci
   npm run build
   ```

4. **Configure Environment**
   ```bash
   # Backend .env
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-secret-key
   REDIS_HOST=localhost
   REDIS_PORT=6379
   SENTRY_DSN=your-sentry-dsn
   ```

5. **Start with PM2**
   ```bash
   cd backend
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx**
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/ecommerce
   sudo ln -s /etc/nginx/sites-available/ecommerce /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

7. **Setup SSL**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 💰 Chi Phí Ước Tính (Monthly)

| Service | Option | Cost |
|---------|--------|------|
| **Server** | DigitalOcean/Vultr (2GB RAM) | $12-15 |
| **Domain** | Namecheap/GoDaddy | $10-15/year |
| **MongoDB** | Atlas Free Tier | $0 |
| **MongoDB** | Atlas M10 (Production) | $57 |
| **Redis** | Self-hosted | $0 |
| **Redis** | Redis Cloud Free | $0 |
| **Sentry** | Free Tier | $0 |
| **Sentry** | Team Plan | $26 |
| **CDN** | Cloudflare Free | $0 |
| **Email** | SendGrid Free | $0 |
| **Total (Minimal)** | | **~$12-15/month** |
| **Total (Production)** | | **~$100-120/month** |

---

## 📚 Tài Liệu Tham Khảo

- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Redis Documentation](https://redis.io/docs/)
- [Sentry Documentation](https://docs.sentry.io/)
- [Let's Encrypt](https://letsencrypt.org/)

---

**💡 Lưu Ý:**
- Bắt đầu với stack tối thiểu (PM2 + Nginx + MongoDB Atlas)
- Thêm Redis và monitoring khi traffic tăng
- Luôn có backup strategy
- Monitor và optimize dần dần

