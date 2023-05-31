// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';
export type DbError =
  | 'Username already exists'
  | 'Email already exists'
  | 'User not found'
  | 'Incorrect password'
  | 'Unknown error'
