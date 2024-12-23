# Angular-2024-SoftUni-Project

## Animal Adoption Platform

This project is an animal adoption platform where users can adopt animals or report lost and found animals. The platform has both a front-end built with Angular and a back-end built with Node.js, using Express as the web framework and MongoDB as the database. It includes public and private sections, user authentication, CRUD operations for animal listings, and a user profile section.

-----------------------------------------------------------

![site-img](/client/src/assets/img/project-image.png)


### Technologies Used

**Front-End**

Framework: Angular 18

**Back-End**

Runtime: Node.js
Framework: Express.js
Database: MongoDB

**Libraries:**

bcrypt - Password hashing
cookie-parser - Cookie parsing
cors - CORS support
jsonwebtoken - JWT authentication
mongoose - MongoDB ODM
validator - Input validation

### Public Section (No Login Required)

**Home Page:** Displays a list of animals available for adoption and lost/found animals.
**Animal Adoption:** Users can view animal details and apply for adoption (view-only for guests).
**Lost & Found:** Displays a list of lost and found animals.
**Contact Us:** Information about the shelter.
**About Us:** Information about the shelter.

### Private Section (Requires Login)

**User Authentication:** Users can sign up, log in, and manage their profiles.
**Profile:** A private user section where users can view and manage their information.
**Animal Management:** Authenticated users can create, edit, and delete animal listings (for adoption, lost, or found). Only users who created the animal listing can edit or delete it.
**Likes:** Authenticated users can like animals they are interested in, but only users who are logged in can like an animal. Liked animals are stored under the user’s profile.

### How to Run the Project

**Back-End (Node.js + Express)**

Clone the repository.</br>
Navigate to rest directory:</br>
Install dependencies:</br>
_npm install_</br>
Start the server in development mode:</br>
_npm run dev_</br>
or:</br>
_npm start_</br>
The server will start on http://localhost:3000.</br>
**Note:** If running locally, ensure you have a MongoDB service running, either locally or via MongoDB Atlas, to connect the database.


**Front-End (Angular)**

Navigate to the client directory:</br>
Install dependencies:</br>
_npm install_</br>
Run the Angular application:</br>
_ng serve --open_</br>
The app will be available at http://localhost:4200.


### Deployment

https://animal-adoption-client.onrender.com

Back-End: Hosted on Render with MongoDB Atlas for the database.</br>
Front-End: Hosted on Render.</br>
The client and server are deployed separately, with proper CORS configuration to allow communication between them.