import React from 'react';
import ReactDOM from 'react-dom';
import BoardForm from './BoardForm';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { reduxForm, reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import 'jest-enzyme';

configure({ adapter: new Adapter() });
const middlewares = []
const mockStore = configureStore(middlewares)

it('renders without crashing', () => {
  const initialState = {
  };
  const store = mockStore(initialState);

  const wrapper = shallow(<BoardForm store={store}/>);
});

it('creates form with todoField in state on mount', () => {
  const store = createStore(combineReducers({ form: formReducer }));
  const TestForm = reduxForm({ form: 'testForm'})(BoardForm);
  const wrapper = mount(
    <Provider store={store}>
      <TestForm/>
    </Provider>
  );
  expect(store.getState().form.testForm.registeredFields).toHaveProperty('todoField');
});

it('call onSave when fom is submitted', () => {
  const store = createStore(combineReducers({ form: formReducer }));
  const TestForm = reduxForm({ form: 'testForm'})(BoardForm);

  let onSave = jest.fn();
  const wrapper = mount(<Provider store={store}>
      <TestForm handleSubmit={onSave} />
    </Provider>
  );
  wrapper.find('form').simulate('submit');
  expect(onSave).toBeCalled();
});
