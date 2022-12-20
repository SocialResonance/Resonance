import Link from 'next/link'
import Layout from '../components/Layout'


const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1 className="text-3xl font-bold underline">Social Resonance</h1>
    <p>
      <Link href="/register">
        <a>Register</a>
      </Link>
    </p>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
