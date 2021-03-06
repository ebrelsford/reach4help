import get from 'lodash/get';
import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';
import LoginContainer from 'src/modules/login/containers/LoginContainer/LoginContainer';

import IntroWrapper from '../../../../../components/IntroComponent/IntroComponent';

const LoginRoute: React.FC = (): ReactElement => {
  const location = useLocation();
  return (
    <GradientBackground>
      <CenteredCard>
        <IntroWrapper>
          <LoginContainer redirectBack={get(location, 'state.redirectBack')} />
        </IntroWrapper>
      </CenteredCard>
    </GradientBackground>
  );
};
export default LoginRoute;
