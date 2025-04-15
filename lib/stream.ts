'use client';
import { StreamChat } from 'stream-chat';
import { createToken } from './actions';

// Fix: Improved Stream connection function
export async function connectToStream(
  userId: string,
  username: string = 'Anonymous'
) {
  try {
    if (!userId) {
      throw new Error('No user ID provided');
    }

    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    if (!apiKey) {
      throw new Error('Missing Stream API key');
    }

    // Get a fresh token from the server
    const token = await createToken(userId);
    if (!token) {
      throw new Error('Failed to get authentication token');
    }

    // Create a new client instance
    const client = new StreamChat(apiKey);

    // Connect the user with the token
    await client.connectUser(
      {
        id: userId,
        name: username,
      },
      token
    );

    console.log('Successfully connected to Stream Chat');
    return client;
  } catch (error) {
    console.error('Error connecting to Stream Chat:', error);
    throw error;
  }
}
