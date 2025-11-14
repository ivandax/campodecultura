import * as S from "./Banner.Styles";

interface NotificationBannerProps {
  visible: boolean;
}

function NotificationBanner({ visible }: NotificationBannerProps) {
  if (!visible) return null;

  return (
    <S.Banner>Please verify your account to unlock all features.</S.Banner>
  );
}

export { NotificationBanner };
