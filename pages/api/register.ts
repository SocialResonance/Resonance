import { DgraphClient, Mutation, clientStubFromCloudEndpoint } from "dgraph-js";
import { hash } from "bcryptjs"; // for hashing the password
import { v4 as uuidv4 } from "uuid"; // for generating a unique ID

export default async function register(req, res) {
  const { name, email, password } = req.body;
  // Connect to Dgraph client
  const dbURl = process.env.DATABASE_URL || "http://localhost:8080";
  const apiKey = process.env.DGRAPH_CLOUD_API_KEY;
  console.log("dbURl", dbURl);
  console.log("apiKey", apiKey);
  const clientStub = clientStubFromCloudEndpoint(dbURl, apiKey);
  const dgraphClient = new DgraphClient(clientStub);

  try {
    // Check if user already exists
    const query = `query {
      user(func: eq(email, "${email}")) {
        uid
      }
    }`;
    const txn = dgraphClient.newTxn();
    const response = await txn.query(query);
    const data = response.getJson();
    txn.discard();

    if (data.user.length > 0) {
      // User already exists, return an error
      res.status(409).json({ error: "User already exists" });
      return;
    }

    // User doesn't exist, register the user
    const hashedPassword = await hash(password, 10);
    const uid = uuidv4();
    const mutation = `
    mutation {
      set {
        _:user <id> "${uid}" .
        _:user <name> "${name}" .
        _:user <email> "${email}" .
        _:user <password> "${hashedPassword}" .
      }
    }`;
  

  
    const mu = new Mutation();
    mu.setSetNquads(new TextEncoder().encode(mutation));
  
    const txn2 = dgraphClient.newTxn();
    await txn2.mutate(mu);
    await txn2.commit();
    txn2.discard();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
