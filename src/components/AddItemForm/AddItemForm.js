import React from 'react';
import './AddItemForm.css';
import PropTypes from 'prop-types';

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
  }

  render () {
    const {objectModel} = this.props;

    const formInputs = Object.keys(objectModel).map(key => {

      if (key.toLowerCase() === 'id') {
        return null;
      }

      let type = '';

      switch (typeof objectModel[key]) {

      case 'string':
        type = 'text';
        break;

      case 'number':
        type = 'number';
        break;

      case 'boolean':
        return (
          <div key={key} class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id={key} />
              <label class="form-check-label" for={key}>
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
          <input type={type} className="form-control" id={key} required />
        </div>
      );
    });

    return (
      <div className='AddItemForm'>
        {
          this.state.isAdding ? (
            <div className="item-form card">
              <div className="card-body">
                <form onSubmit={this.postItem}>
                  {formInputs}
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
