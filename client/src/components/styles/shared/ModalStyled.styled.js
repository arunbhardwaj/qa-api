import styled from "styled-components";

export const ModalWindow = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  top: 25%;
  left: 25%;
  z-index: 10;
  background-color: #fff;
  width: 50%;
  height: 50%;
  max-width: 80%;
  max-height: 80%;
  padding: 10px;
  overflow: scroll;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
`

export const ModalExit = styled.button`
  border: none;
  background: none;
  outline: none;
  color: rgb(171, 169, 172);
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.0);
  }
`

export const Line = styled.hr`
  width: 90%;
  border: 1px solid;
  border-color: rgb(171, 169, 172);
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

export const ModalSubmit = styled.button`
  border: none;
  border-radius: 10px;
  background: aquamarine;
  font-size: 1rem;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    transform: scale(1.1);
  }

  /* On click/active, shrink */
  &:active {
    transform: scale(1.0);
  }
`

export const ReviewModalWindow = styled(ModalWindow)`
  top: 25%;
  left: 25%;
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  width: 50%;
  height: 50%;
  background: #fff;
  border: 1px solid hotpink;
  font-size: 10pt;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
`