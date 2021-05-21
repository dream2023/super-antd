import React from 'react';

import { SuperForm, SuperProvider, SuperSelect } from 'super-antd';

import axios from './axios-instance';

const Demo = () => {
  return (
    <SuperProvider axios={axios}>
      <SuperForm debug>
        <SuperSelect name="role" label="角色" options="/users" optionsProp={{ labelKey: 'name', valueKey: 'id' }} />
      </SuperForm>
    </SuperProvider>
  );
};

export default Demo;
