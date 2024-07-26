import Test from "./test";
import { getServerTheme } from "next-server-theme/dev/server.ts";

export default function HomePage() {
    console.log(getServerTheme());
    return <Test serverTheme={getServerTheme()} />;
}
