import Test from "./test";
import { getServerTheme } from "next-server-theme/server";

export default function HomePage() {
    console.log(getServerTheme());
    return <Test serverTheme={getServerTheme()} />;
}
