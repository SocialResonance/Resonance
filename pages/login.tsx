import Link from 'next/link'
import Layout from '../components/Layout'

const LoginPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>Login</h1>
    <p>This is the Login page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export default LoginPage
