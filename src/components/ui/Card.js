import styled from "styled-components";

const StyledCard = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 0.75rem;
  box-shadow: ${(props) => props.theme.shadows.sm};
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.md};
  }

  ${(props) =>
    props.elevated &&
    `
    box-shadow: ${props.theme.shadows.lg};
    
    &:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  `}
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.surface};
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
`;

const CardSubtitle = styled.p`
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const CardFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.surface};
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const Card = ({
  children,
  title,
  subtitle,
  footer,
  elevated = false,
  ...props
}) => {
  return (
    <StyledCard elevated={elevated ? "true" : undefined} {...props}>
      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </StyledCard>
  );
};

export default Card;
