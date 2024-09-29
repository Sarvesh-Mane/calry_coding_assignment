# Calry Coding Assignment

This repository contains solutions for the **Calry Internship Coding Assignment**, which includes two tasks:

1. **Meeting Scheduler (Optimize Bookings)**
2. **Hotel Room Service Request API**

## Task 1: Meeting Scheduler (Optimize Bookings)

### Problem:
The goal is to merge overlapping or consecutive meeting times to optimize room bookings.

### Solution:
The function `optimizeBookings` takes an array of meeting times (represented as start and end times) and merges any overlapping or consecutive bookings.

### How to Run:
1. Make sure you have Node.js installed.
2. Run the following script to test the function:

   ```bash
   node meeting-scheduler.js
Example:
```typescript
Copy code
const bookings = [[9, 12], [11, 13], [14, 17], [16, 18]];
const optimizedBookings = optimizeBookings(bookings);
console.log(optimizedBookings); // Output: [[9, 13], [14, 18]]
```
## Task 2: Hotel Room Service Request API
## Overview:
This task involves building a RESTful API to manage hotel room service requests. The API stores the requests in a JSON file and allows users to create, retrieve, update, delete, and mark requests as completed.

## Features:
1.Create new room service requests.
2.Retrieve all requests or a specific request by ID.
3.Update or delete requests.
4.Mark a request as completed.

## Getting Started:
Install the dependencies:

```bash
npm install
```
Compile TypeScript:

```
tsc
```
Run the server:
```
node dist/server.js
```
The server will run on http://localhost:5000.

API Endpoints:
POST /requests: Create a new service request.
GET /requests: Retrieve all service requests.
GET /requests/
: Retrieve a specific request by ID.
PUT /requests/
: Update a request by ID.
DELETE /requests/
: Delete a request by ID.
POST /requests/
/complete: Mark a request as completed.
Example API Request (POST /requests):
```json

{
  "guestName": "ABC",
  "roomNumber": 1031,
  "requestDetails": "Need towels",
  "priority": 1,
  "status": "received"
}
```
## License
This project is for educational purposes only.
