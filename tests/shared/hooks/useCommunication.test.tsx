import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEventEmitter } from 'ahooks';
import React, { useState } from 'react';

import { CommunicationEventEmitterOptions, CommunicationProps, useCommunication } from 'super-antd';

describe('useCommunication', () => {
  const Demo = ({ myName, targetName, component$ }: { myName?: string; targetName?: string } & CommunicationProps) => {
    const [data, setData] = useState<number[]>([]);
    const { updateTargetData, refreshTarget } = useCommunication({
      component$,
      // 自己的名称
      myName,
      // 刷新自己
      refreshMyself: () => {
        setData([]);
      },
      // 更新数据
      updateMySelfData: (data) => {
        setData(data);
      },
      // 要刷新的目标组件
      refreshTargetName: targetName,
      // 要更新数据的目标组件
      updateTargetName: targetName,
    });

    return (
      <div>
        <ul data-testid={`${myName}-data`}>
          {data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div>
          <button data-testid={`${myName}-add`} onClick={() => setData((data) => [...data, Number(new Date())])}>
            添加数据
          </button>
          <button data-testid={`${myName}-update-${targetName}`} onClick={() => updateTargetData(data)}>
            更新 {targetName} 数据
          </button>
          <button data-testid={`${myName}-refresh-${targetName}`} onClick={() => refreshTarget()}>
            刷新 {targetName}
          </button>
        </div>
      </div>
    );
  };

  const App = () => {
    const component$ = useEventEmitter<CommunicationEventEmitterOptions>();
    return <>
      <Demo component$={component$} myName="a" targetName="b" />
      <Demo component$={component$} myName="b" />
      <Demo component$={component$} myName="c" />
     </>
  }

  test('基础使用', async () => {
    render(<App />);

    // 原始数量
    expect(screen.getByTestId('a-data').childElementCount).toBe(0);
    expect(screen.getByTestId('b-data').childElementCount).toBe(0);
    expect(screen.getByTestId('c-data').childElementCount).toBe(0);

    // 点击，增加 a 一项
    userEvent.click(screen.getByTestId('a-add'));
    // 断言
    expect(screen.getByTestId('a-data').childElementCount).toBe(1);
    expect(screen.getByTestId('b-data').childElementCount).toBe(0);
    expect(screen.getByTestId('c-data').childElementCount).toBe(0);

    // 将 a 的数据同步到 b
    userEvent.click(screen.getByTestId('a-update-b'));

    // 断言，则两者数据应该相等
    expect(screen.getByTestId('a-data').childElementCount).toBe(1);
    expect(screen.getByTestId('b-data').childElementCount).toBe(1);
    expect(screen.getByTestId('c-data').childElementCount).toBe(0);

    // 点击刷新后 b
    userEvent.click(screen.getByTestId('a-refresh-b'));

    // 断言，刷新后，b 为 0
    expect(screen.getByTestId('a-data').childElementCount).toBe(1);
    expect(screen.getByTestId('b-data').childElementCount).toBe(0);
    expect(screen.getByTestId('c-data').childElementCount).toBe(0);
  });

  test('当未设置 target 时，应无变化', () => {
    render(<App />);
    userEvent.click(screen.getByTestId('b-add'));
    expect(screen.getByTestId('a-data').childElementCount).toBe(0);
    expect(screen.getByTestId('b-data').childElementCount).toBe(1);
    expect(screen.getByTestId('c-data').childElementCount).toBe(0);

    // 点击 b
    userEvent.click(screen.getByTestId('b-update-undefined'));

    // 无任何变化
    expect(screen.getByTestId('a-data').childElementCount).toBe(0);
    expect(screen.getByTestId('b-data').childElementCount).toBe(1);
    expect(screen.getByTestId('c-data').childElementCount).toBe(0);
  })

  test('当未设置 component$ 应该报警告', async () => {
    render(
      <>
        <Demo myName="a" targetName="b" />
        <Demo myName="b" targetName="a" />
      </>,
    );
    const errorFn = jest.fn();
    console.warn = errorFn;
    const originalError = console.warn;

    userEvent.click(screen.getByTestId('a-add'));
    userEvent.click(screen.getByTestId('a-update-b'));
    expect(errorFn).toBeCalled();
    console.error = originalError;
  });
});
