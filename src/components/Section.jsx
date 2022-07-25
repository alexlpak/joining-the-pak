import styled, { css } from 'styled-components';

const SectionStyled = styled.section`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
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
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    ${({ $centered }) => {
        if ($centered) return css`
            align-items: center;
        `;
    }}
`;

const Section = ({ backgroundImage, centered, as, color, children }) => {
    return (
        <SectionStyled as={as} $color={color} $backgroundImage={backgroundImage}>
            <SectionContents $centered={centered}>
                {children}
            </SectionContents>
        </SectionStyled>
    )
};

export default Section;