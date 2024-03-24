import { cookies } from "next/headers";

export async function POST(req: Request) {
    cookies().delete("theme");
    console.log("deleted");
    return new Response("success");
}
