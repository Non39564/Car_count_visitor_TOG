import Sidebar from './component/sidebar';
import Footer from './component/footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/bootstrap.css';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react"

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    <SessionProvider session={session}>
    <>
    <Head>
      {/* <script crossorigin src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
      <script crossorigin src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.2/moment.min.js'></script> */}
    </Head>
    <Sidebar />
    <br></br>
    <Component {...pageProps} />
    </>
    </SessionProvider>
  )
  
}

export default MyApp
