import React from 'react';
import './AddItemForm.css';
import PropTypes from 'prop-types';

class AddItemForm extends React.Component {

  static propTypes = {
    objectModel: PropTypes.object.isRequired,
    addFunc: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='AddItemForm'>

      </div>
    );
  }
};

export default AddItemForm;
