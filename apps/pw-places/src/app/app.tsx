import { LoadingScreen, MapScreen, Place } from './screens';
import { GlobalStyle, theme } from './styles';
import { useEffect } from 'react';
import { applyCursor } from './utils';
import { ASSETS } from './constants';
import { ThemeProvider } from 'styled-components';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { SCREENS_ENUM, setScreen } from './store/reducers';
import { placeSelector, screenSelector } from './store/selectors';

const { LOADING, MAP, PLACE } = SCREENS_ENUM;

const screen = {
  [LOADING]: <LoadingScreen />,
  [MAP]: <MapScreen />,
  [PLACE]: <Place />,
};

export function App() {
  const dispatch = useDispatch();
  const { value: currentScreen } = useSelector(screenSelector);
  const { id: placeId } = useSelector(placeSelector);

  useEffect(() => {
    applyCursor('body', `${ASSETS}/normal.ani`).then(() => {
      console.log('Cursor loaded');
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setScreen(MAP));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  useEffect(() => {
    if (placeId) {
      dispatch(setScreen(PLACE));
    }
  }, [placeId, dispatch]);

  return (
    <>
      <GlobalStyle />
      {screen[currentScreen]}
    </>
  );
}

export default function () {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
}
