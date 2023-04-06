import RNPickerSelect from 'react-native-picker-select';
import { Container } from './styles';
import theme from '../../theme';

const pickerStyle = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: theme.BORDER_RADIUS,
    color: 'black',
    width: '100%', 
    height: 52,
    fontFamily: "Poppins_700Bold"    
  },
  placeholder: {
    color: '#000',
    fontSize: 16
  },  
	inputAndroid: {
    width: '100%', 
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: theme.BORDER_RADIUS,
    color: 'black',
    height: 52,
    fontFamily: "Poppins_700Bold" 
	},
};

export type ObjectItem = {
  label: string,
  value: string,
};

type Props = {
  placeholder: object,
  items: ObjectItem[],
  value: string,
  fetch: (value: object) => void,
};

export function SelectInput({placeholder, items, fetch, value}: Props){
  return (
      <RNPickerSelect
        style={pickerStyle}
        useNativeAndroidPickerStyle={false}        
        placeholder={placeholder}
        value={value}
        onValueChange={(value) => fetch(value)}
        itemKey="value"
        items={items}
      />
  );
}