import { cookies } from "next/headers";
import { z } from "zod";

const stringToJSONSchema = z
    .string()
    .transform((str, ctx): z.infer<ReturnType<typeof JSON.parse>> => {
        try {
            return JSON.parse(str);
        } catch (e) {
            ctx.addIssue({ code: "custom", message: "Invalid JSON" });
            return z.NEVER;
        }
    });

const SetCookie = z.object({
    value: z.string({
        invalid_type_error: "Value must be a string"
    })
});

export async function POST(req: Request) {
    try {
        const { value } = SetCookie.parse(
            stringToJSONSchema.parse(await req.text())
        );

        cookies().set("theme", value);
        console.log("set cookie", "theme", value);

        return new Response("success", {
            status: 200
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message ?? "error", { status: 400 });
        }
        return new Response("error", {
            status: 500
        });
    }
}
