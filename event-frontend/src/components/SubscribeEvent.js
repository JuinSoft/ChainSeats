import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SUBSCRIBE_EVENT } from '../graphql/queries';

const SubscribeEvent = () => {
    const [subscribeEvent] = useMutation(SUBSCRIBE_EVENT);
    const [chainId, setChainId] = useState('');

    const handleSubscribe = async () => {
        try {
            await subscribeEvent({ variables: { chainId } });
            console.log('Subscribed to events');
        } catch (error) {
            console.error('Error subscribing to events:', error);
        }
    };

    const handleChainIdChange = (e) => {
        setChainId(e.target.value);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Subscribe to Events</h2>
            <input
                type="text"
                value={chainId}
                onChange={handleChainIdChange}
                placeholder="Enter Chain ID"
                className="bg-gray-700 text-white p-2 rounded-md mb-2"
            />
            <button onClick={handleSubscribe} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                Subscribe
            </button>
        </div>
    );
};

export default SubscribeEvent;