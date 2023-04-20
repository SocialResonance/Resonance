import { DgraphClient, Mutation, clientStubFromCloudEndpoint, Txn } from "dgraph-js";
import { hash } from "bcryptjs"; // for hashing the password
import { DbError, User } from "../../interfaces";

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


  let error:DbError = "Unknown error";

  try {
    // Check if user already exists
    const { name, email, password } = req.body;
    console.log("name", name);
    console.log("email", email);

    const queryEmail = `{
      user(func: has(name)) @filter(eq(email, "${email}")) {
        name
        email
      }
    }`;
    const queryName = `{
      user(func: has(name)) @filter(eq(name, "${name}")) {
        name
        email
      }
    }`;
    const dgraphResponseEmail = await dgraphClient.newTxn().query(queryEmail);
    const dgraphResponseName = await dgraphClient.newTxn().query(queryName);
    const allUsersWithSameEmail = dgraphResponseEmail.getJson().user;
    if (allUsersWithSameEmail.length > 0) {
      console.log("Email already exists");
      error = "Email already exists";
      res.status(400).json({ error });
      return;
    }
    const allUsersWithSameName = dgraphResponseName.getJson().user;
    if (allUsersWithSameName.length > 0) {
      console.log("Username already exists");
      error = "Username already exists";
      res.status(400).json({ error });
      return;
    }
    else {
      // Hash the password
      const hashedPassword = await hash(password, 12);
      // Create a new user
      const user: User = {
        uid: "_:newUser",
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
    res.status(500).json({ error });
  }
  finally {
    await txn.discard();
    // ...
  }

}
