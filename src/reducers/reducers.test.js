import boardStore from '.';
import { createStore } from 'redux';


it('instantiates', () => {
  createStore(boardStore).getState();
});
