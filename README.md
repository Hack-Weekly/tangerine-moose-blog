# Tangerine Moose Blog App

## Architecture:

### Front end:

NextJS 13 hosted on Vercel

- React recommended framework
- [Link to lessons on React & NextJS by NextJS team](https://nextjs.org/learn/foundations/from-javascript-to-react)
- [Fundamentals of React by React team](https://react.dev/learn)
- [Vercel can deploy NextJS for free](https://vercel.com/home)
- Use raw CSS, no libraries, to minimize learning curve
- Use JavaScript, not TypeScript, to minimize new things to learn

### Back end:

NextJS API routes

- Mini NodeJS backend built into NextJS
- [Documentation on writing API routes](https://beta.nextjs.org/docs/routing/route-handlers)
- Use JavaScript, not TypeScript, to minimize new things to learn

[Authentication with Firebase:](https://firebase.google.com/docs/auth)

- Google, Facebook, GitHub

### Database:

NoSQL database

- Hosted on Firebase, MongoDB, or AWS
- [Firebase documentation](https://firebase.google.com/docs/database)

## Structure:

### Front end:

Routes:

- / : a landing page to show all blogs, maybe a blurb of recent posts
- /[blog] : a page to show summaries of recent posts of a given blog
- /[blog]/[post] : a page to show all data on a given blog post
- /[blog]/create : a page to create a blog post (must be authenticated)
- /create : a page to create a blog (must be authenticated)

### Back end:

Routes (will depend on how to interact with database):

- /[blog]/[post]/comment : Endpoint to comment on a blog post
- /[blog]/[post]/react : Endpoint to react to a blog post
- /[blog]/create : A POST endpoint to create a blog post
- /create : A POST endpoint to create a blog

Image Hosting on Firebase

### Database:

Each blog is a document containing posts, which contains all comments & reactions? Might get dense. Further research required

## Tasks & priorities (can be done in parallel):

### Front end:

1. Landing page with dummy data
2. Blog page with dummy data
3. Create post page with dummy data
4. Connect pages to database for SSR (just viewing, no actions)
5. Add action handling (creating posts, reactions, etc)

### Database:

1. Create the thing
2. Allow backend to connect

### Back end (after DB):

1. Authenticate with Firebase
2. /create a blog
3. /[blog]/create a blog post
4. /[blog]/[post]/react to a blog post

# Default Readme

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
