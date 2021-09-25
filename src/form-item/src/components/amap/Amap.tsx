import './amap.css';

import { APILoader, Geolocation, Map, Marker, ToolBarControl } from '@uiw/react-amap';
import { Input, Modal } from 'antd';
import type { FC } from 'react';
import React, { useMemo, useRef, useState } from 'react';

import { DebounceSelect } from '../DebounceSelect';

export interface MapValue {
  lat: number;
  lng: number;
  address?: string;
}

export interface AmapProps {
  /**
   * 秘钥
   */
  ak?: string;
  /**
   * 缩放比例
   * @default 12
   */
  zoom?: number;
  /**
   * 提示语
   * @default '请选择位置'
   */
  placeholder?: string;
  /**
   * 是否显示定位组件
   * @default true
   */
  showToolBar?: boolean;
  /**
   * 是否显示定位组件
   * @default true
   */
  showGeolocation?: boolean;
  /**
   * 地图高度
   * @default 400
   */
  height?: number;
  value?: MapValue;
  onChange?: (value?: MapValue) => void;
}

const AmapContent: FC<Omit<AmapProps, 'ak' | 'placeholder'>> = ({
  value,
  onChange,
  zoom,
  showToolBar,
  showGeolocation,
  height,
}) => {
  // 中心地点
  const centerRef = useRef<MapValue | undefined>(value);
  // 用于解析坐标 -> 地址
  const geoc = useMemo(() => new AMap.Geocoder({}), []);
  // 用于搜索
  const autoComplete = useMemo(() => new AMap.AutoComplete({}), []);
  const mapRef = useRef(null);

  // 处理改变
  const handleChange = (lnglat?: AMap.LngLat, asyncToCenter?: boolean) => {
    if (!lnglat || !lnglat.getLng || !lnglat.getLat || !onChange) return;
    const position = {
      lng: lnglat.getLng(),
      lat: lnglat.getLat(),
    };

    if (asyncToCenter) {
      centerRef.current = position;
    }

    // 获取地址
    (geoc as any).getAddress(lnglat, (status: any, result: any) => {
      if (status === 'complete' && result.regeocode) {
        const address = result.regeocode.formattedAddress;
        onChange({ ...position, address });
      }
    });
  };

  // 根据关键字获取地址列表
  const fetchAddressList = async (keyword: string): Promise<{ label: string; value: string }[]> => {
    return new Promise((resolve) => {
      if (!keyword) {
        resolve([]);
        return;
      }

      autoComplete.search(keyword, (status, result) => {
        // 搜索成功时，result即是对应的匹配数据
        if (status === 'complete' && result?.tips) {
          const list = result.tips as unknown as { address: string; location: AMap.LngLat }[];
          const res = list
            .filter(({ address, location }) => {
              return typeof address === 'string' && location && location.getLng && location.getLat;
            })
            .map(({ address, location }) => ({
              label: address,
              value: `${address},${location && location.getLng ? location.getLng() : null},${
                location && location.getLat ? location.getLat() : null
              }`,
            }));
          resolve(res);
        }
      });
    });
  };

  // 搜索
  const searchValue = useMemo(() => {
    if (!value) return undefined;
    return {
      label: value.address || '',
      value: `${value.address},${value.lng},${value.lat}`,
    };
  }, [value]);

  // 处理搜索
  const handleSearch = (newValue?: { value: string }) => {
    let res;
    if (newValue && newValue.value) {
      const newLocation = newValue.value.split(',');
      res = { address: newLocation[0], lng: Number(newLocation[1]), lat: Number(newLocation[2]) };
      centerRef.current = res;
    }

    if (onChange) {
      onChange(res);
    }
  };

  return (
    <>
      {/* 输入搜索 */}
      <DebounceSelect
        value={searchValue}
        placeholder="请输入位置"
        fetchOptions={fetchAddressList}
        onChange={handleSearch}
        style={{ width: '100%', marginBottom: 12 }}
      />

      {/* 地图 */}
      <Map
        defaultCursor="auto"
        className="super-amap"
        zoom={zoom}
        ref={mapRef}
        center={centerRef.current ? [centerRef.current.lng, centerRef.current.lat] : undefined}
        style={{ height }}
        onClick={(e) => handleChange(e.lnglat)}
      >
        {/* 当前位置标识 */}
        {!!value && (
          <Marker
            draggable
            label={
              value.address
                ? {
                    // 设置文本标注偏移量
                    offset: new AMap.Pixel(0, -28),
                    // 设置文本标注内容
                    content: `<div>${value.address}</div>`,
                    // 设置文本标注方位
                    direction: 'center',
                  }
                : undefined
            }
            onDragEnd={(e) => handleChange(e.lnglat)}
            position={new AMap.LngLat(value.lng, value.lat, true)}
          />
        )}

        {/* 工具栏 */}
        {showToolBar && <ToolBarControl offset={[20, 20]} position="LT" />}

        {/* 定位 */}
        {showGeolocation && !value && (
          <Geolocation
            panToLocation={false}
            maximumAge={100000}
            GeoLocationFirst={false}
            borderRadius="5px"
            position="RB"
            offset={[20, 30]}
            onComplete={(e) => handleChange(e.position, true)}
          />
        )}
      </Map>
    </>
  );
};

export const AmapModal: FC<Omit<AmapProps, 'placeholder'>> = ({ ak, ...otherProps }) => {
  return (
    <APILoader akay={ak} plugin="AMap.Geocoder,AMap.AutoComplete">
      <AmapContent {...otherProps} />
    </APILoader>
  );
};

export const Amap: FC<AmapProps> = ({ placeholder, value, ...otherProps }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Input readOnly value={value?.address} placeholder={placeholder} onClick={() => setIsModalVisible(true)}></Input>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        width={650}
        title="请选择位置"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <AmapModal value={value} {...otherProps} />
      </Modal>
    </>
  );
};

Amap.defaultProps = {
  height: 400,
  zoom: 12,
  placeholder: '请选择位置',
  showToolBar: true,
  showGeolocation: true,
};

export default Amap;
