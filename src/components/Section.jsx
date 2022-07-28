import styled, { css } from 'styled-components';

const SectionStyled = styled.section`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: ${({ $color }) => $color || 'unset'};
    ${({ $backgroundImage }) => {
        if ($backgroundImage) {
            return css`
                &::before {
                    content: '';
                    width: 100%;
                    height: 100%;
                    background-image: ${({ $backgroundImage }) => `url(${$backgroundImage})`};
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: -1;
                    opacity: 0.10;
                };
            `;
        }
    }}

`;

const SectionContents = styled.div`
    max-width: 50rem;
    width: 100%;
    padding: ${({ $padding }) => $padding || '2rem'};
    display: flex;
    flex-direction: column;
    gap: ${({ $gap }) => $gap || '2rem'};
    ${({ $centered }) => {
        if ($centered) return css`
            align-items: center;
        `;
    }}
`;

const Section = ({ id, padding, backgroundImage, gap, centered, as, color, children }) => {
    return (
        <SectionStyled id={id} as={as} $color={color} $backgroundImage={backgroundImage}>
            <SectionContents $padding={padding} $gap={gap} $centered={centered}>
                {children}
            </SectionContents>
        </SectionStyled>
    )
};

export default Section;