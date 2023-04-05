import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import DefaultStyle from "../theme";

const SelectPeople = ({ route, navigation }) => {
  const { numberAdult, numberChildren } = route.params;
  const [numberAdultSelect, setNumberAdultSelect] = useState(numberAdult);
  const [numberChildrenSelect, setNumberChildrenSelect] =
    useState(numberChildren);
  return (
    <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <Text style={[DefaultStyle.text, styles.room]}>Phòng 1</Text>
      <View style={styles.wrapper}>
        <View style={styles.item}>
          <Text style={[DefaultStyle.text, { fontWeight: "600" }]}>
            Người lớn
          </Text>
          <View style={styles.buttonWrapper}>
            <Text
              onPress={() => {
                if (numberAdultSelect > 1) {
                  setNumberAdultSelect(numberAdultSelect - 1);
                }
              }}
            >
              <AntDesign name="minuscircleo" size={24} color={"#E8952F"} />
            </Text>
            <Text style={[DefaultStyle.text]}>{numberAdultSelect}</Text>
            <Text
              onPress={() => {
                if (numberAdultSelect + numberChildrenSelect < 9) {
                  setNumberAdultSelect(numberAdultSelect + 1);
                }
              }}
            >
              <AntDesign
                name="pluscircleo"
                size={24}
                color={
                  numberAdultSelect + numberChildrenSelect < 9
                    ? "#E8952F"
                    : "#CCC"
                }
              />
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.item}>
          <Text style={[DefaultStyle.text, { fontWeight: "600" }]}>
            Trẻ em
            <Text style={{ color: "#CCC" }}> (0 - 12 tuổi)</Text>
          </Text>
          <View style={styles.buttonWrapper}>
            <Text
              onPress={() => {
                if (numberChildrenSelect > 1) {
                  setNumberChildrenSelect(numberChildrenSelect - 1);
                }
              }}
            >
              <AntDesign name="minuscircleo" size={24} color="#E8952F" />
            </Text>
            <Text style={[DefaultStyle.text]}>{numberChildrenSelect}</Text>
            <Text
              onPress={() => {
                if (numberAdultSelect + numberChildrenSelect < 9) {
                  setNumberChildrenSelect(numberChildrenSelect + 1);
                }
              }}
            >
              <AntDesign
                name="pluscircleo"
                size={24}
                color={
                  numberAdultSelect + numberChildrenSelect < 9
                    ? "#E8952F"
                    : "#CCC"
                }
              />
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SearchHotel", {
            numberAdultSelect: numberAdultSelect,
            numberChildrenSelect: numberChildrenSelect,
          })
        }
        style={styles.search}
      >
        <Text
          style={[
            DefaultStyle.text,
            { color: "#FFF", fontWeight: "600", fontSize: 15 },
          ]}
        >
          Tìm kiếm (1 phòng, {numberAdultSelect + numberChildrenSelect} khách)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectPeople;

const styles = StyleSheet.create({
  room: {
    fontWeight: "700",
    marginTop: 20,
    borderTopColor: "#CCCCCC",
    borderTopWidth: 0.5,
    paddingVertical: 20,
  },
  wrapper: {},
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "30%",
  },
  search: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#E8952F",
    borderRadius: 10,
    color: "#FFF",
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
  },
});
