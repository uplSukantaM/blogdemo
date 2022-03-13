import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import configureStore from "../redux/ConfigureStore";

const store = configureStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
