import { Container } from "./style";

type ChildrenTypeProps = JSX.Element | JSX.Element[]

type Props = {
  children: ChildrenTypeProps,
}

export function Form({children}: Props) {
  return(
    <Container>
      {children}
    </Container>
  )
}