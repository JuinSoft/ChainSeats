import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import EventList from './components/EventList';
import MyEvents from './components/MyEvents';
import CreateEvent from './components/CreateEvent';
import SubscribeEvent from './components/SubscribeEvent';
import UnsubscribeEvent from './components/UnsubscribeEvent';
import './App.css';
import { current_chain, application_id } from './graphql/client';

function App() {
  const [view, setView] = useState('myEvents');
  return (
    <ApolloProvider client={client}>
      <div className="App p-8 bg-gray-900 min-h-screen">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">ChainSeats</h1>
          <p className="text-lg text-gray-400">Manage your events seamlessly on the Linera microchain</p>
        </header>Current
        <main>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <CreateEvent />
              <div className="mt-4">
                <nav className="flex space-x-4 mb-4">
                  <button
                    className={`tab-button ${view === 'myEvents' ? 'bg-green-500' : ''}`}
                    onClick={() => setView('myEvents')}
                  >
                    My Events
                  </button>
                  <button
                    className={`tab-button ${view === 'subscribedEvents' ? 'bg-green-500' : ''}`}
                    onClick={() => setView('subscribedEvents')}
                  >
                    Subscribed Events
                  </button>
                </nav>
                <div className="tab-content">
                  {view === 'myEvents' && <MyEvents />}
                  {view === 'subscribedEvents' && <EventList />}
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <SubscribeEvent />
              <UnsubscribeEvent />
            </div>
          </div>
        </main>
        <footer className="mt-8 text-gray-500 text-center">
          <p>Chain ID: <span className="text-white">{current_chain}</span></p>
          <p>Application ID: <span className="text-white">{application_id}</span></p>
        </footer>
      </div>
    </ApolloProvider>
  );
}

export default App;