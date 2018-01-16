import React from 'react';
import { Field, reduxForm } from 'redux-form';

const BoardForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
    <Field name="todoField" component="input" type="text"></Field>
    <button type="submit">submit</button>
    </form>
  );
};

export default reduxForm({ form: "todoForm" })(BoardForm);
