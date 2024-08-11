import Theme from "./Theme";
import { getServerTheme } from "next-server-theme/server";

export default function HomePage() {
    return <Theme serverTheme={getServerTheme()} />;
}
