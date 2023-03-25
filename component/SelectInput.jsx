import React, { useState } from 'react'
import {StyleSheet, Text, View } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'

const Provinces = [
  {
    id: 0,
    item: 'Hà Nội',
    Showroom: [
      {
        item: `SR Royal City - Hà Nội
Tòa nhà văn phòng Symphony, Đường Chu Huy Mân, Phương Phúc lợi
        `,
        id: 0
      },
      {
        item: `SR Smart City - Hà Nội
Tầng 1,TTTM Vincom Mega Mall, KĐT Vinhomes Smart City
        `,
        id: 1
      },
      {
        item: `SR Times City - Hà Nội
Tòa văn phòng Symphony, Đường Chu Huy Mân, Phường Phúc Lợi
        `,
        id: 2
      },
      {
        item: `SR Phạm Văn Đồng - Hà Nội
166 đường PHạm Văn Đồng, Phương Xuân Đỉnh
        `,
        id: 3
      },
      {
        item: `SR Nguyễn Văn Linh - Hà Nội
Số 1 phố Nguyễn Văn Linh
        `,
        id: 4
      },
      {
        item: `SR Trần Duy Hưng - Hà Nội
Tầng L1, TTTM Vincom Center Trần Duy Hưng
        `,
        id: 5
      },
      {
        item: `SR Long Biên - Hà Nội
Tầng 1, TTTM Vincom Plaza Long Biên, Khu đô thị Vinhomes Riverside
        `,
        id: 6
      },
      {
        item: `SR Ocean Park - Hà Nội
Tầng 1, TTTM Vincom Mega Mal
        `,
        id: 7
      },
      {
        item: `ĐL Hà Nội - Hà Nội
Số 948, đường Quang Trung kéo dài
        `,
        id: 8
      },
      {
        item: `ĐL Newway - Hà Nội
Số 358 Đường Láng
        `,
        id: 9
      },
      {
        item: `ĐL Thăng Long - Hà Nội
Số 68 Trịnh Văn Bô, Phương Phương Canh, Quận Nam Từ Liêm, Thành Phố Hà Nội, Việt Nam
        `,
        id: 10
      },
      {
        item: `ĐL Mỹ Đình - Hà Nội
Số 8 Phạm Hung, Cầu Giấy, Hà Nội
        `,
        id: 11
      },
      {
        item: `ĐL Trường Chinh - Hà Nội
162 Phố Trường Chinh, Quận Đống Đa, Hà Nội
        `,
        id: 12
      },
      {
        item: `ĐL Quốc Oai - Hà Nội
Km Quốc Oai - Hà Nội
        `,
        id: 13
      },
    ]
  },
  {
    id: 1,
    item: 'Bắc Ninh',
    Showroom: [
      {
        item: `ĐL Quốc Oai - Hà Nội
Km Quốc Oai - Hà Nội
        `,
        id: 0
      },
      {
        item: `ĐL Quốc Oai - Hà Nội
Km Quốc Oai - Hà Nội
        `,
        id: 1
      },
      {
        item: `ĐL Quốc Oai - Hà Nội
Km Quốc Oai - Hà Nội
        `,
        id: 2
      },
    ]
  },
  {
    id: 2,
    item: 'TP Hồ Chí Minh',
    Showroom: [
      {
        item: `ĐL Quốc Oai - Hà Nội
Km Quốc Oai - Hà Nội
        `,
        id: 0
      },
      {
        item: `ĐL Quốc Oai - Hà Nội
Km Quốc Oai - Hà Nội
        `,
        id: 1
      },
    ]
  },
  {
    id: 3,
    item: 'Hải Phòng',
    Showroom: [
      {
        item: `ĐL Quốc Oai - Hà Nội
Km Quốc Oai - Hà Nội
        `,
        id: 0
      },
      {
        item: `ĐL Quốc Oai - Hà Nội
Km Quốc Oai - Hà Nội
        `,
        id: 1
      },
    ]
  },
]

const SelectInput = () => {
  const [selectedProvince, setSelectedProvince] = useState({})
  const [selectedShowRoom, setSelectedShowRoom] = useState({})

  const onSubmit = () => {
    // alert(JSON.stringify(data))
  }

  const onChangeProvince = () => {
    return (val) => setSelectedProvince(val)
  }

  const onChangeShowRoom = () => {
    return (val) => setSelectedShowRoom(val)
  }
  return (
    <View style={{ margin: 30 }}>
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Thành Phố</Text>
      <SelectBox
        label="Thành Phố"
        options={Provinces}
        value={selectedProvince}
        onChange={onChangeProvince()}
        hideInputFilter={false}
      />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Showroom</Text>
      <SelectBox
        label="showroom"
        options={Provinces[selectedProvince.id] ? Provinces[selectedProvince.id].Showroom : []}
        value={selectedShowRoom}
        onChange={onChangeShowRoom()}
        hideInputFilter={false}
      />
    </View>
  )
}

export default SelectInput

const styles = StyleSheet.create({})