import styled from 'styled-components';

export const PostContainer = styled.div<{ $highlighted: boolean }>`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  gap: 2rem;

  &:hover {
    background-color: #ebe7e7;
  }

  ${(props) =>
    props.$highlighted
      ? `
      background-color: #e0ffe0;
      border-color: #00cc00;
    `
      : null}
`;
