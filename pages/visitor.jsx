import Barchart_Visitor from './component/Barchart_Visitor'
import Table_Visitor from './component/table_visitor'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Visitor</title>
      </Head>
      <Table_Visitor />
      <Barchart_Visitor />
    </div>
  )
}
