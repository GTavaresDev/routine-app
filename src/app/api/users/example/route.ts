import { createUserExampleRoute } from "@/routes/create-user.example.route";

export async function POST(request: Request) {
  return await createUserExampleRoute(request);
}
