# My Burger Backend

This project serves as a backend for [my-burger](https://github.com/fraddy-oliveira/my-burger) app. It provides APIs for my-burger app to fetch resources from realtime database on firebase.

## Set up development environment

    Prerequisite:
    - Node.js version 20.12.2
    - Docker
    - GCP account
    - Create API key from GCP Identity Platform
    - Create Realtime Database in firebase

- Create `.env` in root directory.
  - `FIREBASE_BASE_URL` is URL of `Realtime Database in firebase`
  - `API_KEY` is `API key from GCP Identity Platform`
- In realtime database, add following value to `ingredients` key:
  ```json
  {
    "bacon": 0,
    "cheese": 0,
    "meat": 0,
    "salad": 0
  }
  ```
- Run app from root directory with command `docker-compose up -d`.
