# Drag & Drop Composer

Hello!  
This simple application was build using Next.js.    
It requires **Node.js 18+** to run (I've used **node v18.16.0** and **npm v9.5.1**) 

---

## Run the application

You can easily see it in action by either:

### Preview it locally

```bash
npm install
```

```bash
npm run dev

// or

npm run build
npm run start
```

### Build and run it by using Docker (and docker-compose)

```bash
docker compose up -d
```

In both ways, you can expect the application to be available here http://localhost:3000

## Notes
The app itself doesn't have a real purpose, but it's more a showcase of a few practices/patterns.
- inheritance
- factory pattern
- editor pattern

You can play with this app, by sorting the items on the right hand side column and notice the model being updated in the left hand side.
Also the components A, B, C can be edited by double clicking on them and using the form. Once the changes are confirmed, once again, the changes are reflected in the model, in the left hand side column.
