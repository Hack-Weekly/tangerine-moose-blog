// Pulling mock mongodb

import mockCollection from "@/data/mockBlogs";

export async function POST(request) {
  //console.log(request);
  const data = await request.json();

  console.log(data);
  // TODO: update _id with actual _id being used in database
  const _id = mockCollection.length + 1;

  // // TODO: update newBlog to actual attributes
  const newBlog = {
    _id,
    title: data.title,
    author: data.author,
    blog: data.blog,
    publishedDate: new Date().toISOString(),
  };

  // // TODO: get connection to MongoDb and insert new document
  mockCollection.push(newBlog);

  return new Response(JSON.stringify(newBlog));
}
