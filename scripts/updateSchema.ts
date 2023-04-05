import { DgraphClient, DgraphClientStub } from "dgraph-js-http";
import fs from 'fs'

const clientStub = new DgraphClientStub("http://localhost:8080")
const dgraphClient = new DgraphClient(clientStub);

const schema = fs.readFileSync("../schema/schema.graphql", "utf8");
dgraphClient.setCloudApiKey("<api-key>");
