import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  min-height: 2.5rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }

  ${(props) => {
    switch (props.variant) {
      case "secondary":
        return `
          background-color: ${props.theme.colors.surface};
          color: ${props.theme.colors.text.primary};
          border-color: ${props.theme.colors.border};
          
          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.border};
          }
        `;
      case "outline":
        return `
          background-color: transparent;
          color: ${props.theme.colors.primary};
          border-color: ${props.theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.primary};
            color: white;
          }
        `;
      case "ghost":
        return `
          background-color: transparent;
          color: ${props.theme.colors.text.secondary};
          
          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.surface};
            color: ${props.theme.colors.text.primary};
          }
        `;
      case "danger":
        return `
          background-color: ${props.theme.colors.error};
          color: white;
          
          &:hover:not(:disabled) {
            background-color: #DC2626;
          }
        `;
      default:
        return `
          background-color: ${props.theme.colors.primary};
          color: white;
          
          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.primaryHover};
          }
        `;
    }
  }}

  ${(props) => {
    switch (props.size) {
      case "sm":
        return `
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          min-height: 2rem;
        `;
      case "lg":
        return `
          padding: 1rem 2rem;
          font-size: 1rem;
          min-height: 3rem;
        `;
      default:
        return "";
    }
  }}
  
  ${(props) =>
    props.fullWidth &&
    `
    width: 100%;
  `}
`;

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
