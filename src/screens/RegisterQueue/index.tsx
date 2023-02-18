import { AvailableCourt } from '../../components/AvailableCourt';
import { Form } from '../../components/FormElement/Form';
import { GroupInput } from '../../components/FormElement/GroupInput';
import { Label } from '../../components/FormElement/Label';
import { Row } from '../../components/FormElement/Row';
import { HeaderRegisterGame } from '../../components/HeaderRegisterGame';
import { SelectInput } from '../../components/SelectInput';
import {Container} from './styles';

export function RegisterQueue(){
  return(
    <Container>
      <HeaderRegisterGame 
        title="Entrar na fila de espera"
      />
      <Form>
        <Row>
          <GroupInput>
            <Label label="Modalidade"/>
            <SelectInput 
              placeholder={{ label: 'Testando', value: 'Testando' }} 
              items={[]}
            />
          </GroupInput>
        </Row>
        <Row>
          <GroupInput>
            <Label label="Matrícula do 1° jogador"/>
   
          </GroupInput>
        </Row>
        <Row>
          <GroupInput>
            <Label label="Dependentes"/>
            <SelectInput 
              placeholder={{ label: 'Selecione a Modalide', value: 'Selecione a Modalide'}} 
              items={[]}
            />
          </GroupInput>
        </Row>                    
      </Form>      
    </Container>
  )
}