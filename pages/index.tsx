import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/login">
        Login
      </Link>
    </p>
    <p>
      <Link href="/register">
        Register
      </Link>
    </p>
  </Layout>
)

export default IndexPage
