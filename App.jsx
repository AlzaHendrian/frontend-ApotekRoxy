/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import Navigation from './src/navigation/navigation';
import { QueryClient, QueryClientProvider } from "react-query";



function App(){

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Navigation/>
    </QueryClientProvider>
  )
}
export default App;
