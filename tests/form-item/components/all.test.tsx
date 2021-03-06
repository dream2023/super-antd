import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

import {
  SuperCaptcha,
  SuperCheckbox,
  SuperCheckboxGroup,
  SuperColor,
  SuperDate,
  SuperDateRange,
  SuperDateTime,
  SuperDateTimeRange,
  SuperEmail,
  SuperForm,
  SuperGroup,
  SuperImageUploader,
  SuperInput,
  SuperMonth,
  SuperNumber,
  SuperPassword,
  SuperProvider,
  SuperQuarter,
  SuperRadioButton,
  SuperRadioGroup,
  SuperRate,
  SuperSearchSelect,
  SuperSelect,
  SuperSlider,
  SuperSwitch,
  SuperTextArea,
  SuperTime,
  SuperTimeRange,
  SuperUploadButton,
  SuperUploadDragger,
  SuperUrl,
  SuperWeek,
  SuperYear,
} from 'super-antd';

describe('all form-item components', () => {
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
  const App = () => {
    const [readonly, toggleReadonly] = useState(false);
    const [disabled, toggleDisabled] = useState(false);
    const [hideLabel, toggleHideLabel] = useState(false);
    const [autoPlaceholder, toggleAutoPlaceholder] = useState(true);
    return (
      <SuperProvider axios={axios}>
        <SuperForm
          isResponsive={false}
          layout="vertical"
          readonly={readonly}
          disabled={disabled}
          onFinish={(data: any) => {
            return new Promise((resolve) => {
              return [];
            });
          }}
          hideLabel={hideLabel}
          autoPlaceholder={autoPlaceholder}
          btns={{
            extraBtns: [
              {
                text: 'readonly',
                key: 'readonly',
                onClick: () => toggleReadonly((readonly) => !readonly),
              },
              {
                text: 'disabled',
                key: 'disabled',
                onClick: () => toggleDisabled((disabled) => !disabled),
              },
              {
                text: 'hideLabel',
                key: 'hideLabel',
                onClick: () => toggleHideLabel((hideLabel) => !hideLabel),
              },
              {
                text: 'autoPlaceholder',
                key: 'autoPlaceholder',
                onClick: () => toggleAutoPlaceholder((autoPlaceholder) => !autoPlaceholder),
              },
            ],
          }}
        >
          <SuperGroup label="????????????">
            <SuperInput name="input" label="SuperInput" />
            <SuperPassword name="password" label="SuperPassword" />
            <SuperUrl name="url" label="SuperUrl" />
            <SuperEmail name="email" label="SuperEmail" />
            <SuperNumber name="number" label="SuperNumber" />
            <SuperTextArea name="textarea" label="SuperTextArea"></SuperTextArea>
            <SuperCaptcha
              phoneName="phone"
              onGetCaptcha={async (phone) => {
                message.success(`????????? ${phone} ?????????????????????!`);
              }}
              name="captcha"
              label="SuperCaptcha"
            />
          </SuperGroup>
          <SuperGroup label="?????????">
            <SuperRadioGroup
              name="radio"
              label="SuperRadioGroup"
              options={[
                {
                  label: '??????1',
                  value: '1',
                },
                {
                  label: '??????2',
                  value: '2',
                },
              ]}
            ></SuperRadioGroup>
            <SuperRadioButton
              name="radio-button"
              label="SuperRadioButton"
              options={[
                {
                  label: '??????1',
                  value: '1',
                },
                {
                  label: '??????2',
                  value: '2',
                },
              ]}
            ></SuperRadioButton>
            <SuperCheckbox name="checkbox" label="SuperCheckbox" text="??????????????????"></SuperCheckbox>
            <SuperCheckboxGroup
              name="checkbox-group"
              label="SuperCheckboxGroup"
              options={[
                { label: '??????', value: 1 },
                { label: '??????', value: 2 },
              ]}
            ></SuperCheckboxGroup>
            <SuperSwitch name="switch" label="SuperSwitch" />
            <SuperSelect
              name="select"
              label="SuperSelect"
              options={[
                { label: '??????', value: 1 },
                { label: '??????', value: 2 },
              ]}
            ></SuperSelect>
            <SuperSearchSelect
              name="select2"
              label="????????????????????? Select"
              request={async ({ keyWords = '' }) => {
                await waitTime(1000);
                return { data: [{ value: '1', label: keyWords }] };
              }}
            />
          </SuperGroup>
          <SuperGroup label="???????????????">
            <SuperTime name="time" label="SuperTime" />
            <SuperDate name="date" label="SuperDate" />
            <SuperWeek name="week" label="SuperWeek" />
            <SuperMonth name="month" label="SuperMonth" />
            <SuperQuarter name="quarter" label="SuperQuarter" />
            <SuperYear name="year" label="SuperYear" />
            <SuperDateTime name="date-time" label="SuperDateTime" />
          </SuperGroup>
          <SuperGroup label="?????????????????????">
            <SuperDateRange name="date-range" label="SuperDateRange" />
            <SuperTimeRange name="time-range" label="SuperTimeRange" />
            <SuperDateTimeRange name="date-time-range" label="SuperDateTimeRange" />
          </SuperGroup>
          <SuperGroup label="??????">
            <SuperUploadButton label="upload" name="upload" action="upload.do" />
            <SuperUploadDragger label="Dragger" name="dragger" action="upload.do" />
          </SuperGroup>
          <SuperGroup label="??????">
            <SuperImageUploader name="image-uploader" label="SuperImageUploader"></SuperImageUploader>
            <SuperRate name="rate" label="SuperRate" />
            <SuperColor name="color" label="SuperColor" />
            <SuperSlider name="slider" label="SuperSlider" />
          </SuperGroup>
        </SuperForm>
      </SuperProvider>
    );
  };

  const originError = console.error;
  beforeAll(() => {
    console.error = () => {};
  });
  afterAll(() => {
    console.error = originError;
  });
  test('show all', () => {
    const wrapper = render(<App />);
    expect(wrapper.container).toMatchSnapshot();
    userEvent.click(wrapper.getByRole('button', { name: /autoPlaceholder/ }));
    expect(wrapper.container).toMatchSnapshot();
    userEvent.click(wrapper.getByRole('button', { name: /hideLabel/ }));
    expect(wrapper.container).toMatchSnapshot();
    userEvent.click(wrapper.getByRole('button', { name: /disabled/ }));
    expect(wrapper.container).toMatchSnapshot();
    userEvent.click(wrapper.getByRole('button', { name: /readonly/ }));
    expect(wrapper.container).toMatchSnapshot();
  });
});
