import { ButtonCourtsTypeStyleProps, ContainerRadioButton, TitleButton } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { useState } from 'react';

type Props =TouchableOpacityProps & {
  data: ObjectCourt[];
  handleSetCourt: (id: string, name: string) => void;
};

export type ObjectCourt = {
  name: string;
  id: string;
  game: string;
  status: string;
};



export function RadioButton({data, handleSetCourt, ...rest}: Props){
  const [typeStyleButton, setTypeStyleButton] = useState<ButtonCourtsTypeStyleProps>('UNSELECTED');

  const [onSelect, setOnSelect] = useState('');

  function handlePressButton(id: string, name: string){
    setOnSelect(id);
    handleSetCourt(id, name);
  }

  return (
    <>
      {
        data.map((court) => {
          if(court.game === 'no' && court.status !== 'off'){
            return(

                <ContainerRadioButton
                key={court.id}
                type={court.id === onSelect? 'SELECTED' : 'UNSELECTED'}
                onPress={() => handlePressButton(court.id, court.name)}
                {...rest}
                >
                  <TitleButton
                    key={court.id}
                    type={court.id === onSelect? 'SELECTED' : 'UNSELECTED'}
                  >{court.name}</TitleButton>
                </ContainerRadioButton>

            )          
          }
        })
      }
    </>
  );
}