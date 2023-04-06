import { LabelText } from "./styles";

type Props = {
  label: string,
  textColor: boolean
}

export function Label({label, textColor}: Props) {
  return(
    <LabelText
    type={textColor}
    >
      {label}
    </LabelText>
  )
}