import Sidebar from './component/sidebar';
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
    </Head>
    <Sidebar />
    <br></br>
    <Component {...pageProps} />
    </>
    </SessionProvider>
  )
  
}

export default MyApp
