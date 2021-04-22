import React from 'react';
import Select, { components } from 'react-select';

import classes from './Form.module.scss';

const { Option, SingleValue } = components;

const styles = {
  valueContainer: (provided) => ({
    ...provided,
    minHeight: '45px',
  }),
  option: (provided, state) => {
    return {
      ...provided,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontSize: '.8rem',
      minHeight: '3.5rem',
      backgroundColor: state.isFocused ? '#E1F2EC' : '#fff',
      color: '#20A2A5',
    };
  },
  placeholder: (provided) => {
    return {
      ...provided,
      color: '#AFAFAF',
      fontSize: '1rem',
      top: '30px',
    };
  },
  control: (provided) => ({
    ...provided,
    height: '100%',
    minHeight: '50px',
    border: 'none',
    backgroundColor: '#F6FBF9',
    borderRadius: '10px',
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.05)',
  }),
  menu: (provided) => ({
    ...provided,
    top: 50,
    borderRadius: '0 0 10px 10px',
    border: '1px solid #C3E5D9',
    borderTop: 'none',
    boxShadow: 'none',
  }),
  indicatorSeparator: () => {},
  dropdownIndicator: (defaultStyles) => ({
    ...defaultStyles,
    color: '#20A2A5',
  }),
};

const CustomValueContainer = ({ ...props }) => {
  return (
    <SingleValue {...props}>
      <img src={props.data.icon} alt={props.data.label} width={75} />
    </SingleValue>
  );
};

const IconOption = (props) => (
  <Option {...props}>
    <img src={props.data.icon} alt={props.data.label} width={75} style={{ marginRIght: '10px', display: 'inline-block' }} />
    <span className='ml-2'>{props.data.label}</span>
  </Option>
);

const CustomSelect = ({ name, label, error, touched, onChange, value, placeholder, options, className }) => {
  return (
    <div className={classes.FormGroup}>
      {label && <label>{label}</label>}
      <Select
        name={name}
        onChange={onChange}
        value={value}
        styles={styles}
        placeholder={placeholder}
        options={options}
        className={className || ''}
        components={{ Option: IconOption, SingleValue: CustomValueContainer }}
        isSearchable={false}
      />
      {error && touched && <span className='error-msg'>{error}</span>}
    </div>
  );
};

export default CustomSelect;
