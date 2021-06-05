import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { message, Form } from 'antd';
import axios from 'axios';
import mockjs from 'mockjs';
import Mock from 'mockjs';
import React, { FC, useState } from 'react';

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

export const waitTime = (time: number = 100) => {
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
    <SuperProvider axios={axios} mockjs={Mock}>
      <SuperForm
        mock
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
        <SuperGroup label="输入框类">
          <SuperInput name="input" label="SuperInput" />
          <SuperPassword name="password" label="SuperPassword" />
          <SuperUrl name="url" label="SuperUrl" />
          <SuperEmail name="email" label="SuperEmail" />
          <SuperNumber name="number" label="SuperNumber" />
          <SuperTextArea name="textarea" label="SuperTextArea"></SuperTextArea>
          <SuperCaptcha
            phoneName="phone"
            onGetCaptcha={async (phone) => {
              message.success(`手机号 ${phone} 验证码发送成功!`);
            }}
            name="captcha"
            label="SuperCaptcha"
          />
        </SuperGroup>
        <SuperGroup label="选择类">
          <SuperRadioGroup
            name="radio"
            label="SuperRadioGroup"
            options={[
              {
                label: '单选1',
                value: '1',
              },
              {
                label: '单选2',
                value: '2',
              },
            ]}
          ></SuperRadioGroup>
          <SuperRadioButton
            name="radio-button"
            label="SuperRadioButton"
            options={[
              {
                label: '单选1',
                value: '1',
              },
              {
                label: '单选2',
                value: '2',
              },
            ]}
          ></SuperRadioButton>
          <SuperCheckbox name="checkbox" label="SuperCheckbox" text="是否记住密码"></SuperCheckbox>
          <SuperCheckboxGroup
            name="checkbox-group"
            label="SuperCheckboxGroup"
            options={[
              { label: '中国', value: 1 },
              { label: '美国', value: 2 },
            ]}
          ></SuperCheckboxGroup>
          <SuperSwitch name="switch" label="SuperSwitch" />
          <SuperSelect
            name="select"
            label="SuperSelect"
            options={[
              { label: '小猫', value: 1 },
              { label: '小狗', value: 2 },
            ]}
          ></SuperSelect>
          <SuperSearchSelect
            name="select2"
            label="支持搜索查询的 Select"
            request={async ({ keyWords = '' }) => {
              await waitTime(1000);
              const list = Mock.mock({
                'data|1-10': [
                  {
                    value: '@id',
                    label: '@name',
                  },
                ],
              }).data.concat({
                value: keyWords,
                label: '目标_target',
              });
              return list;
            }}
          />
        </SuperGroup>
        <SuperGroup label="时间选择类">
          <SuperTime name="time" label="SuperTime" />
          <SuperDate name="date" label="SuperDate" />
          <SuperWeek name="week" label="SuperWeek" />
          <SuperMonth name="month" label="SuperMonth" />
          <SuperQuarter name="quarter" label="SuperQuarter" />
          <SuperYear name="year" label="SuperYear" />
          <SuperDateTime name="date-time" label="SuperDateTime" />
        </SuperGroup>
        <SuperGroup label="时间范围选择类">
          <SuperDateRange name="date-range" label="SuperDateRange" />
          <SuperTimeRange name="time-range" label="SuperTimeRange" />
          <SuperDateTimeRange name="date-time-range" label="SuperDateTimeRange" />
        </SuperGroup>
        <SuperGroup label="上传">
          <SuperUploadButton label="upload" name="upload" action="upload.do" />
          <SuperUploadDragger label="Dragger" name="dragger" action="upload.do" />
        </SuperGroup>
        <SuperGroup label="其他">
          <SuperRate name="rate" label="SuperRate" />
          <SuperColor name="color" label="SuperColor" />
          <SuperSlider name="slider" label="SuperSlider" />
        </SuperGroup>
      </SuperForm>
    </SuperProvider>
  );
};


