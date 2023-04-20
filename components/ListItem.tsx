import React from 'react'
import Link from 'next/link'

import { User } from '../interfaces'

type Props = {
  data: User
}

const ListItem = ({ data }: Props) => (
  <Link href="/users/[id]" as={`/users/${data.uid}`}>
    <a>
      {data.uid}: {data.name}
    </a>
  </Link>
)

export default ListItem
