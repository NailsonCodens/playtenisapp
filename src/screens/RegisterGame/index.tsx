import { Container } from "./styles";
import { HeaderRegisterGame} from "../../components/HeaderRegisterGame";
import { SelectInput } from "../../components/SelectInput";
import { Form } from '../../components/FormElement/Form';
import { Row } from "../../components/FormElement/Row";
import { GroupInput } from "../../components/FormElement/GroupInput";
import { Label } from "../../components/FormElement/Label";
import { AvailableCourt } from '../../components/AvailableCourt';
import { Input } from "../../components/InputText";
import { Button } from "../../components/Button";


export function RegisterGame(){

  return(
    <Container>
      <HeaderRegisterGame 
        title="Cadastro de jogo"
      />
      <Form>
        <Row>
          <GroupInput>
            <Label label="Quadra Selecionada"/>
            <AvailableCourt court="Quadra 01"/>
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
            <Label label="Matrícula do 1° jogador"/>
            <Input/>
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
        <Row>
          <GroupInput>
            <Label label="Matrícula do 2° jogador"/>
            <Input/>
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
        <Row>
          <GroupInput>
            <Button 
              title="Play"
            />
          </GroupInput>
        </Row>                      
      </Form>
    </Container>
  )
}