import * as S from './LandingPage.Styles';
import { MainButton } from '@src/presentation/components/Buttons/MainButton';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@src/presentation/store/authStore';
import { useTheme } from 'styled-components';
import { LatestPostsTable } from '@src/presentation/components/LatestPostsTable/LatestPostsTable';
import { useTranslation } from 'react-i18next';

function LandingPage() {
  const navigate = useNavigate();
  const { userTask } = useAuthStore();
  const user = userTask.status === 'successful' ? userTask.data : null;
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <S.Wrapper>
      <S.IntroSection>
        <S.Title>
          {t('landingPage.welcome')} <span>CultureTxt</span>
        </S.Title>
        <S.Subtitle>{t('landingPage.subtitle')}</S.Subtitle>
        <S.Description>{t('landingPage.description')}</S.Description>

        <S.Description>
          {t('landingPage.save-ideas')}{' '}
          <S.ColorSpan $color={theme.colors.blue}>
            {t('landingPage.drafts')}
          </S.ColorSpan>{' '}
          {t('landingPage.keep-personal')}{' '}
          <S.ColorSpan $color={theme.colors.primary}>
            {t('landingPage.publish')}
          </S.ColorSpan>{' '}
          {t('landingPage.share-stories')}
        </S.Description>

        <S.ActionBlock>
          {user ? (
            <MainButton onClick={() => navigate(`/posts/${user?.id}/create`)}>
              {t('landingPage.start-writing')}
            </MainButton>
          ) : (
            <MainButton onClick={() => navigate('/login')}>
              {t('landingPage.join-and-start-writing')}
            </MainButton>
          )}
        </S.ActionBlock>
      </S.IntroSection>

      <S.Features>
        <S.FeatureCard>
          <h4>{t('landingPage.create-title')}</h4>
          <p>{t('landingPage.create-desc')}</p>
        </S.FeatureCard>

        <S.FeatureCard>
          <h4>{t('landingPage.discover-title')}</h4>
          <p>{t('landingPage.discover-desc')}</p>
        </S.FeatureCard>

        <S.FeatureCard>
          <h4>{t('landingPage.connect-title')}</h4>
          <p>{t('landingPage.connect-desc')}</p>
        </S.FeatureCard>
      </S.Features>

      <S.IntroSection>
        <S.SectionTitle>{t('landingPage.latest-posts')}</S.SectionTitle>
        <LatestPostsTable />
      </S.IntroSection>
    </S.Wrapper>
  );
}

export { LandingPage };
