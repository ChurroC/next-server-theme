import net from "net";

const server = net.createServer();
server.listen(0);
const address = server.address();
let port = (address as net.AddressInfo).port;
server.close();

export default port;
