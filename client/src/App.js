import React, { Component } from 'react';
import MasterLayout from './layouts/MasterLayout';
import { initiateContract } from './code/functions';

class App extends Component {

  state = { loading: true };

  componentDidMount = async () => {
    try {
      await initiateContract();
      // if ('serviceWorker' in navigator) {
      //   const register = await navigator.serviceWorker.register('./sw.js');
      //   console.log('waiting for acceptance');
      //   const subscription = await register.pushManager.subscribe({
      //     userVisibleOnly: true,
      //     applicationServerKey: this.urlBase64ToUint8Array(this.publicVapidKey),
      //   });
      //   console.log('acceptance complete');

      //   await fetch('http://localhost:5000/subscribe', {
      //     method: 'POST',
      //     body: JSON.stringify({ subscription: subscription, address: "0xbfb21c004EEDc4229d30485E09fcA941eB76223A" }),
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   });
      // } else {
      //   console.error('Service workers are not supported in this browser');
      // }
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // urlBase64ToUint8Array = (base64String) => {
  //   const padding = '='.repeat((4 - base64String.length % 4) % 4);
  //   const base64 = (base64String + padding)
  //     .replace(/-/g, '+')
  //     .replace(/_/g, '/');
  
  //   const rawData = window.atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);
  
  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }
  //   return outputArray;
  // }
  
  // publicVapidKey = 'BMF-3KbHJWcStzcHbA63XYySZX62vpOxyT7jslfCFuyWAx9T9mkp0IZJSB7INgIyAhcWyqrooCAwZOg1kmg-ss0';
  

  render() {
    if (this.state.loading) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <MasterLayout />
      // "hello"
    );
  }
}

export default App;
