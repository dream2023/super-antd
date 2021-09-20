import { APILoader, GeolocationControl, Label, Map, Marker, NavigationControl } from '@uiw/react-baidu-map';
import { Input, Modal } from 'antd';
import type { OptionType } from 'antd/lib/select';
import type { FC} from 'react';
import React, { useMemo, useRef, useState } from 'react';
import { DebounceSelect } from './DebounceSelect';


const labelFontSize = 12;

export interface MapValue {
  lat: number;
  lng: number;
  address?: string;
}

export interface BaiduMapProps {
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
   * 是否显示导航组件
   * @default true
   */
  showNavigation?: boolean;
  /**
   * 是否显示定位组件
   * @default true
   */
  showGeolocation?: boolean;
  /**
   * 是否允许滚轮缩放
   * @default true
   */
  enableScrollWheelZoom?: boolean;
  /**
   * 地图高度
   * @default 400
   */
  height?: number;
  value?: MapValue;
  onChange?: (value?: MapValue) => void;
}

const BaiduMapContent: FC<Omit<BaiduMapProps, 'ak' | 'placeholder'>> = ({
  value,
  onChange,
  zoom,
  showNavigation,
  showGeolocation,
  enableScrollWheelZoom,
  height,
}) => {
  const centerRef = useRef<MapValue | undefined>(value);
  const geoc = useMemo(() => new BMap.Geocoder(), []);
  const mapRef = useRef<{ map?: BMap.Map }>(null);

  // 处理变化
  const handleChange = (position?: MapValue) => {
    if (!position || !onChange) return;

    // 根据经纬度获取地址
    geoc.getLocation(position, function (rs) {
      onChange({ ...position, address: rs.address });
    });
  };

  const handleLoad: BMap.MapEvents['onLoad'] = (e) => {
    // 因为默认是上海市，所以必须等它自定定位到当前城市后才能 onChange
    // 当然有一定概率是在 1s 内并不能定位到当前城市，那就没法办了，本身没有提供类似的能力
    setTimeout(() => {
      centerRef.current = { lng: e.target?.he?.lng, lat: e.target?.he?.lat };
      handleChange(e.target?.he);
    }, 1000);
  };

  // 获取搜索列表
  const fetchAddressList = async (keyword: string): Promise<OptionType[]> => {
    return new Promise((resolve) => {
      if (!keyword || !mapRef.current?.map) {
        resolve([]);
        return;
      }

      const local = new BMap.LocalSearch(mapRef.current?.map, {
        onSearchComplete: (results) => {
          const list = (results as any)?.Br.map(({ address, point }: { address: string; point: MapValue }) => ({
            label: address,
            value: `${address},${point.lng},${point.lat}`,
          }));
          resolve(list);
        },
      });
      local.search(keyword);
    });
  };

  // 搜索的 value
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
      onChange(res)
    }
  };

  return (
    <>
      {/* 搜索框 */}
      <DebounceSelect
        value={searchValue}
        placeholder="请输入位置"
        fetchOptions={fetchAddressList}
        onChange={handleSearch}
        style={{ width: '100%', marginBottom: 12 }}
      />

      {/* 地图组件 */}
      <Map
        ref={mapRef}
        zoom={zoom}
        enableDragging
        style={{ height }}
        defaultCursor="auto"
        enableMapClick={false}
        autoLocalCity={!value}
        center={centerRef.current}
        enableDoubleClickZoom={false}
        enableScrollWheelZoom={enableScrollWheelZoom}
        onLoad={handleLoad}
        onClick={(e) => handleChange(e.point)}
      >
        {/* 当前定位的位置名称 */}
        {value?.address && (
          <Label
            content={value.address}
            style={{
              border: 'none',
              color: 'white',
              padding: '4px 12px',
              boxShadow: '1px 1px 1px rgb(10 10 10 / 20%)',
              whiteSpace: 'nowrap',
              backgroundColor: 'rgb(245 67 54)',
              borderRadius: 3,
              fontSize: labelFontSize,
            }}
            offset={new BMap.Size(-labelFontSize - (value.address.length / 2) * labelFontSize, -60)} // 文字居中
            position={value}
          />
        )}

        {/* 当前定位的标识 📌 */}
        {!!value && (
          <Marker
            enableDragging
            enableClicking
            onDragEnd={(e) => handleChange(e.point)}
            type="simple_red"
            position={value}
          />
        )}

        {/* 是否显示导航控件 */}
        {showNavigation && <NavigationControl offset={new BMap.Size(20, 20)} enableGeolocation showZoomInfo />}

        {/* 是否显示自动定位控件 */}
        {showGeolocation && (
          <GeolocationControl
            showAddressBar
            enableAutoLocation
            offset={new BMap.Size(30, 30)}
            anchor={BMAP_ANCHOR_BOTTOM_RIGHT}
            onLocationSuccess={(e) => handleChange(e.point)}
          />
        )}
      </Map>
    </>
  );
};

const BaiduMapModal: FC<Omit<BaiduMapProps, 'placeholder'>> = ({ ak, ...otherProps }) => {
  return (
    <APILoader version="v2" akay={ak}>
      <BaiduMapContent {...otherProps} />
    </APILoader>
  );
};

export const BaiduMap: FC<BaiduMapProps> = ({ placeholder, value, ...otherProps }) => {
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
        <BaiduMapModal value={value} {...otherProps} />
      </Modal>
    </>
  );
};

BaiduMap.defaultProps = {
  height: 400,
  zoom: 12,
  placeholder: '请选择位置',
  showNavigation: true,
  showGeolocation: true,
  enableScrollWheelZoom: true,
};
