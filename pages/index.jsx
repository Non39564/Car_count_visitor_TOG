import Barchart from './component/chart'
import Table_Dashboard from './component/tableondashboard'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Table_Dashboard /> 
      <Barchart />
    </div>
  )
}
