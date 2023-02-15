import { Text } from "./styles";


type Props = {
  label: string,
}

export function Label({label}: Props) {
  return(
    <Text>
      {label}
    </Text>
  )
}