describe('all form-item components', () => {
  const originError = console.error
  beforeAll(() => {
    console.error = () => { }
  })
  afterAll(() => {
    console.error = originError
  })
  test('show all', () => {
    const warpper = render(<App />)
    expect(warpper.container).toMatchSnapshot()
    userEvent.click(warpper.getByRole('button', { name: /autoPlaceholder/ }))
    expect(warpper.container).toMatchSnapshot()
    userEvent.click(warpper.getByRole('button', { name: /hideLabel/ }))
    expect(warpper.container).toMatchSnapshot()
    userEvent.click(warpper.getByRole('button', { name: /disabled/ }))
    expect(warpper.container).toMatchSnapshot()
    userEvent.click(warpper.getByRole('button', { name: /readonly/ }))
    expect(warpper.container).toMatchSnapshot()
  })

  describe('default mock', () => {
    const App: FC<{}> = ({ children }) => {
      return <SuperProvider axios={axios} mockjs={mockjs}>
        <SuperForm mock isResponsive={false}>
          {children}
          <Form.Item noStyle shouldUpdate>
            {(form) => (
              <div data-testid="data">{JSON.stringify(form.getFieldsValue())}</div>
            )}
          </Form.Item>
        </SuperForm>
      </SuperProvider>
    }

    const setUp = (Component: any, name: string, props: any = {}) => {
      const res = render(<App>
        <Component name={name} {...props}></Component>
      </App>)

      userEvent.click(screen.getByRole('button', { name: /Mock 数据/ }))
      return res
    }

    const getValue = (name: string) => {
      const text = screen.getByTestId('data').textContent
      const data = JSON.parse(text || '{}')
      return data[name]
    }

    const toBe = (name: string, value: any) => {
      expect(getValue(name)).toEqual(expect.any(value))
    }

    const check = (Component: any, name: string, value: any, props?: any) => {
      setUp(Component, name, props)
      toBe(name, value)
    }

    test('Checkbox is boolean', () => {
      check(SuperCheckbox, 'checkbox', Boolean)
    })

    test('CheckboxGroup is Array', () => {
      const arr = ['a', 'b']
      setUp(SuperCheckboxGroup, 'checkboxgroup', { options: arr })
      expect(arr).toEqual(expect.arrayContaining(getValue('checkboxgroup')))
    })

    test('Color is string', () => {
      check(SuperColor, 'color', String)
    })

    test('Date is string', () => {
      check(SuperDate, 'date', String)
    })

    test('SuperDateRange is [number, number]', () => {
      setUp(SuperDateRange, 'dateRange')
      const val = getValue('dateRange')
      expect(val).toEqual(expect.any(Array))
      expect(val).toHaveLength(2)
      expect(val[0]).toEqual(expect.any(Number))
      expect(val[1]).toEqual(expect.any(Number))
    })

    test('DateTime is string', () => {
      check(SuperDateTime, 'DateTime', String)
    })

    test('SuperDateTimeRange is [number, number]', () => {
      setUp(SuperDateTimeRange, 'SuperDateTimeRange')
      const val = getValue('SuperDateTimeRange')
      expect(val).toEqual(expect.any(Array))
      expect(val).toHaveLength(2)
      expect(val[0]).toEqual(expect.any(Number))
      expect(val[1]).toEqual(expect.any(Number))
    })

    test('SuperMonth is string', () => {
      check(SuperMonth, 'SuperMonth', String)
    })

    test('SuperNumber is number', () => {
      check(SuperNumber, 'SuperNumber', Number)
    })

    test('SuperPassword is string', () => {
      check(SuperPassword, 'SuperPassword', String)
    })

    test('SuperQuarter is string', () => {
      check(SuperQuarter, 'SuperQuarter', String)
    })

    test('SuperRadioButton is one of options', () => {
      const arr = ['a', 'b']
      setUp(SuperRadioButton, 'SuperRadioButton', { options: arr })
      expect(arr).toContain(getValue('SuperRadioButton'))
    })

    test('SuperRadioGroup is one of options', () => {
      const arr = ['a', 'b']
      setUp(SuperRadioGroup, 'SuperRadioGroup', { options: arr })
      expect(arr).toContain(getValue('SuperRadioGroup'))
    })

    test('SuperRate is number', () => {
      check(SuperRate, 'SuperRate', Number)
      expect(getValue('SuperRate')).toBeLessThanOrEqual(5)
      expect(getValue('SuperRate')).toBeGreaterThanOrEqual(0)
    })

    test('SuperRate set count prop', () => {
      check(SuperRate, 'SuperRate', Number, { fieldProps: { count: 10 } })
      expect(getValue('SuperRate')).toBeLessThanOrEqual(10)
      expect(getValue('SuperRate')).toBeGreaterThanOrEqual(0)
    })

    test('SuperSelect is one of options', () => {
      const arr = ['a', 'b']
      setUp(SuperSelect, 'SuperSelect', { options: arr })
      expect(arr).toContain(getValue('SuperSelect'))
    })

    test('when SuperSelect mode is "multiple"', () => {
      const arr = ['a', 'b']
      setUp(SuperSelect, 'SuperSelect', { options: arr, fieldProps: { mode: 'multiple' } })
      expect(arr).toEqual(expect.arrayContaining(getValue('SuperSelect')))
    })

    test('when SuperSelect mode is "tags"', () => {
      const arr = ['a', 'b']
      setUp(SuperSelect, 'SuperSelect', { options: arr, fieldProps: { mode: 'tags' } })
      expect(arr).toEqual(expect.arrayContaining(getValue('SuperSelect')))
    })

    test('SuperSlider is number', () => {
      check(SuperSlider, 'SuperSlider', Number, { min: 1, max: 5 })
      expect(getValue('SuperSlider')).toBeLessThanOrEqual(5)
      expect(getValue('SuperSlider')).toBeGreaterThanOrEqual(1)
    })

    test('SuperSwitch is boolean', () => {
      check(SuperSwitch, 'SuperSwitch', Boolean)
    })

    test('SuperInput is string', () => {
      check(SuperInput, 'SuperInput', String)
    })

    test('SuperEmail is string', () => {
      check(SuperEmail, 'SuperEmail', String)
    })

    test('SuperUrl is string', () => {
      check(SuperUrl, 'SuperUrl', String)
    })

    test('SuperTextArea is string', () => {
      check(SuperTextArea, 'SuperTextArea', String)
    })

    test('SuperTime is string', () => {
      check(SuperTime, 'SuperTime', String)
    })

    test('SuperWeek is string', () => {
      check(SuperWeek, 'SuperWeek', String)
    })

    test('SuperYear is string', () => {
      check(SuperYear, 'SuperYear', String)
    })
  })
});