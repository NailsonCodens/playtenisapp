import { Container } from "./styles";
import { HeaderRegisterGame} from "../../components/HeaderRegisterGame";
import { SelectInput } from "../../components/SelectInput";
import { Form } from '../../components/FormElement/Form';
import { Row } from "../../components/FormElement/Row";
import { GroupInput } from "../../components/FormElement/GroupInput";
import { Label } from "../../components/FormElement/Label";


export function RegisterGame(){

  return(
    <Container>
      <HeaderRegisterGame 
        title="Cadastro de jogo"
      />
      <Form>
        <Row>
          <GroupInput>
            <Label label="Botão"/>
            <SelectInput 
              placeholder={{ label: 'Selecione a Modalide', value: 'Selecione a Modalide'}} 
              items={[]}
            />
          </GroupInput>
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