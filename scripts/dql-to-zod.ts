import dqlToZod from 'dql-to-zod'
import fs from 'fs'

const schema = fs.readFileSync("interfaces/schema.txt", "utf8")

dqlToZod(schema, "interfaces/zodSchemasAndTypes.ts")

