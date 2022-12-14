import styled from 'styled-components'
import HeaderMain from '../components/Header'
import FooterMain from '../components/Footer'
import ReviewRegisterForm from '../components/ReviewRegisterForm'
import StudyViewForm from '../components/StudyViewForm';
import { loginCheck } from '../common/loginCheck'

function ReviewRegister() {
    const jwtToken = loginCheck();
    
    return (
      <div>
        <HeaderMain />
          <ContentContainer className="container">
            <StudyViewForm></StudyViewForm>
            <ReviewRegisterForm />
          </ContentContainer>
        <FooterMain />
      </div>
    );
}

const ContentContainer = styled.div`
    max-width: 1320px;
`

export default ReviewRegister;