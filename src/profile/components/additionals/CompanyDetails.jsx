import React from 'react';
import { Edit } from 'react-feather';

const CompanyDetails = ({ profile, onEdit }) => (
  <>
    <div className='flex items-center justify-between mt-10'>
      <h3>Datos básicos</h3>
      <button className='flex items-center' type='button' onClick={() => onEdit('company')}>
        Editar datos <Edit className='ml-2' size={20} />
      </button>
    </div>
    <hr />
    <div className='flex items-center justify-between mt-4'>
      <div>
        <h4>Nombre de la empresa</h4>
        <p>{profile.razon_social}</p>
      </div>
      <div>
        <h4>RUC</h4>
        <p>{profile.ruc}</p>
      </div>
    </div>
    <div className='my-4'>
      <h4>Dirección fiscal</h4>
      <p>{profile.address}</p>
    </div>
    <h3 className='mt-8'>Representante legal</h3>
    <hr />
    <div className='flex items-center justify-between mt-4'>
      <div>
        <h4>Nombre completo</h4>
        <p>{`${profile.first_name} ${profile.last_name}`}</p>
      </div>
      <div>
        <h4>Documento de identidad</h4>
        <p>{`${profile.document_type} ${profile.document_identification}`}</p>
      </div>
    </div>
  </>
);

export default CompanyDetails;
