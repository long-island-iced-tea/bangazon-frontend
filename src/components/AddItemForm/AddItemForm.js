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

  render () {
    const {objectModel} = this.props;

    const formInputs = Object.keys(objectModel).map(key => {

      if (key.toLowerCase() === 'id') {
        return null;
      }

      return (
        <div key={key} className="form-group">
          <label htmlFor={key}>{key}</label>
          <input type="text" className="form-control" id={key} required />
        </div>
      );
    });

    return (
      <div className='AddItemForm'>
        {
          this.state.isAdding ? (
            <div className="card">
              <div className="card-body">
                <form>
                  {formInputs}
                  <button className="btn btn-default" type='submit'>Add Item</button>
                </form>
              </div>
            </div>
          ) : (
            null
          )
        }
        <button className="btn" onClick={this.toggleAdding}>
          <i className="fas fa-plus-circle"></i>
        </button>
      </div>
    );
  }
};

export default AddItemForm;
