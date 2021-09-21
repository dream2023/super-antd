import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

import {
  SuperAmap,
  SuperBaiduMap,
  SuperCaptcha,
  SuperCascader,
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
  SuperVideoUploader,
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
    <SuperProvider axios={axios}>
      <SuperForm
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
              const list = Array.from({ length: 10 })
                .map((item, index) => {
                  return {
                    value: index,
                    label: '模板-' + index,
                  };
                })
                .concat({
                  value: keyWords,
                  label: '目标_target',
                });
              return { data: list };
            }}
          />
          <SuperCascader
            name="cascader"
            label="SuperCascader"
            options={[
              {
                value: '广东',
                label: '1',
                children: [
                  {
                    value: '1-1',
                    label: '深圳',
                    children: [
                      {
                        value: '1-1-1',
                        label: '南山',
                      },
                    ],
                  },
                ],
              },
            ]}
          />

          <SuperBaiduMap name="baidu-map" label="百度地图位置选择" />
          <SuperAmap name="amap" label="高德地图位置选择" />
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
          <SuperImageUploader
            name="image-uploader"
            label="SuperImageUploader"
            action="https://www.fastmock.site/mock/32d872e565fbab87ba76057c18f7f8e0/api/upload"
            formatter={(response) => {
              return response.url;
            }}
          />
          <SuperVideoUploader
            name="video-uploader"
            label="SuperVideoUploader"
            action="https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/upload/video"
            formatter={(response) => {
              return response.data.url;
            }}
          />
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
