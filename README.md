# EventSphereBackend

EventSphereBackend is an API system for university event management, built with Node.js, Express, and MySQL. It supports user management, event management, registration, attendance, certificate issuance, feedback, media, notifications, and role-based access control.

## Minimum Node.js Version

**Required Node.js version:**  
`>= 18.0.0` (recommended: Node.js 20 LTS or newer)

Add this to your `package.json` to enforce the minimum version:

```json
"engines": {
  "node": ">=18.0.0"
}
```

## Folder Structure

```
.env
.gitignore
db.js
eventsphere_db.sql
eventsphere_seed.sql
package.json
README.md
server.js
swagger.js
test-db.js
certificates/
controllers/
media/
middlewares/
```

## Installation

1. **Clone the repository**
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Configure the database**
   - Create the database using [eventsphere_db.sql](eventsphere_db.sql)
   - Seed sample data with [eventsphere_seed.sql](eventsphere_seed.sql)
   - Update DB connection info in [.env](.env)

## Run Server

```sh
node server.js
```

Server runs at `http://localhost:5000` by default.

## API Documentation

Access Swagger at:  
`http://localhost:5000/api-docs`

## Main Features

- Registration, login, role-based access (Admin, Organizer, Student)
- Event management: create, approve, edit, delete, view details
- Event registration, attendance, certificate issuance
- Feedback management and approval
- Media management (images/videos) for events
- Notifications (frontend/email)
- Event statistics and analytics

## Key Files & Folders

- [server.js](server.js): Server initialization, API routing
- [controllers/userController.js](controllers/userController.js): User logic
- [controllers/eventController.js](controllers/eventController.js): Event logic
- [middlewares/auth.js](middlewares/auth.js): Authentication & authorization middleware
- [db.js](db.js): MySQL connection
- [swagger.js](swagger.js): Swagger API docs configuration

## Sample Accounts

- **Admin:**  
  Email: `admin@test.com`  
  Password: `password`
- **Organizer:**  
  Email: `izer@test.com`  
  Password: `password`
- **Student:**  
  Email: `student@test.com`  
  Password: `pass`

## License

ISC
