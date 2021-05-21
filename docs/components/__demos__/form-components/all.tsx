import { message } from 'antd';
import axios from 'axios';
import Mock from 'mockjs';
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
              text: '只读',
              key: 'readonly',
              onClick: () => toggleReadonly((readonly) => !readonly),
            },
            {
              text: '禁用',
              key: 'disabled',
              onClick: () => toggleDisabled((disabled) => !disabled),
            },
            {
              text: '隐藏标签',
              key: 'hideLabel',
              onClick: () => toggleHideLabel((hideLabel) => !hideLabel),
            },
            {
              text: '自动 placeholder',
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

export default App;
