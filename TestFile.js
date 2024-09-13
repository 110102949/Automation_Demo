// MyComponent.test.js

import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './MyComponent';

// Undefined variable
test('renders without crashing', () => {
  const x = undefined;
  ReactDOM.render(<MyComponent />, document.getElementById('root'));
});

// Type error
test('handles props correctly', () => {
  const props = 'hello'; // should be an object
  const wrapper = shallow(<MyComponent {...props} />);
});

// Null pointer exception
test('handles null props', () => {
  const props = null;
  const wrapper = shallow(<MyComponent {...props} />);
  console.log(wrapper.props.name); // null pointer exception
});

// Deeply nested conditional statement
test('handles complex logic', () => {
  if (true) {
    if (false) {
      if (true) {
        // do something
      }
    }
  }
});

// Duplicate code
test('renders correctly', () => {
  const wrapper = shallow(<MyComponent />);
  expect(wrapper.find('div').length).toBe(1);
});

test('renders correctly again', () => {
  const wrapper = shallow(<MyComponent />);
  expect(wrapper.find('div').length).toBe(1); // duplicate code
});

// Insecure deserialization
test('handles user input', () => {
  const userInput = '{"__proto__": {"isAdmin": true}}';
  const obj = JSON.parse(userInput);
});
