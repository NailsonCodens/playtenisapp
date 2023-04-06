
import { useEffect, useState } from 'react';
import { Container, Title } from './style';

export function Header(){
  const [second, setSecond] = useState<string | number>('');
  const [minute, setMinute] = useState<string | number>('');
  const [hour, setHour] = useState<string | number>('');

  async function Clock(){
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const hour = hours < 10 ? `0${hours}` : hours
    const minute = minutes < 10 ? `0${minutes}` : minutes
    const second = seconds < 10 ? `0${seconds}` : seconds    
    setSecond(second);
    setMinute(minute);
    setHour(hour);
  }

  useEffect(() => {
    setTimeout(() => {
      Clock();
    }, 1000);
  }, [second]);

  return(
    <Container>
      <Title>{ hour }:{minute}:{second}</Title>
    </Container>
  )
}