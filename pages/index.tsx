import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1 className="text-3xl font-bold underline">Social Resonance</h1>
    <p>
      <Link href="/register">Register</Link>
    </p>
    <p>
      <Link href="/about">About</Link>
    </p>
  </Layout>
)

export default IndexPage
