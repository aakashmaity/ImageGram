## TASK

1.  When one post deleted, image from cloudinary also must be deleted maybe using triggers 

2.  Implement Likes and comments in a post. There must be some different types of likes present. ex. Love, support, celebrate etc,
    If you have to change types of like, it should be technically doable.
    We should be support for likes in a comment also.
    Also Comments can be done in a comment.
    1. Likes on posts and comments
    2. Comments on a post and comment also

3.  Complete Swagger docs by swagger openapi specifications
4. 



## PROGRESS

1. Implement simple express server
2. Implement multer to handle image files and setup cloudinary config to upload it in Cloudinary.

Layers
3.      Controller layer : responsible only for forwarding req to the respective services and response back to the client
4.      Service layer : responsible for write business logics and interect with the Repository Layer and response back to Controller
5.      Repository layer : responsible for direct database interaction and response back to the Service layer.
6.      Validator layer : responsible for validate req, So before forwarding to Controller layer it checks required validation (It implement in routing level as a middleware) ```(zod)```

7. Middleware : Other middlewares like auth implement here
8. API versioning : It helps in future when we want to migrate our business logic into different ways, we can vork with /api/v2 also. For now we have just /api/v1
9. Store Hashed password : Storing hashed password into database for more security by Database Triggers. ```(bcrypt)```
10. Implement signin : Generate token includes userDetails for signed in user. ```(jsonwebtoken)```
11. Swagger OpenAPI : It helps to understand API easyly. Added /api-docs routes for API Documentation. ```(swagger-jsdoc, swagger-ui-express)``` 


12. Deployment of Render : Deploy to render. link -> https://imagegram-o48u.onrender.com
    
    Deployment of AWS : -> create EC2 instance 
                        -> download .pem login key 
                        -> estublish SSH connection 
                        -> clone the repo. 
                        -> Setup .env file
                        -> Install pm2 npm package globally and run ```pm2 start src/index.js```(pm2 helps to run continuously in the background even after the terminal session is closed or end SSH connection)
                        -> copy Public IP address of EC2 instance -> paste to the browser

13. Load balancer on AWS : -> Create multiple EC2 instance server 
                           -> Create AWS Elastic IPs (gives Permanent IPs) and associate instances with each Elastic IPs 
                           -> go to each instance and start server using pm2, So that server continuously running in background
                           -> Create another EC2 for loadbalancer
                           -> install nginx
                           -> Setup nginx config refer this- [link](https://github.com/aakashmaity/nginx-loadbalancer-config)
