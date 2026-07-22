import { NextResponse } from "next/server";
import { makeCreateUserExampleController } from "@/container/user.container";

export async function createUserExampleRoute(request: Request) {
  try {
    const body = await request.json();
    const controller = makeCreateUserExampleController();
    const result = await controller.handle(body);

    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 400,
        error: { message: "Requisição malformada ou JSON inválido." },
      },
      { status: 400 },
    );
  }
}
