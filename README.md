## Run MongoDB

1. In any folder, i just run at project root,

```bash
mongod
```

2. Download mongoDB Compass, which is the client application to connect to a MongoDB server.

For Detailed Info, refer to chapter [Calling Backen Service - 18. Installing MongoDB on Mac](https://codewithmosh.com/courses/357787/lectures/5867618)

## In backend folder

1. Install dependency.

```bash
npm i
```

2. Seed our DB with some data.

```bash
node seed.js
```

Now if you open up MongoDB Compass, you could see a DB named "vidly"

3. Start backend web server.

```bash
node index.js
```

For Detailed Info, refer to chapter [Calling Backen Service - 20. Setting Up the Node Backend](https://codewithmosh.com/courses/357787/lectures/5867613)

## In frontend folder

1. Install dependency.

```bash
npm i
```

2. Start frontend server.

```bash
npm start
```


## Admin user:
Only admin user can see the delete button to delete a movie
- username: test2@gmail.com
- pass: Pa$$word5
