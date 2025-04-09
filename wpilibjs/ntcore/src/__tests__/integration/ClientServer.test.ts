import { NTInstance } from '../../instance/NTInstance';
import { NTClient } from '../../client/NTClient';
import { NTServer } from '../../server/NTServer';
import { NTEntryFlags, NTValueType } from '../../types/NTTypes';
import { sleep } from '../helpers/TestUtils';

// These tests are skipped by default because they use real network connections
// To run them, use: npm test -- -t "Client-Server Integration" --no-skip
describe.skip('Client-Server Integration', () => {
  let serverInstance: NTInstance;
  let clientInstance: NTInstance;
  let server: NTServer;
  let client: NTClient;
  const port = 5810; // Use a non-standard port for testing

  beforeEach(async () => {
    // Set up server
    serverInstance = new NTInstance();
    server = new NTServer(serverInstance, { port, host: 'localhost' });
    await server.start();

    // Set up client
    clientInstance = new NTInstance();
    client = new NTClient(clientInstance, { port, host: 'localhost' });
  });

  afterEach(async () => {
    // Clean up
    client.disconnect();
    server.stop();
    await sleep(100); // Give time for cleanup
  });

  test('client connects to server', async () => {
    const connectPromise = new Promise<void>((resolve) => {
      client.once('connect', () => {
        resolve();
      });
    });

    await client.connect();
    await connectPromise;

    expect(client.connected).toBe(true);
  });

  test('client receives server entries', async () => {
    // Create an entry on the server
    serverInstance.createEntry('test', NTValueType.Boolean, true);

    // Connect the client
    await client.connect();

    // Wait for the entry to be synchronized
    await sleep(500);

    // Check if the client received the entry
    const value = clientInstance.getValue('test');
    expect(value).toBe(true);
  });

  test('client updates propagate to server', async () => {
    // Connect the client
    await client.connect();
    await sleep(100);

    // Create an entry on the client
    clientInstance.createEntry('clientTest', NTValueType.Double, 3.14);

    // Wait for the entry to be synchronized
    await sleep(500);

    // Check if the server received the entry
    const value = serverInstance.getValue('clientTest');
    expect(value).toBe(3.14);
  });

  test('server updates propagate to client', async () => {
    // Connect the client
    await client.connect();
    await sleep(100);

    // Create an entry on the server
    serverInstance.createEntry('serverTest', NTValueType.String, 'hello');

    // Wait for the entry to be synchronized
    await sleep(500);

    // Check if the client received the entry
    expect(clientInstance.getValue('serverTest')).toBe('hello');

    // Update the entry on the server
    serverInstance.setValue('serverTest', 'world');

    // Wait for the update to be synchronized
    await sleep(500);

    // Check if the client received the update
    expect(clientInstance.getValue('serverTest')).toBe('world');
  });

  test('entry deletion propagates', async () => {
    // Create an entry on the server
    serverInstance.createEntry('deleteTest', NTValueType.Boolean, true);

    // Connect the client
    await client.connect();

    // Wait for the entry to be synchronized
    await sleep(500);

    // Check if the client received the entry
    expect(clientInstance.getValue('deleteTest')).toBe(true);

    // Delete the entry on the server
    serverInstance.deleteEntry('deleteTest');

    // Wait for the deletion to be synchronized
    await sleep(500);

    // Check if the entry was deleted on the client
    expect(clientInstance.getValue('deleteTest')).toBeUndefined();
  });

  test('flag changes propagate', async () => {
    // Create an entry on the server
    serverInstance.createEntry('flagTest', NTValueType.Boolean, true);

    // Connect the client
    await client.connect();

    // Wait for the entry to be synchronized
    await sleep(500);

    // Check if the client received the entry
    expect(clientInstance.getFlags('flagTest')).toBe(NTEntryFlags.None);

    // Update the flags on the server
    serverInstance.setFlags('flagTest', NTEntryFlags.Persistent);

    // Wait for the update to be synchronized
    await sleep(500);

    // Check if the client received the flag update
    expect(clientInstance.getFlags('flagTest')).toBe(NTEntryFlags.Persistent);
  });

  test('reconnection works', async () => {
    // Connect the client
    await client.connect();
    await sleep(100);

    // Create an entry on the client
    clientInstance.createEntry('reconnectTest', NTValueType.Double, 3.14);

    // Wait for the entry to be synchronized
    await sleep(500);

    // Check if the server received the entry
    expect(serverInstance.getValue('reconnectTest')).toBe(3.14);

    // Disconnect the client
    client.disconnect();
    await sleep(100);

    // Reconnect the client
    await client.connect();
    await sleep(500);

    // Check if the entry is still there
    expect(clientInstance.getValue('reconnectTest')).toBe(3.14);

    // Update the entry on the server
    serverInstance.setValue('reconnectTest', 2.71);

    // Wait for the update to be synchronized
    await sleep(500);

    // Check if the client received the update
    expect(clientInstance.getValue('reconnectTest')).toBe(2.71);
  });
});
