import { DgraphClient, clientStubFromCloudEndpoint, Operation } from "dgraph-js";
import { credentials } from "@grpc/grpc-js";
import fs from 'fs'
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();



const dbURl = process.env.DATABASE_URL || "http://localhost:8080";
const apiKey = process.env.DGRAPH_CLOUD_API_KEY;
const clientStub = clientStubFromCloudEndpoint(dbURl, apiKey)
const dgraphClient = new DgraphClient(clientStub);

async function updateSchema() {
    // const schemaPath = path.join(__dirname, '../schema/schema.graphql');
    // const schema = fs.readFileSync(schemaPath, 'utf8')
const schema = "name: string @index(exact) .";
const op = new Operation();
op.setSchema(schema);
await dgraphClient.alter(op);


}
updateSchema()