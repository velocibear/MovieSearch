import { AppProps } from 'next/app'
import '../styles/globals.css'

function MovieSearchApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MovieSearchApp
