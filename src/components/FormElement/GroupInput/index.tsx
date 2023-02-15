import { Container } from "./styles";

type ChildrenTypeProps = JSX.Element | JSX.Element[]

type Props = {
  children: ChildrenTypeProps,
}

export function GroupInput({children}: Props) {
  return(
    <Container>
      {children}
    </Container>
  )
}