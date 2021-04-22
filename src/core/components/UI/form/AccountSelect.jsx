import React from 'react';
import Select, { components } from 'react-select';

import classes from './Form.module.scss';

const { Option, SingleValue } = components;

const styles = {
  valueContainer: (provided) => ({
    ...provided,
    minHeight: '45px',
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  option: (provided, state) => {
    return {
      ...provided,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '.9rem',
      minHeight: '3.5rem',
      backgroundColor: state.isFocused ? '#E1F2EC' : '#fff',
      color: '#20A2A5',
      padding: '5px 10px',
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
      <div className='flex items-center'>
        <p className='font-bold mr-2'>{props.data.currency}</p>
        <span className='ml-2 text-sm'>
          <span style={{ color: '#959595' }}>{props.data.account}</span>
          <img src={props.data.icon} alt={props.data.label} width={55} style={{ marginLeft: '10px', display: 'inline-block' }} />
        </span>
      </div>
    </SingleValue>
  );
};

const IconOption = (props) => (
  <Option {...props}>
    <div className='flex items-center'>
      <p className='font-bold mr-2'>{props.data.currency}</p>
      <span className='ml-2 text-sm'>
        <span style={{ color: '#959595' }}>{props.data.account}</span> - {props.data.alias.substring(0, 15)}...
      </span>
    </div>
    <img src={props.data.icon} alt={props.data.label} width={70} style={{ marginRight: '10px', display: 'inline-block' }} />
  </Option>
);

const AccountSelect = ({ name, label, error, touched, onChange, value, placeholder, options, className }) => {
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
        noOptionsMessage={() => 'No tienes cuentas agregadas'}
      />
      {error && touched && <span className='error-msg'>{error}</span>}
    </div>
  );
};

export default AccountSelect;
