import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

import { SuperCheckbox, SuperForm, SuperInput, SuperProvider } from 'super-antd';

describe('SuperForm 表单', () => {
  describe('渲染', () => {
    test('正常渲染', () => {
      const wrapper = render(<SuperForm isResponsive={false}></SuperForm>);
      expect(wrapper.container.querySelector('.ant-form')).toBeInTheDocument();
      expect(wrapper.queryAllByRole('button', { hidden: false })).toHaveLength(2);
    });

    test('渲染表单项', () => {
      const wrapper = render(
        <SuperForm isResponsive={false}>
          <SuperInput name="name" label="姓名"></SuperInput>
          <SuperCheckbox name="remember" text="Remember me"></SuperCheckbox>
        </SuperForm>,
      );
      expect(wrapper.container).toBeInTheDocument();
      expect(wrapper.container.querySelectorAll('.ant-form-item').length).toBe(3);
      expect(wrapper.container.querySelector('.ant-form-item-control-input')).not.toBeNull();
      expect(wrapper.container.querySelector('.ant-checkbox')).not.toBeNull();
    });

    test('原属性正确渲染', () => {
      const fn = jest.fn();
      const wrapper = render(
        <SuperForm isResponsive={false} initialValues={{ username: 'jack' }} onValuesChange={fn} layout="vertical">
          <SuperInput name="username" label="姓名"></SuperInput>
        </SuperForm>,
      );
      expect(screen.getByLabelText('姓名')).toHaveValue('jack');
      expect(wrapper.container.querySelector('.ant-form-vertical')).not.toBeNull();
      userEvent.type(screen.getByRole('textbox'), 'a');
      expect(fn).toBeCalled();
    });
  });

  describe('按钮显示相关', () => {
    test('默认显示提交、重置两个按钮', () => {
      render(<SuperForm isResponsive={false}></SuperForm>);
      expect(screen.queryAllByRole('button').length).toBe(2);
      expect(screen.getByText(/提 交/i)).not.toBeNull();
      expect(screen.getByText(/重 置/i)).not.toBeNull();
    });

    test('设置 false 去掉提交按钮', () => {
      render(<SuperForm isResponsive={false} btns={{ submitBtn: false }}></SuperForm>);
      expect(screen.queryByText(/提 交/i)).toBeNull();
    });

    test('设置空字符串去掉提交按钮', () => {
      render(<SuperForm isResponsive={false} btns={{ submitBtn: '' }}></SuperForm>);
      expect(screen.queryByText(/提 交/i)).toBeNull();
    });

    test('设置 false 去掉重置按钮', () => {
      render(<SuperForm isResponsive={false} btns={{ resetBtn: false }}></SuperForm>);
      expect(screen.queryByText(/重 置/i)).toBeNull();
    });

    test('设置空字符串去掉重置按钮', () => {
      render(<SuperForm isResponsive={false} btns={{ resetBtn: '' }}></SuperForm>);
      expect(screen.queryByText(/重 置/i)).toBeNull();
    });

    test('设置 true 显示取消按钮', async () => {
      render(<SuperForm isResponsive={false} btns={{ cancelBtn: true }}></SuperForm>);
      expect(screen.getByRole('button', { name: '取 消' })).toBeInTheDocument();
    });

    test('设置 字符串 显示取消按钮', async () => {
      render(<SuperForm isResponsive={false} btns={{ cancelBtn: 'cancel' }}></SuperForm>);
      expect(screen.getByRole('button', { name: 'cancel' })).toBeInTheDocument();
    });

    test('extraBtns 更多按钮', () => {
      const moreFn = jest.fn();
      render(
        <SuperForm
          isResponsive={false}
          btns={{
            extraBtns: [
              <Button key="more" onClick={moreFn}>
                更多
              </Button>,
            ],
          }}
        ></SuperForm>,
      );

      userEvent.click(screen.getByRole('button', { name: '更 多' }));
      expect(moreFn).toBeCalled();
    });

    test('仅显示自定义按钮 btns', async () => {
      const fn = jest.fn();
      const wrapper = render(
        <SuperForm
          isResponsive={false}
          initialValues={{ name: 'foo' }}
          btns={{
            render: (data, btns) => {
              fn(data, btns);
              return <Button key="custom">custom</Button>;
            },
          }}
        >
          <SuperInput name="name"></SuperInput>
        </SuperForm>,
      );

      expect(wrapper.container.querySelectorAll('.ant-btn').length).toBe(1);
      expect(screen.getByText(/custom/i)).not.toBeNull();
      await waitFor(() => {
        expect(fn).toBeCalledWith({ name: 'foo' }, expect.any(Object));
      });
    });

    test('当内置 btns 不显示时，返回 render 函数接受为 null', () => {
      const fn = jest.fn();
      render(
        <SuperForm
          isResponsive={false}
          btns={{
            submitBtn: false,
            resetBtn: false,
            render: (data, btns) => {
              fn(btns);
              return null;
            },
          }}
        ></SuperForm>,
      );

      expect(fn).toBeCalledWith(undefined);
    });
  });

  describe('按钮文本', () => {
    test('修改提交按钮文本', () => {
      render(<SuperForm isResponsive={false} btns={{ submitBtn: 'submit' }}></SuperForm>);
      expect(screen.getByText('submit')).not.toBeNull();
    });

    test('修改重置按钮文本', () => {
      render(<SuperForm isResponsive={false} btns={{ resetBtn: 'reset' }}></SuperForm>);
      expect(screen.getByText('reset')).not.toBeNull();
    });

    test('修改取消按钮文本', async () => {
      render(<SuperForm isResponsive={false} btns={{ cancelBtn: 'cancel' }}></SuperForm>);
      expect(screen.getByRole('button', { name: 'cancel' })).toBeInTheDocument();
    });
  });

  describe('submitBtn 提交按钮事件', () => {
    test('触发 onFinish 函数', async () => {
      const onFinish = jest.fn();
      render(
        <SuperForm isResponsive={false} initialValues={{ name: 'jack' }} onFinish={onFinish}>
          <SuperInput name="name" label="姓名"></SuperInput>
        </SuperForm>,
      );
      userEvent.click(screen.getByText(/提 交/i));
      await waitFor(() => expect(onFinish).toBeCalledWith({ name: 'jack' }));
    });

    test('接口提交', async () => {
      const fn = jest.fn();

      const wrapper = render(
        <SuperProvider axios={axios}>
          <SuperForm isResponsive={false} api={fn} initialValues={{ name: 'jack' }}>
            <SuperInput name="name" label="姓名"></SuperInput>
          </SuperForm>
        </SuperProvider>,
      );

      // 未请求时
      expect(wrapper.container.querySelector('.ant-spin-spinning')).toBeNull();
      userEvent.click(screen.getByText(/提 交/i));

      await waitFor(() => {
        expect(fn).toBeCalled();
        expect(screen.queryByText('保存成功')).toBeInTheDocument();
      });

      await waitFor(() => {
        // 请求结束
        expect(wrapper.container.querySelector('.ant-spin-spinning')).toBeNull();
      });
    });

    // test('提交数据后，有报错', async () => {
    //   const wrapper = render(
    //     <SuperProvider axios={axios}>
    //       <SuperForm
    //         isResponsive={false}
    //         api={() => Promise.reject({ errors: { name: 'name is error' } })}
    //       >
    //         <SuperInput name="name" label="姓名"></SuperInput>
    //       </SuperForm>
    //     </SuperProvider>
    //   );

    //   userEvent.click(screen.getByText(/提 交/i));

    //   await waitFor(() => {
    //     expect(wrapper.getByText('name is error')).toBeInTheDocument()
    //   });
    // })

    test('提交后重置表单', async () => {
      render(
        <SuperForm isResponsive={false} resetAfterSubmit>
          <SuperInput name="name" label="姓名"></SuperInput>
        </SuperForm>,
      );
      userEvent.type(screen.getByRole('textbox'), 'a');
      expect(screen.getByRole('textbox')).toHaveValue('a');
      userEvent.click(screen.getByText(/提 交/i));

      await waitFor(() => {
        expect(screen.getByRole('textbox')).not.toHaveValue();
      });
    });

    test('提交后跳转', async () => {
      const open = jest.fn();
      const originOpen = window.open;
      window.open = open;

      render(<SuperForm isResponsive={false} redirect="https://www.baidu.com"></SuperForm>);
      userEvent.click(screen.getByText(/提 交/i));
      await waitFor(() => {
        expect(open).toBeCalled();
      });
      window.open = originOpen;
    });

    test('提交数据包含远程数据', async () => {
      const onFinish = jest.fn();
      const wrapper = render(
        <SuperProvider axios={axios}>
          <SuperForm
            isResponsive={false}
            initialValues={{ name: 'a' }}
            onFinish={onFinish}
            preserveRemoteData
            initApi={() => ({ id: 1 })}
          >
            <SuperInput name="name"></SuperInput>
          </SuperForm>
        </SuperProvider>,
      );
      await waitFor(() => {
        expect(wrapper.container.querySelector('.ant-spin-nested-loading')).not.toBeNull();
      });
      userEvent.click(screen.getByText(/提 交/i));
      await waitFor(() => {
        expect(onFinish).toBeCalledWith({ name: 'a', id: 1 });
      });
    });
  });

  describe('按钮事件', () => {
    test('点击重置按钮', async () => {
      const onReset = jest.fn();
      render(
        <SuperForm
          isResponsive={false}
          btns={{
            onReset,
          }}
        >
          <SuperInput name="name" label="姓名"></SuperInput>
        </SuperForm>,
      );
      userEvent.type(screen.getByRole('textbox'), 'a');
      expect(screen.getByRole('textbox')).toHaveValue('a');
      userEvent.click(screen.getByText(/重 置/i));

      await waitFor(() => {
        expect(onReset).toBeCalled();
        expect(screen.getByRole('textbox')).not.toHaveValue();
      });
    });

    test('点击取消按钮', async () => {
      const onCancel = jest.fn();
      render(
        <SuperForm
          isResponsive={false}
          btns={{
            cancelBtn: true,
            onCancel,
          }}
        ></SuperForm>,
      );
      userEvent.click(screen.getByText(/取 消/i));
      await waitFor(() => {
        expect(onCancel).toBeCalled();
      });
    });

    test('extraBtns 按钮点击', async () => {
      const onExtraBtnClick = jest.fn();
      render(
        <SuperForm
          isResponsive={false}
          btns={{
            extraBtns: [
              <Button onClick={onExtraBtnClick} key="extra">
                extraBtn
              </Button>,
            ],
          }}
        ></SuperForm>,
      );
      userEvent.click(screen.getByText(/extraBtn/));
      await waitFor(() => {
        expect(onExtraBtnClick).toBeCalled();
      });
    });

    test('btns 按钮点击', async () => {
      const onExtraBtnClick = jest.fn();
      render(
        <SuperForm
          isResponsive={false}
          btns={{
            render: () => [
              <Button onClick={onExtraBtnClick} key="extra">
                extraBtn
              </Button>,
            ],
          }}
        ></SuperForm>,
      );
      userEvent.click(screen.getByText(/extraBtn/));
      await waitFor(() => {
        expect(onExtraBtnClick).toBeCalled();
      });
    });
  });

  describe('col 增强', () => {
    test('labelCol & wrapperCol 支持数字', () => {
      const wrapper = render(
        <SuperForm isResponsive={false} labelCol={4} wrapperCol={20}>
          <SuperInput name="username" label="姓名"></SuperInput>
        </SuperForm>,
      );
      expect(wrapper.container.querySelector('.ant-col-4.ant-form-item-label')).toBeInTheDocument();
      expect(wrapper.container.querySelector('.ant-col-20.ant-form-item-control')).toBeInTheDocument();
    });
  });

  describe('持久化数据', () => {
    test('基本使用', async () => {
      const submitFn = jest.fn();
      const Demo = () => {
        const [visible, setVisible] = useState(true);
        return (
          <>
            <Button onClick={() => setVisible((state) => !state)}>切换</Button>
            {visible && (
              <SuperForm isResponsive={false} persistData name="form" onFinish={submitFn}>
                <SuperInput name="username" label="姓名"></SuperInput>
              </SuperForm>
            )}
          </>
        );
      };

      render(<Demo></Demo>);
      userEvent.type(screen.getByRole('textbox'), 'a');
      await waitFor(() => {
        expect(JSON.parse(localStorage.getItem('form') || '{}')).toEqual({
          username: 'a',
        });
      });

      // 隐藏后重新显示
      userEvent.click(screen.getByRole('button', { name: '切 换' }));
      expect(screen.queryByRole('textbox')).toBeNull();
      userEvent.click(screen.getByRole('button', { name: '切 换' }));
      await waitFor(() => {
        expect(JSON.parse(localStorage.getItem('form') || '{}')).toEqual({
          username: 'a',
        });
      });
    });

    test('提交后清空持久化的数据', async () => {
      const submitFn = jest.fn();
      render(
        <SuperForm name="test-form" isResponsive={false} persistData clearPersistDataAfterSubmit onFinish={submitFn}>
          <SuperInput name="username" label="姓名"></SuperInput>
        </SuperForm>,
      );

      userEvent.type(screen.getByRole('textbox'), 'a');
      userEvent.click(screen.getByRole('button', { name: '提 交' }));

      await waitFor(() => {
        expect(submitFn).toBeCalledWith({ username: 'a' });
        expect(JSON.parse(localStorage.getItem('test-form') || '{}')).toEqual({});
      });
    });

    test('persistData && !name', () => {
      const errorOrigin = global.console.warn;
      const fn = jest.fn();
      global.console.warn = fn;
      render(<SuperForm persistData></SuperForm>);
      expect(fn).toBeCalled();
      global.console.warn = errorOrigin;
    });
  });

  describe('只读和禁用', () => {
    test('全表单禁用', () => {
      render(
        <SuperForm
          disabled
          isResponsive={false}
          btns={{
            cancelBtn: true,
            extraBtns: [<Button key="test">测试</Button>],
          }}
        >
          <SuperInput name="username" label="姓名"></SuperInput>
          <SuperInput name="password" label="密码"></SuperInput>
        </SuperForm>,
      );
      expect(screen.getAllByRole('textbox').length).toBe(2);
      screen.getAllByRole('textbox').forEach((item) => {
        expect(item).toHaveAttribute('disabled');
      });

      expect(screen.getByRole('button', { name: /提 交/i })).toHaveAttribute('disabled');
      expect(screen.getByRole('button', { name: /重 置/i })).toHaveAttribute('disabled');
      expect(screen.getByRole('button', { name: /取 消/i })).not.toHaveAttribute('disabled');
      expect(screen.getByRole('button', { name: /测 试/i })).not.toHaveAttribute('disabled');
    });

    test('全表单只读', () => {
      render(
        <SuperForm
          isResponsive={false}
          readonly
          btns={{
            cancelBtn: true,
            extraBtns: [<Button key="test">测试</Button>],
          }}
        >
          <SuperInput name="username" label="姓名"></SuperInput>
          <SuperInput name="password" label="密码"></SuperInput>
        </SuperForm>,
      );

      expect(screen.queryAllByRole('textbox')).toHaveLength(0);
      expect(screen.getAllByText('-')).toHaveLength(2);

      expect(screen.getByRole('button', { name: /提 交/i })).toHaveAttribute('disabled');
      expect(screen.getByRole('button', { name: /重 置/i })).toHaveAttribute('disabled');
      expect(screen.getByRole('button', { name: /取 消/i })).not.toHaveAttribute('disabled');
      expect(screen.getByRole('button', { name: /测 试/i })).not.toHaveAttribute('disabled');
    });
  });

  describe('数据获取', () => {
    test('获取成功', async () => {
      const wrapper = render(
        <SuperProvider axios={axios}>
          <SuperForm isResponsive={false} initApi={() => ({ name: 'foo', age: 10 })} initialValues={{ name: 'jack' }}>
            <SuperInput name="name" label="姓名"></SuperInput>
            <SuperInput name="age" label="年龄"></SuperInput>
          </SuperForm>
        </SuperProvider>,
      );
      expect(wrapper.container.querySelector('.ant-spin-nested-loading')).not.toBeNull();

      await waitFor(() => {
        expect(
          screen.getByRole('textbox', {
            name: /姓名/i,
          }),
        ).toHaveValue('foo');
        expect(
          screen.getByRole('textbox', {
            name: /年龄/i,
          }),
        ).toHaveValue('10');
      });
    });

    test('获取到的数据不是对象，则应报警告', async () => {
      const warnFn = jest.fn();
      console.warn = warnFn;
      const originalError = console.warn;
      render(
        <SuperProvider axios={axios}>
          <SuperForm initApi={() => [1, 2, 3]}></SuperForm>
        </SuperProvider>,
      );
      await waitFor(() => {
        expect(warnFn).toBeCalled();
      });
      console.error = originalError;
    });

    // test.only('当获取失败，应有错误提示', async () => {
    //   render(
    //     <SuperProvider axios={axios}>
    //       <SuperForm initApi={() => Promise.reject({
    //         message: 'request error'
    //       })}>
    //       </SuperForm>
    //     </SuperProvider>
    //   );

    //   await waitFor(() => {
    //     expect(screen.getByText('request error')).toBeInTheDocument()
    //   })
    // })
  });

  describe('debug', () => {
    test('默认不显示', () => {
      const wrapper = render(
        <SuperForm isResponsive={false}>
          <SuperInput name="username" label="姓名"></SuperInput>
        </SuperForm>,
      );
      expect(wrapper.container.querySelector('.super-form-debugger')).not.toBeInTheDocument();
    });

    test('debug', async () => {
      const wrapper = render(
        <SuperForm isResponsive={false} debug>
          <SuperInput name="username" label="姓名"></SuperInput>
        </SuperForm>,
      );
      expect(wrapper.container.querySelector('.super-form-debugger')).toBeInTheDocument();
      userEvent.type(screen.getByRole('textbox'), 'a');
      await waitFor(() => {
        expect(screen.getByText(/"username": "a"/)).not.toBeNull();
      });
    });
  });

  describe('全表单隐藏标签', () => {
    test('hideLabel', () => {
      const wrapper = render(
        <SuperForm hideLabel isResponsive={false}>
          <SuperInput name="username" label="姓名"></SuperInput>
          <SuperInput name="password" label="年龄"></SuperInput>
        </SuperForm>,
      );

      expect(wrapper.container.querySelector('.ant-form-item-label')).toBeNull();
    });
  });

  describe('组件联动', () => {
    test('refresh: 正常', async () => {
      const fn = jest.fn();
      render(
        <SuperProvider axios={axios}>
          <SuperForm
            name="test1"
            btns={{
              submitBtn: 'submit1',
            }}
            refreshName="test2"
            isResponsive={false}
          ></SuperForm>

          <SuperForm name="test2" initApi={fn} isResponsive={false}></SuperForm>
        </SuperProvider>,
      );

      userEvent.click(screen.getByText(/submit1/i));

      await waitFor(() => {
        expect(fn).toBeCalledTimes(2);
      });
    });

    test('updateTargetData', async () => {
      render(
        <SuperProvider>
          <SuperForm
            name="test1"
            btns={{
              submitBtn: 'submit1',
            }}
            updateName="test2"
            isResponsive={false}
          >
            <SuperInput name="username" label="username1"></SuperInput>
          </SuperForm>

          <SuperForm name="test2" isResponsive={false}>
            <SuperInput name="username" label="username2"></SuperInput>
          </SuperForm>
        </SuperProvider>,
      );

      userEvent.type(screen.getByLabelText('username1'), 'a');
      userEvent.click(screen.getByText(/submit1/i));
      await waitFor(() => {
        expect(screen.getByLabelText('username2')).toHaveValue('a');
      });
    });
  });

  describe('取消自动设置 placeholder', () => {
    test('autoPlaceholder', () => {
      render(
        <SuperForm autoPlaceholder={false} isResponsive={false}>
          <SuperInput name="username" label="username"></SuperInput>
          <SuperInput name="password" label="password"></SuperInput>
        </SuperForm>,
      );

      expect(screen.getByLabelText('username')).toHaveAttribute('placeholder', '请输入');
      expect(screen.getByLabelText('password')).toHaveAttribute('placeholder', '请输入');
    });
  });

  describe('对齐方式 align', () => {
    test('默认居左，无 className', () => {
      const wrapper = render(<SuperForm isResponsive={false}></SuperForm>);
      expect(wrapper.container.querySelector('super-antd-left')).not.toBeInTheDocument();
    });
    test('当设置 align 为 center 时，className 为 super-antd-center', () => {
      const wrapper = render(<SuperForm align="center" isResponsive={false}></SuperForm>);
      expect(wrapper.container.querySelector('super-antd-center')).not.toBeInTheDocument();
    });
  });
});
