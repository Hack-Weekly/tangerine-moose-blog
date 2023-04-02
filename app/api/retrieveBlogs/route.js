// Pulling mock mongodb
import mockCollection from "@/data/mockBlogs";

export async function GET(request) {
  // TODO: get a connection to MongoDb and return from proper collection
  const mockCursor = { toArray: () => Promise.resolve(mockCollection) };
  const mockCollectionObject = { find: () => mockCursor };
  const documents = await mockCollectionObject.find().toArray();

  return new Response(JSON.stringify(documents));
}
