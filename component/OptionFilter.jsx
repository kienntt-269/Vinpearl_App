import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import DefaultStyle from "../theme";
import { AntDesign } from "@expo/vector-icons";

const OptionFilter = ({ navigation }) => {
  return (
    <View>
      <Text>OptionFilter</Text>
      <TouchableOpacity
        style={styles.filter}
        onPress={() => navigation.navigate('ResultSearchTour', {
            dataFilter: "dataFilter",
        })}
      >
        <Text style={DefaultStyle.text}>Bộ lọc và sắp xếp</Text>
        <AntDesign name="filter" size={24} color="#8C8C90" />
      </TouchableOpacity>
    </View>
  );
};

export default OptionFilter;
