import React from 'react';
import ReactDOM from 'react-dom';
import BoardColumn from './BoardColumn';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

const middlewares = []
const mockStore = configureStore(middlewares)


it('renders without crashing', () => {
  const initialState = {
    listItems: []
  };
  const store = mockStore(initialState);

  const wrapper = shallow(<BoardColumn store={store}/>);
});

it('populates ul given list of items', () => {
  const initialState = {
    listItems: [{
      status: "backlog",
      message: "message1"
    },{
      status: "backlog",
      message: "message2"
    },{
      status: "backlog",
      message: "message3"
    }]
  };
  const store = mockStore(initialState);

  const wrapper = mount(
    <Router>
      <BoardColumn store={store}/>
    </Router>
    );
  expect(wrapper.find('BoardColumn li')).toHaveLength(3);
  expect(wrapper.find('li').first()).toHaveStyle('fontStyle', 'italic');
  expect(wrapper.contains("message1"));
  expect(wrapper.contains("message2"));
  expect(wrapper.contains("message3"));
});
