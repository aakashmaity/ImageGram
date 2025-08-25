# 📸 ImageGram

A backend project built with **Node.js, Express, Cloudinary, and AWS** featuring layered architecture, authentication, and deployment setup.

---

## ✅ TASKS

1. When one post is deleted, image from **Cloudinary** must also be deleted (maybe using triggers).  
2. Implement **Likes and Comments** in a post:  
   - Different types of likes (❤️ Love, 💪 Support, 🎉 Celebrate, etc.)  
   - Types of likes should be technically changeable.  
   - Likes supported on both posts and comments.  
   - Comments can also be nested (comment on a comment).  
     - Likes on posts and comments  
     - Comments on a post and comment also  
3. Complete **Swagger docs** using OpenAPI specifications.  
4. *(Reserved for future tasks)*  

---

## 🚀 PROGRESS

1. Implemented a **simple Express server**.  
2. Integrated **Multer** to handle image files and config Cloudinary for uploads into.  

### 🏗️ Layered Architecture
3. **Controller Layer** → Only responsible for forwards request to Service Layer and sends response back to client. Called in routers middleware 
4. **Service Layer** → Contains only business logic, interacts with Repository Layer and response back to Controller. Called in Controller Layer
5. **Repository Layer** → Only responsible for direct database interactions and response back to Service layer. Called in Service layer
6. **Validator Layer** → Using middleware (`zod`) validates requests before Controller.  Called in router middleware

### 🔐 Security & Middleware
7. Implemented **middlewares** ex. authentication.  
8. **API Versioning** → Currently `/api/v1`, in future if we want to migrate our business logic technology we can simple change to `/api/v2`.  
9. **Hashed Passwords** stored in DB using `bcrypt` (via Database Triggers).  
10. **Signin Authentication** → Generate JWT token with userDetails for signed in user using ```(jsonwebtoken)```

### 📖 API Documentation
11. Added **Swagger OpenAPI Docs** for easy API understanding.  
    - `/api-docs` endpoint with `swagger-jsdoc`, `swagger-ui-express`.  

### 🌍 Deployment
12. **Render Deployment** → [Live Link](https://imagegram-o48u.onrender.com)  

    **AWS Deployment**  
    - Create EC2 instance  
    - Download `.pem` login key  
    - Establish SSH connection from your local terminal
    - Clone repo & setup `.env`  
    - Install `pm2` globally then → `pm2 start src/index.js`  
    - Copy EC2 instance Public IP → Access in browser  

13. **AWS Load Balancer Setup**  
    - Create multiple EC2 instances  
    - Create multiple **Elastic IPs** and associate with instances. (Elastic IPs are permanent ip)
    - Start servers using `pm2` on each instance, So that server continuously running in background.
    - Create another EC2 for `load-balancer`  
    - Login into `load-balancer` by SSH connection in your local terminal
    - Install **nginx** and configure. [refer this](https://github.com/aakashmaity/nginx-loadbalancer-config)
    - Copy the public address of `load-balancer` instance → Access in browser

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**  
- **Cloudinary** (Image Hosting)  
- **Multer** (File Uploads)  
- **Zod** (Validation)  
- **bcrypt** (Password Hashing)  
- **jsonwebtoken** (Authentication)  
- **Swagger** (API Docs)  
- **AWS EC2 + Nginx + PM2** (Deployment & Load Balancer)  

---

## 📌 Author
👨‍💻 Developed by [**Akash Maity**](https://github.com/aakashmaity)  
