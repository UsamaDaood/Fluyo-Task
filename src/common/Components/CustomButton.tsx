// Global loader for whole application //

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {Colors} from '../../Utils/Colors';

interface ButtonProps {
  btnString: string;
  onClick: any;
  btnStyle: ViewStyle;
  titleStyle: TextStyle;
}

const CustomButton = ({
  btnString,
  onClick,
  btnStyle,
  titleStyle,
}: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.btnStyle, btnStyle]} onPress={onClick}>
      <Text style={[styles.btnTextStyle, titleStyle]}>{btnString}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 15,
  },
  btnStyle: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 7,
  },
  btnTextStyle: {
    color: Colors.whiteColor,
    alignSelf: 'center',
    alignContent: 'center',
    textAlignVertical: 'center',
  },
});

export default CustomButton;
