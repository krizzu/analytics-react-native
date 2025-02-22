import { onStoreAction, registerBridgeStore } from '../bridge';
import { createStore } from '../store';

describe('bridge', () => {
  it('should work', async () => {
    const sovran = createStore<{ events: Event[] }>({ events: [] });
    const subscription = jest.fn();
    sovran.subscribe(subscription);

    registerBridgeStore({
      store: sovran,
      actions: {
        ADD_EVENT: (event: unknown) => (state: { events: Event[] }) => {
          return {
            events: [...state.events, event as Event],
          };
        },
      },
    });

    const sampleEvent: Event = {
      id: '1',
      description: 'test',
    };

    const expectedState = {
      events: [sampleEvent],
    };
    ``;

    await onStoreAction('ADD_EVENT', sampleEvent);

    expect(subscription).toHaveBeenCalledWith(expectedState);

    expect(sovran.getState()).toEqual(expectedState);
  });
});
