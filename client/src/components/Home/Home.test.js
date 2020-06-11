import React from 'react';
import socketIO from 'socket.io-client';
import { render, fireEvent } from '@testing-library/react';
import Home from 'components/Home/Home';
import { Provider } from 'react-redux';
import configureStore from 'store';

const store = configureStore();

jest.useFakeTimers();

jest.mock('react-modal'); // Cant load modal without root app element

/*const mockSocketOn = jest.fn((event, callback) => {
  switch (event) {
    case 'connect':
      console.log('connect', callback);
      callback();
      break;
    default:
      console.log(event, 'not handled');
  }
});*/

const mockSocketOn = jest.fn();
/*jest.mock('utils/socket', () => {
  return {
    __esModule: true,
    connect: jest.fn(() => {
      return {
        on: mockSocketOn,
        emit: jest.fn(),
      };
    }),
  };
});*/

jest.mock('utils/crypto', () => {
  // Need window.crytpo.subtle
  return jest.fn().mockImplementation(() => {
    return {
      createEncryptDecryptKeys: () => {
        return {
          privateKey: 'private',
          publicKey: 'public',
        };
      },
      exportKey: () => {
        return 'exportedkey';
      },
    };
  });
});

jest.mock('socket.io-client', () => {
  return jest.fn(() => {
    return {
      on: mockSocketOn,
      emit: jest.fn(),
    };
  });
});

describe('Home component', () => {
  /*it('Should display', async () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Home
          translations={{}}
          members={[]}
          openModal={() => {}}
          activities={[]}
          match={{ params: { roomId: 'roomTest' } }}
          createUser={() => {}}
          toggleSocketConnected={() => {}}
          receiveEncryptedMessage={() => {}}
          receiveUnencryptedMessage={() => {}}
          scrolledToBottom={true}
          setScrolledToBottom={() => {}}
          iAmOwner={true}
          roomLocked={false}
          userId={'userId'}
          roomId={'testId'}
          sendEncryptedMessage={() => {}}
          sendUnencryptedMessage={() => {}}
          socketConnected={false}
          toggleSoundEnabled={() => {}}
          soundIsEnabled={false}
          faviconCount={0}
          toggleWindowFocus={() => {}}
          closeModal={() => {}}
          publicKey={{}}
          username={'dan'}
        />
      </Provider>,
    );
  
    expect(asFragment()).toMatchSnapshot();
  });*/

  it('Should init things', () => {
    const mockToggleSocketConnected = jest.fn();
    const socket = socketIO();
    console.log(socket);
    socket.on.mockImplementation((event, callback) => {
      switch (event) {
        case 'connect':
          console.log('connect', callback);
          //setTimeout(callback, 100);
          callback();
          break;
        default:
          console.log(event, 'not handled');
      }
    });

    render(
      <Provider store={store}>
        <Home
          translations={{}}
          members={[]}
          openModal={() => {}}
          activities={[]}
          match={{ params: { roomId: 'roomTest' } }}
          createUser={() => {}}
          receiveEncryptedMessage={() => {}}
          receiveUnencryptedMessage={() => {}}
          scrolledToBottom={true}
          setScrolledToBottom={() => {}}
          iAmOwner={true}
          roomLocked={false}
          userId={'userId'}
          roomId={'testId'}
          sendEncryptedMessage={() => {}}
          sendUnencryptedMessage={() => {}}
          socketConnected={false}
          toggleSoundEnabled={() => {}}
          soundIsEnabled={false}
          faviconCount={0}
          toggleWindowFocus={() => {}}
          closeModal={() => {}}
          publicKey={{}}
          username={'alan'}
          toggleSocketConnected={mockToggleSocketConnected}
        />
      </Provider>,
    );
    console.log('sysy');

    jest.runAllTimers();
    jest.advanceTimersByTime(150);
    console.log('wahhh');

    expect(mockToggleSocketConnected).toHaveBeenLastCalledWith(true);
  });

  /*it('Should react to window focus', () => {
    const mockToggleWindowFocus = jest.fn();

    render(
      <Provider store={store}>
        <Home
          translations={{}}
          members={[]}
          openModal={() => {}}
          activities={[]}
          match={{ params: { roomId: 'roomTest' } }}
          createUser={() => {}}
          toggleSocketConnected={() => {}}
          receiveEncryptedMessage={() => {}}
          receiveUnencryptedMessage={() => {}}
          scrolledToBottom={true}
          setScrolledToBottom={() => {}}
          iAmOwner={true}
          roomLocked={false}
          userId={'userId'}
          roomId={'testId'}
          sendEncryptedMessage={() => {}}
          sendUnencryptedMessage={() => {}}
          socketConnected={false}
          toggleSoundEnabled={() => {}}
          soundIsEnabled={false}
          faviconCount={0}
          toggleWindowFocus={mockToggleWindowFocus}
          closeModal={() => {}}
          publicKey={{}}
          username={'alice'}
        />
      </Provider>,
    );
  
    fireEvent.focus(window);

    expect(mockToggleWindowFocus).toHaveBeenCalledWith(true);

    fireEvent.blur(window);

    expect(mockToggleWindowFocus).toHaveBeenCalledTimes(2);
    expect(mockToggleWindowFocus).toHaveBeenCalledWith(false);
  });*/
});
