import { getBtn, getBtnText, getBtns } from '@/form/src/utils';

describe('SuperForm utils', () => {
  describe('getBtnText', () => {
    test('当 btn 为字符串，则返回此字符串', () => {
      expect(getBtnText('btn', 'defaultText')).toBe('btn');
    });

    test('当 btn 不为字符串时，返回默认值', () => {
      expect(getBtnText(undefined, 'defaultText')).toBe('defaultText');
      expect(getBtnText(false, 'defaultText')).toBe('defaultText');
      expect(getBtnText(true, 'defaultText')).toBe('defaultText');
    });
  });

  describe('getBtn', () => {
    test('btn 为对象时，返回此对象', () => {
      expect(
        getBtn({
          btn: { text: 'hello', htmlType: 'submit' },
          defaultText: 'defaultText',
          htmlType: 'reset',
          disabled: true,
        }),
      ).toMatchObject({
        text: 'hello',
        htmlType: 'submit',
        disabled: true,
        visible: true,
      });

      expect(
        getBtn({
          btn: { text: 'hello', htmlType: 'submit', visible: false },
          defaultText: 'defaultText',
          htmlType: 'reset',
          disabled: true,
        }),
      ).toMatchObject({
        text: 'hello',
        htmlType: 'submit',
        disabled: true,
        visible: false,
      });
    });

    test('btn 不为对象时，返回默认对象', () => {
      expect(
        getBtn({
          btn: '提交',
          defaultText: 'defaultText',
          htmlType: 'reset',
          disabled: true,
        }),
      ).toMatchObject({
        children: '提交',
        htmlType: 'reset',
        disabled: true,
      });
    });
  });

  describe('getBtns', () => {
    test('默认情况应返回 2 个 btn', () => {
      expect(getBtns({})).toEqual([
        {
          disabled: undefined,
          key: 'submit',
          htmlType: 'submit',
          type: 'primary',
          visible: true,
          onClick: undefined,
          children: '提交',
        },
        {
          disabled: undefined,
          key: 'reset',
          htmlType: 'reset',
          type: undefined,
          visible: true,
          onClick: undefined,
          children: '重置',
        },
      ]);
    });

    test('当 disabled 为 true 是，全部 btn 应该都为 disabled', () => {
      expect(getBtns({ disabled: true })).toEqual([
        {
          disabled: true,
          key: 'submit',
          htmlType: 'submit',
          type: 'primary',
          visible: true,
          onClick: undefined,
          children: '提交',
        },
        {
          disabled: true,
          key: 'reset',
          htmlType: 'reset',
          type: undefined,
          visible: true,
          onClick: undefined,
          children: '重置',
        },
      ]);
    });

    test('当 visible 为 false 时，应该被过滤掉', () => {
      expect(
        getBtns({
          submitBtn: false,
        }),
      ).toEqual([
        {
          disabled: undefined,
          key: 'reset',
          htmlType: 'reset',
          type: undefined,
          visible: true,
          onClick: undefined,
          children: '重置',
        },
      ]);
    });

    test('当 extraBtns 存在时，应结合', () => {
      expect(
        getBtns({
          extraBtns: [{ text: 'hello' }],
        }),
      ).toEqual([
        {
          disabled: undefined,
          key: 'submit',
          htmlType: 'submit',
          type: 'primary',
          visible: true,
          onClick: undefined,
          children: '提交',
        },
        {
          disabled: undefined,
          key: 'reset',
          htmlType: 'reset',
          type: undefined,
          visible: true,
          onClick: undefined,
          children: '重置',
        },
        {
          text: 'hello',
        },
      ]);
    });

    test('显示 4 个内置按钮', () => {
      expect(
        getBtns({
          cancelBtn: true,
        }),
      ).toEqual([
        {
          disabled: undefined,
          key: 'submit',
          htmlType: 'submit',
          type: 'primary',
          visible: true,
          onClick: undefined,
          children: '提交',
        },
        {
          disabled: undefined,
          key: 'reset',
          htmlType: 'reset',
          type: undefined,
          visible: true,
          onClick: undefined,
          children: '重置',
        },
        {
          disabled: undefined,
          key: 'cancel',
          htmlType: undefined,
          type: undefined,
          visible: true,
          onClick: undefined,
          children: '取消',
        },
      ]);
    });
  });
});
