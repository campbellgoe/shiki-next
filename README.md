# get started

Start the database locally with ferretdb:

`docker run -d --rm --name ferretdb -p 27017:27017 ghcr.io/ferretdb/all-in-one`

Add this to your .env.local file:

`MONGODB_URI=mongodb://127.0.0.1:27017/`

Make sure you've run `npm install` in the root of the project with package.json

`npm run dev` for Next.js dev server

`npm run build`

`npm run start` for production server from built files.

---

If set up correctly, you should be able to write text files to the database, containing whatever was input in plain text, e.g. arbitrary code.

---

Good luck!