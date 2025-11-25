import React from 'react';
import { useTranslation } from 'react-i18next';

import { SidebarWrapper, SidebarTitle } from './Sidebar.Styles';
import { SidebarItems } from '../SidebarItems';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <SidebarWrapper>
      <SidebarTitle>{t('sidebar.title')}</SidebarTitle>
      <SidebarItems displayOn="desktop" />
    </SidebarWrapper>
  );
};

export { Sidebar };
