import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { withRouter } from 'react-router-dom';


const BoardItem = (props) => {
  return(
    <li className="boardItem" onClick={props.onClick}
    style={ {
      textDecoration: props.item.status === 'finished' ? 'line-through' : 'none',
      fontStyle: props.item.status === 'backlog' ? 'italic' : 'normal',
    }}
    >{props.item.message}</li>
  );
}

function BoardList (props) {
    return (
      <div className="column">
        <ul>
          {props.listItems.filter((item) => '/' + item.status === props.match.path).map((item, id) => (
            <BoardItem key={id} onClick={props.todoOnClick} item={item} />
          ))}
        </ul>
      </div>
    );
}
const mapStateToProps = (state) => {
  return {
    listItems: state.listItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const BoardColumn = withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardList));

export default BoardColumn;
