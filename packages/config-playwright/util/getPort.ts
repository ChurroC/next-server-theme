import net from "net";

export default function getPort() {
    const server = net.createServer();
    // 0 assigns to a random available port
    server.listen(0);
    const address = server.address();
    // For this whole process and all tests reuse the first port that is available
    server.close();
    return (address as net.AddressInfo).port.toString();
}
