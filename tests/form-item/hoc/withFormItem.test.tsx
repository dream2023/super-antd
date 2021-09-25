import { ProFormDependency } from '@ant-design/pro-form';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { FC } from 'react';

import { WithFormItemConfigType, WithFormItemProps, withFormItem } from '@/form-item/src/hoc';
import { SuperForm, SuperInput } from 'super-antd';

describe('withFormItem', () => {
  const Demo: FC<any> = (props) => {
    return <div data-testid="data">{JSON.stringify(props)}</div>;
  };

  const App: FC<WithFormItemConfigType & WithFormItemProps> = ({
    placeholderPrefix,
    needData,
    form = {},
    ...resetProps
  }) => {
    const DemoWithFormItem = withFormItem(Demo, { placeholderPrefix, needData });
    return (
      <SuperForm {...form} initialValues={{ a: '1' }} isResponsive={false}>
        <SuperInput name="a" label="a"></SuperInput>
        <ProFormDependency name={['a']}>
          {(data, form) => <DemoWithFormItem data={data} form={form} {...resetProps} />}
        </ProFormDependency>
      </SuperForm>
    );
  };
  const setUp = (options: WithFormItemConfigType & WithFormItemProps, form?: any) =>
    render(<App form={form} {...options} />);
  const toBe = (data: any) => {
    const text = screen.getByTestId('data').textContent;
    expect(JSON.parse(text || '{}')).toEqual({ label: ' ', colon: false, ...data });
  };
  test('组件自身的属性需要透传', () => {
    setUp({ foo: 'bar' });
    toBe({ foo: 'bar' });
  });

  describe('labelCol', () => {
    const res = { labelCol: { span: 5 } };
    test('labelCol 支持数字', () => {
      setUp({ labelCol: 5 });
      toBe(res);
    });
    test('labelCol 支持字符串', () => {
      setUp({ labelCol: '5' });
      toBe({ labelCol: { span: '5' } });
    });
    test('labelCol 支持对象', () => {
      setUp(res);
      toBe(res);
    });
  });

  describe('wrapperCol', () => {
    const res = { wrapperCol: { span: 5 } };
    test('wrapperCol 支持数字', () => {
      setUp({ wrapperCol: 5 });
      toBe(res);
    });
    test('wrapperCol 支持字符串', () => {
      setUp({ wrapperCol: '5' });
      toBe({ wrapperCol: { span: '5' } });
    });
    test('wrapperCol 支持对象', () => {
      setUp(res);
      toBe(res);
    });
  });

  describe('name', () => {
    const res = { name: ['info', 'name'] };
    test('name 支持字符串', () => {
      setUp({ name: 'info.name' });
      toBe(res);
    });

    test('name 支持数组', () => {
      setUp(res);
      toBe(res);
    });
  });

  describe('label', () => {
    test('当 label 为 undefined 时，自动填充为空格字符串', () => {
      setUp({});
      toBe({ label: ' ' });
    });

    test('当 label 为字符串时，支持模板字符', () => {
      setUp({ label: '{{data.a}}' });
      toBe({ colon: undefined, label: '1', messageVariables: { label: '1' }, placeholder: '1' });
    });
  });

  describe('required', () => {
    test('required 有值', () => {
      setUp({ required: true, requiredOn: (data: any) => Number(data.a) > 1 });
      toBe({ required: true, rules: [{ required: true }] });
    });

    test('required 无值', () => {
      setUp({ requiredOn: (data: any) => Number(data.a) > 1 });
      toBe({ required: false, rules: [{ required: false }] });
    });
  });

  describe('readonly', () => {
    test('readonly 有值且 readonlyOn 有值，显示 readonly 的值', () => {
      setUp({ readonly: true, readonlyOn: (data: any) => Number(data.a) > 1 });
      toBe({ readonly: true });
    });

    test('readonly 无值且 readonlyOn 有值，则显示 readonlyOn 结果', () => {
      setUp({ readonlyOn: (data: any) => Number(data.a) > 1 });
      toBe({ readonly: false });
    });

    test('当 form 的 readonly 为 true 时，则为 true', () => {
      setUp({ readonly: false }, { readonly: true });
      toBe({ readonly: true });
    });
  });

  describe('hidden', () => {
    test('当 visible 为 true 时，hidden 为 false', () => {
      setUp({ visible: true });
      toBe({ hidden: false });
    });

    test('当 visible 为 false 时，hidden 为 true', () => {
      setUp({ visible: false });
      toBe({ hidden: true });
    });

    test('当 visibleOn 返回结果为 true 时，hidden 为 false', () => {
      setUp({ visibleOn: '{{data.a}}' });
      toBe({ hidden: false });
    });

    test('当 visibleOn 返回结果为 false 时，hidden 为 true', () => {
      setUp({ visibleOn: '{{Number(data.a) > 3}}' });
      toBe({ hidden: true });
    });

    test('当 hidden 为 boolean 时, 值应和其相同', () => {
      setUp({ hidden: true });
      toBe({ hidden: true });
    });

    test('当 hidden 和 visible 同时存在时, 以 hidden 为准', () => {
      setUp({ hidden: true, visible: true });
      toBe({ hidden: true });
    });

    test('当 hidden 支持联动', () => {
      setUp({
        hiddenOn: (data: any) => Number(data.a) > 3,
      });
      toBe({ hidden: false });
    });
  });

  describe('disabled', () => {
    test('当 active 为 true 时，disabled 为 false', () => {
      setUp({ active: true });
      toBe({ disabled: false });
    });

    test('当 active 为 false 时，disabled 为 true', () => {
      setUp({ active: false });
      toBe({ disabled: true });
    });

    test('当 activeOn 返回结果为 true 时，disabled 为 false', () => {
      setUp({ activeOn: '{{data.a}}' });
      toBe({ disabled: false });
    });

    test('当 activeOn 返回结果为 false 时，disabled 为 true', () => {
      setUp({ activeOn: '{{Number(data.a) > 3}}' });
      toBe({ disabled: true });
    });

    test('当 disabled 为 boolean 时, 值应和其相同', () => {
      setUp({ disabled: true });
      toBe({ disabled: true });
    });

    test('当 disabled 和 active 同时存在时, 以 disabled 为准', () => {
      setUp({ disabled: true, active: true });
      toBe({ disabled: true });
    });

    test('当 disabled 支持联动', () => {
      setUp({ disabledOn: (data: any) => Number(data.a) > 3 });
      toBe({ disabled: false });
    });

    test('当 form 的 disabled 为 true 时，则为 true', () => {
      setUp({ disabled: false }, { disabled: true });
      toBe({ disabled: true });
    });
  });

  describe('placeholder', () => {
    test('当 placeholder 为 ReactNode 时，应直接返回', () => {
      setUp({ placeholder: <div>123</div> });
      toBe({ placeholder: JSON.parse(JSON.stringify(<div>123</div>)) });
    });

    test('当 placeholder 为 undefined 时，应自动填充', () => {
      setUp({ label: 'b', placeholderPrefix: 'please input ' });
      toBe({ label: 'b', colon: undefined, messageVariables: { label: 'b' }, placeholder: 'please input b' });
    });

    test('当 placeholder 为 undefined 时，应自动填充', () => {
      setUp({ label: 'b', placeholderPrefix: 'please input ' });
      toBe({ label: 'b', colon: undefined, messageVariables: { label: 'b' }, placeholder: 'please input b' });
    });

    test('当 placeholder 为字符串，应编译模板字符串时', () => {
      setUp({ placeholder: 'hello {{data.a}}' });
      toBe({ placeholder: 'hello 1' });
    });
  });

  test('校检融合必填', () => {
    setUp({ required: true, rules: [{ type: 'number', message: 'test' }] });
    toBe({ required: true, rules: [{ type: 'number', message: 'test' }, { required: true }] });
  });

  test('当 needData 为 true 时，会传递 data 和 form 属性', () => {
    setUp({ needData: true });
    toBe({ data: { a: '1' }, form: expect.any(Object) });
  });

  describe('联动对值的影响', () => {
    test('clearValueAfterReadonly', async () => {
      setUp({
        name: 'a',
        needData: true,
        clearValueAfterReadonly: true,
        readonlyOn: (data: any) => Number(data.a) >= 2,
      });
      await waitFor(() => {
        expect(screen.getByLabelText('a')).toHaveValue('1');
        toBe({ name: 'a', readonly: false, data: { a: '1' }, form: expect.any(Object) });
      });
      userEvent.type(screen.getByLabelText('a'), '2');
      toBe({ name: 'a', readonly: false, data: {}, form: expect.any(Object) });
    });
    test('clearValueAfterHidden', async () => {
      setUp({ name: 'a', needData: true, clearValueAfterHidden: true, hiddenOn: (data: any) => Number(data.a) >= 2 });
      await waitFor(() => {
        expect(screen.getByLabelText('a')).toHaveValue('1');
        toBe({ name: 'a', hidden: false, data: { a: '1' }, form: expect.any(Object) });
      });
      userEvent.type(screen.getByLabelText('a'), '2');
      toBe({ name: 'a', hidden: false, data: {}, form: expect.any(Object) });
    });
    test('clearValueAfterDisabled', async () => {
      setUp({
        name: 'a',
        needData: true,
        clearValueAfterDisabled: true,
        disabledOn: (data: any) => Number(data.a) >= 2,
      });
      await waitFor(() => {
        expect(screen.getByLabelText('a')).toHaveValue('1');
        toBe({ name: 'a', disabled: false, data: { a: '1' }, form: expect.any(Object) });
      });
      userEvent.type(screen.getByLabelText('a'), '2');
      toBe({ name: 'a', disabled: false, data: {}, form: expect.any(Object) });
    });
  });

  describe('computed 计算属性', () => {
    test('当设置了 computed 属性，值应该跟着计算属性变化', async () => {
      const { container } = render(
        <SuperForm debug>
          <SuperInput name="a" label="a"></SuperInput>
          <SuperInput name="b" label="b" linkageFields="a" computed={({ a }) => a + 'b'}></SuperInput>
        </SuperForm>,
      );

      // readonly 模式
      expect(screen.getByText(/\-/i)).toBeInTheDocument();

      userEvent.type(screen.getByLabelText('a'), '1');
      await waitFor(() => {
        const text = (container.querySelector('.super-form-debugger') as Element).textContent;
        expect(JSON.parse(text || '{}')).toEqual({ a: '1', b: '1b' });
      });
    });
  });
});
