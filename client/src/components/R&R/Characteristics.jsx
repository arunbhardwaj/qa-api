import React from 'react';
import styled from 'styled-components';




const Characteristics = ({ entry }) => {

    return (
    <div>
      {entry[0]}:
      <Container>
        {entry && <Triangle style={{marginLeft: `${260 * entry[1].value / 5}px`}}></Triangle>}
        <Bars>&nbsp;</Bars>
        <Bars>&nbsp;</Bars>
        <Bars>&nbsp;</Bars>
      </Container>
      <LabelContainer>
        <Labels>{characteristicLabels[entry[0]][1]}</Labels>
        <Labels style={{textAlign: 'center'}}>{characteristicLabels[entry[0]][3]}</Labels>
        <Labels style={{textAlign: 'right' }}>{characteristicLabels[entry[0]][5]}</Labels>
      </LabelContainer>
      <br/>
    </div>
    )
}

  const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #0d7012;
  position: absolute;

  `

const Container = styled.div`
  display: flex;
  gap: 5px;
  width: 270px;
`

const LabelContainer = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  width: 270px;
`

const Bars = styled.div`
  color: lightgray;
  background-color: lightgray;
  width: 33.3%;
  height: 8px;

`;

const Labels = styled.div`
  width: 33.3%;
`

const characteristicLabels = {
  Size: {
    1: 'A size too small',
    2: '½ a size too small ',
    3: 'Perfect',
    4: '½ a size too big',
    5: 'A size too wide',
  },
  Width: {
    1: 'Too narrow',
    2: 'Slightly narrow',
    3: 'Perfect',
    4: 'Slightly wide',
    5: 'Too wide',
  },
  Comfort: {
    1: 'Uncomfortable',
    2: 'Slightly uncomfortable',
    3: 'Ok',
    4: 'Comfortable',
    5: 'Perfect',
  },
  Quality: {
    1: 'Poor',
    2: 'Below average',
    3: 'What I expected',
    4: 'Pretty great',
    5: 'Perfect',
  },
  Length: {
    1: 'Runs Short',
    2: 'Runs slightly short',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long',
  },
  Fit: {
    1: 'Runs tight',
    2: 'Runs slightly tight',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long',
  },
}

export default Characteristics;

