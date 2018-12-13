import React from 'react';
import './AddItemForm.css';
import PropTypes from 'prop-types';
import moment from 'moment';

class AddItemForm extends React.Component {

  static propTypes = {
    objectModel: PropTypes.object.isRequired,
    addFunc: PropTypes.func.isRequired
  }

  state = {
    isAdding: false
  }

  toggleAdding = (e) => {
    this.setState({isAdding: !this.state.isAdding});
  }

  // Creates the form inputs based on the object model from props
  formInputs = () => {
    const {objectModel} = this.props;

    return Object.keys(objectModel).map(key => {

      if (key.toLowerCase() === 'id') {
        return null;
      }

      let type = '';

      // Check the type of the value
      switch (typeof objectModel[key]) {

      case 'string':
        type = 'text';
        break;

      case 'number':
        type = 'number';
        break;

      case 'object':
        if (objectModel[key] instanceof moment) {
          type = 'date';
        }
        else if (Array.isArray(objectModel[key])) {
          return (
            <div className="form-group">
              <label htmlFor={key}>{key}</label>
              <select className="custom-select" id={key} onChange={(e) => console.log(e.target.value)}>
              <option></option>
                {
                  objectModel[key].map(o => {
                    return (
                      <option key={o}>
                        {o}
                      </option>
                    );
                  })
                }
              </select>
            </div>
          )
        }
        break;
      case 'boolean':
        return (
          <div key={key} className="form-group">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id={key} />
              <label className="form-check-label" htmlFor={key}>
                {key}
              </label>
            </div>
          </div>
        );

      default:
        break;
      }

      return (
        <div key={key} className="form-group">
          <label htmlFor={key}>{key}</label>
          <input type={type} className="form-control" id={key} />
        </div>
      );
    });
  }

  // Builds an object from the form inputs and then passes the newItem to the addFunc from props.
  postItem = (e) => {

    e.preventDefault();
    const formInputs = e.target.elements;

    const newItem = {};

    [...formInputs].forEach(input => {
      switch (input.type) {
      case 'submit':
        return;
      case 'number':
        newItem[input.id] = input.value * 1;
        break;
      case 'checkbox':
        newItem[input.id] = input.checked;
        break;
      default:
        newItem[input.id] = input.value;
        break;
      }
    });

    this.props.addFunc(newItem);
    this.toggleAdding();
  }

  render () {
    return (
      <div className='AddItemForm'>
        {
          this.state.isAdding ? (
            <div className="item-form card">
              <div className="card-body">
                <form onSubmit={this.postItem}>
                  {this.formInputs()}
                  <button className="btn btn-default float-right" type='submit' >Add Item</button>
                </form>
              </div>
            </div>
          ) : (
            null
          )
        }
        <button className="plus-btn btn btn-outline-primary btn-lg float-right" onClick={this.toggleAdding}>
          <i className="fas fa-plus-circle"></i>
        </button>
      </div>
    );
  }
};

export default AddItemForm;
