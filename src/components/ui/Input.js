import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  border: 1px solid ${(props) => props.theme.colors.input.border};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.input.background};
  color: ${(props) => props.theme.colors.text.primary};
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${(props) => props.theme.colors.text.disabled};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.input.focus};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.input.focus}20;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${(props) => props.theme.colors.surface};
  }

  ${(props) =>
    props.error &&
    `
    border-color: ${props.theme.colors.error};
    
    &:focus {
      border-color: ${props.theme.colors.error};
      box-shadow: 0 0 0 3px ${props.theme.colors.error}20;
    }
  `}
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.error};
`;

const Input = ({ label, error, fullWidth = true, ...props }) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <StyledInput error={error} fullWidth={fullWidth} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default Input;
