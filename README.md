# iste444-project2

## Description
For this project, you'll create a custom web app stack (something other than LAMP and MEAN), which serves up a RESTful API and a client app for a really basic inventory-handling system.
- We chose to create a stack similar to a MERN stack, but swapped out the MongoDB database with a PostgreSQL database.

## Requirements
### 1. Create your own stack on a VM; here are some ideas:
  - Replace MySQL with MongoDB (or Neo4j or something else) in a LAMP stack
  - Replace MongoDB with MySQL (or SQLite or something else) in a MEAN stack
  - Create a VM with a Python-based web framework, such as Flask or Django, and have it interact with the database of your choice
  - Create a VM with a .NET Framework backend with Mongo

    You may not just replace the JavaScript framework in the MEAN stack
    This project is quite open-ended, and that's by design. You can choose which technologies interest you, but the onus is on you to figure out how to get them to play together.

### 2. You'll create a basic inventory-handling system, but you'll choose the content topic (domain). E.g., it could be for some widgets that you're selling, or for a library collection, or a tool rental, or...

### 3. Regardless of the stack that you choose, construct a RESTful API that will enable users to add to:
  - Add to the inventory (POST)
  - Edit inventory items (PUT)
  - Delete items from the inventory (DELETE)
  - Request details for a single item (GET)
  - Request details for all items, or at least a collection of items (GET)

### 4. Build a client app that consumes your RESTful API. It needs to be functional and it shouldn't make the user's eyes bleed, but don't spend a whole lot of time on the styling or UX. The focus for this project is the server stack.

### 5. You must include some sort of authentication. It can be as simple as Basic authentication using a local credential store, or it can be something more elaborate like Shibboleth, OAuth, or even multi-factor authentication using a third party.
  
  Don't worry about authorization. I.e., any user that authenticates with your app is able to perform all operations.
  Also, don't worry about user management. You can manually create users for your app.

### 6. Include custom logging. You determine the location and format. At a minimum, include:
  - REST endpoint (path)
  - User ID
  - Timestamp

### 7. Your site must be accessible outside of your VM (i.e., on any other server on RLES).
