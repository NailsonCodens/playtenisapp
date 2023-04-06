import { Text } from "./styles";


type Props = {
  label: string,
}

export function TitleInputGroup({label}: Props) {
  return(
    <Text>
      {label}
    </Text>
  )
}