import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DefaultStyle from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@react-native-material/core";
import DropDownPicker from "react-native-dropdown-picker";

const OptionFilter = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [valueLengthStayIds, setValueLengthStayIds] = useState(null);
  const [itemLengthStayIds, setItemLengthStayIds] = useState([
    { value: 1, label: '1 ngày'},
    { value: 2, label: '2 ngày 1 đêm'},
    { value: 3, label: '3 ngày 2 đêm'},
    { value: 4, label: '4 ngày 3 đêm'},
    { value: 5, label: '5 ngày 4 đêm'},
    { value: 6, label: '6 ngày 4 đêm'},
    { value: 7, label: '6 ngày 5 đêm'},
    { value: 8, label: '22 ngày 21 đêm'},
  ]);
  const [valueTypeOfTour, setValueTypeOfTour] = useState(null);
  const [itemTypeOfTour, setItemTypeOfTour] = useState([
    { value: 1, label: 'Gói nghỉ dưỡng'},
    { value: 2, label: 'VinWonders'},
    { value: 3, label: 'Vận chuyển'},
    { value: 4, label: 'Vinpearl Golf'},
    { value: 5, label: 'Ẩm thực'},
    { value: 6, label: 'Tour'},
    { value: 7, label: 'Vé tham quan'},
    { value: 8, label: 'Spa'},
  ]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <Text style={[DefaultStyle.text, styles.title]}>Xếp theo</Text>
        <DropDownPicker
            open={open}
            value={valueTypeOfTour}
            items={itemTypeOfTour}
            setOpen={setOpen}
            setValue={setValueTypeOfTour}
            setItems={setItemTypeOfTour}
            multiple={true}
            min={0}
            max={5}
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={[DefaultStyle.text, styles.title]}>Loại sản phẩm</Text>
        <DropDownPicker
            open={open}
            value={valueTypeOfTour}
            items={itemTypeOfTour}
            setOpen={setOpen}
            setValue={setValueTypeOfTour}
            setItems={setItemTypeOfTour}
            multiple={true}
            min={0}
            max={5}
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={[DefaultStyle.text, styles.title]}>Độ dài kỳ nghỉ</Text>
        <DropDownPicker
            open={open}
            value={valueLengthStayIds}
            items={itemLengthStayIds}
            setOpen={setOpen}
            setValue={setValueLengthStayIds}
            setItems={setItemLengthStayIds}
            multiple={true}
            min={0}
            max={5}
        />
      </View>
      <Button
        onPressIn={() =>
            navigation.navigate("ResultSearchTour", {
              dataFilter: "dataFilter",
            })
        }
        title="Click Me" onPress={() => alert("🎉🎉🎉")}/>
    </View>
  );
};

export default OptionFilter;

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: "600",
    },
});
