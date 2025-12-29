# Resources & Tools

## 📚 Documentation

### Official Docs
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual)
- [Mongoose Documentation](https://mongoosejs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)

### Learning Resources
- [React Router Tutorial](https://reactrouter.com)
- [JWT Introduction](https://jwt.io)
- [RESTful API Design](https://restfulapi.net)
- [MongoDB in 100 Seconds](https://youtu.be/E-1xI89PH0M)

---

## 🛠️ Tools & Software

### Essential
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Visual Studio Code](https://code.visualstudio.com)
- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- [MongoDB Community](https://www.mongodb.com/try/download/community)

### Useful Tools
- [MongoDB Compass](https://www.mongodb.com/products/compass) - MongoDB GUI
- [Postman](https://www.postman.com) - API testing
- [Insomnia](https://insomnia.rest) - API client
- [Thunder Client](https://www.thunderclient.com) - VS Code extension

### VS Code Extensions
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [MongoDB for VS Code](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

---

## 🎓 Tutorials

### React
1. [React Official Tutorial](https://react.dev/learn)
2. [React Router: Getting Started](https://reactrouter.com/en/main/start/overview)
3. [Zustand for State Management](https://github.com/pmndrs/zustand)
4. [Axios HTTP Client](https://axios-http.com/docs/intro)

### Backend
1. [Express.js Tutorial](https://expressjs.com/en/starter/basic-routing.html)
2. [MongoDB CRUD Operations](https://docs.mongodb.com/manual/crud/)
3. [Mongoose Schema Design](https://mongoosejs.com/docs/guide.html)
4. [JWT Authentication](https://tools.ietf.org/html/rfc7519)

### Docker
1. [Docker Getting Started](https://docs.docker.com/get-started/)
2. [Docker Compose Tutorial](https://docs.docker.com/compose/gettingstarted/)
3. [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## 🔧 CLI Commands Reference

### Docker
```bash
docker --version                    # Check Docker version
docker run -it image-name          # Run a container
docker ps                          # List running containers
docker ps -a                       # List all containers
docker logs container-name         # View logs
docker exec -it container bash     # Access container shell
docker stop container-name         # Stop container
docker rm container-name           # Remove container
docker-compose up                  # Start services
docker-compose down                # Stop services
docker-compose logs -f             # View logs in real-time
```

### Git
```bash
git clone <url>                    # Clone repository
git status                         # Check status
git add .                          # Stage changes
git commit -m "message"            # Commit changes
git push                           # Push to remote
git pull                           # Pull from remote
git branch                         # List branches
git checkout -b feature            # Create new branch
```

### npm
```bash
npm init                           # Initialize project
npm install                        # Install dependencies
npm install package-name           # Install package
npm start                          # Start project
npm run dev                        # Run dev server
npm run build                      # Build project
npm test                           # Run tests
npm update                         # Update packages
```

---

## 📊 API Testing

### Using curl
```bash
# GET request
curl http://localhost:5000/api/products

# POST request
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'

# With headers
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/users/profile
```

### Using Postman
1. Download [Postman](https://www.postman.com/downloads/)
2. Create new collection
3. Add requests for each endpoint
4. Set up environment variables
5. Test & share

### Using Thunder Client (VS Code)
1. Install Thunder Client extension
2. Create new request
3. Select method (GET, POST, etc.)
4. Enter URL
5. Add headers & body as needed
6. Send request

---

## 📱 Browser DevTools

### Viewing API Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Perform action (login, add to cart, etc.)
4. See HTTP requests & responses
5. Check status codes, headers, payload

### Debugging JavaScript
1. Go to Sources tab
2. Set breakpoints by clicking line numbers
3. Step through code (F10)
4. Check variables in Console
5. Use debugger statements

### LocalStorage
1. Go to Application tab
2. Find LocalStorage in left sidebar
3. See stored data (token, cart, etc.)
4. Can manually edit or delete

---

## 🌐 Deployment Platforms

### Free Hosting Options
- [Vercel](https://vercel.com) - Frontend (React)
- [Netlify](https://www.netlify.com) - Frontend (React)
- [Heroku](https://www.heroku.com) - Backend (Node.js)
- [Railway](https://railway.app) - Full-stack
- [Render](https://render.com) - Full-stack
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database

### Premium Options
- [AWS](https://aws.amazon.com)
- [Google Cloud](https://cloud.google.com)
- [Azure](https://azure.microsoft.com)
- [DigitalOcean](https://www.digitalocean.com)
- [Linode](https://www.linode.com)

---

## 💻 System Requirements

### Minimum
- Windows 10, macOS 10.14, Ubuntu 16.04+
- 4GB RAM
- 10GB disk space
- Docker support

### Recommended
- Windows 11 / macOS 12+ / Ubuntu 20.04+
- 8GB+ RAM
- 20GB+ disk space
- SSD
- 100Mbps internet

---

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never hardcode secrets
   - Use .env files (don't commit)
   - Rotate tokens regularly

2. **Database**
   - Use strong passwords
   - Enable authentication
   - Regular backups
   - Keep software updated

3. **API**
   - Validate all inputs
   - Use HTTPS in production
   - Implement rate limiting
   - Add CORS properly

4. **Frontend**
   - Sanitize HTML input
   - Use HTTPS
   - Keep dependencies updated
   - No sensitive data in localStorage

---

## 📞 Getting Help

### Documentation
- [Project README.md](./README.md)
- [Setup Guide](./SETUP.md)
- [Features List](./FEATURES.md)

### Communities
- [Stack Overflow](https://stackoverflow.com) - Ask questions
- [Reddit r/learnprogramming](https://www.reddit.com/r/learnprogramming/)
- [Dev.to](https://dev.to) - Articles & discussions

### Support
- GitHub Issues (if on GitHub)
- Email team members
- Discord community (if available)

---

## 📖 Recommended Reading

### JavaScript
- "Eloquent JavaScript" by Marijn Haverbeke
- "JavaScript: The Good Parts" by Douglas Crockford

### Web Development
- "Fullstack JavaScript" by Julio Cesar
- "The Pragmatic Programmer" by David Thomas & Andrew Hunt

### System Design
- "System Design Interview" by Alex Xu
- "Designing Data-Intensive Applications" by Martin Kleppmann

---

## 🎯 Next Steps

1. ✅ Run the project
2. ✅ Understand the codebase
3. ✅ Make small changes
4. ✅ Add new features
5. ✅ Deploy to production
6. ✅ Maintain & improve

---

## 📝 Notes

- Keep learning & exploring
- Read official documentation
- Follow best practices
- Write clean code
- Test thoroughly
- Deploy confidently

---

**Good luck with your project! 🚀**
