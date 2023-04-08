import { DgraphClient, Mutation, clientStubFromCloudEndpoint, Txn } from "dgraph-js";
import { hash } from "bcryptjs"; // for hashing the password

export default async function register(req, res) {
  const { name, email, password } = req.body;
  // Connect to Dgraph client
  const dbURl = process.env.DATABASE_URL || "http://localhost:8080";
  const apiKey = process.env.DGRAPH_CLOUD_API_KEY;
  console.log("dbURl", dbURl);
  console.log("apiKey", apiKey);
  const clientStub = clientStubFromCloudEndpoint(dbURl, apiKey);
  const dgraphClient = new DgraphClient(clientStub);
  const txn = dgraphClient.newTxn();

  try {
    // Check if user already exists
    const { name, email, password } = req.body;
    console.log("name", name);
    console.log("email", email);

    const query = `{
      user(func: has(name)) @filter(eq(email, "${email}")) {
        name
        email
      }
    }`;
    const dgraphResponse = await dgraphClient.newTxn().query(query);
    console.log("res", dgraphResponse.getJson());
    const allUsers = dgraphResponse.getJson().user;
    if (allUsers.length > 0) {
      console.log("User already exists");
      res.status(400).json({ message: "User already exists" });
      return;
    }
    else {
      // Hash the password
      const hashedPassword = await hash(password, 12);
      // Create a new user
      const user = {
        name,
        email,
        password: hashedPassword,
        spaces: [],
      };
      // Create a new mutation
      const mu = new Mutation();
      mu.setSetJson(user);
      // Commit the mutation
      const response = await txn.mutate(mu);
      console.log("response", response);
      // Commit the transaction
      await txn.commit();
      res.status(200).json({ message: "User created successfully" });
    }

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
  finally {
    await txn.discard();
    // ...
  }

}
