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

type Props = {
  placeholder: object,
  items: string[],
};

export function SelectInput({placeholder, items}: Props){
  return (
    <Container>
      <RNPickerSelect
        style={pickerStyle}
        placeholder={placeholder}
        onValueChange={(value) => console.log(value)}
        itemKey="value"
        items={[
          { label: 'Football', value: 'football' },
          { label: 'Baseball', value: 'baseball' },
          { label: 'Hockey', value: 'hockey' },
        ]}
      />
    </Container>
  );
}