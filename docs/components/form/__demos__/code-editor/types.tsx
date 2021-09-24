import React, { FC } from 'react';

export interface CEditorProps {
  prefixCls?: string;
  /**
   * Set what programming language the code belongs to.
   */
  language?: string;
  /**
   * Optional padding for code. Default: `10`.
   */
  padding?: number;
}

const CEditor: FC<CEditorProps> = () => <>Demo!</>;

export default CEditor;
