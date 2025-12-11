import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Table,
  TableRow,
  TableCell,
  StatusChip,
} from './AllUsers.Styles';
import { BodyText, H2CategoryTitle } from '@src/presentation/components/Texts';
import { ViewTitle } from '@src/presentation/components/ViewTitle';
import { TableHeaderCell } from '@src/presentation/components/TableHeaderCell';
import { getAllUsers } from '@src/persistence/user';
import { AppUser } from '@src/domain/AppUser';
import { AsyncOp } from '@src/presentation/types/AsyncOp';
import {
  notifyError,
  timestampToHumanReadbleDate,
} from '@src/presentation/utils';
import { Spinner } from '@src/presentation/components/Spinner';
import { useAuthStore } from '@src/presentation/store/authStore';
import { useCopyToClipboard } from '@src/presentation/hooks/use-copy-to-clipboard';

const AllUsers: React.FC = () => {
  const { t } = useTranslation();
  const appUserTask = useAuthStore((state) => state.userTask);
  const [usersTask, setUsersTask] = useState<AsyncOp<AppUser[], null>>({
    status: 'pending',
  });

  useEffect(() => {
    const handleGetUsers = async () => {
      if (appUserTask.status !== 'successful') {
        return;
      }
      if (appUserTask.data?.role !== 'DEV') {
        notifyError(t('allUsers.accessDenied'));
        return;
      }
      setUsersTask({ status: 'in-progress' });
      const result = await getAllUsers();

      if (result.error) {
        notifyError(t('allUsers.errorLoading'));
        return;
      }
      setUsersTask({ status: 'successful', data: result.data });
    };
    handleGetUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appUserTask.status, t]);

  const copyToClipboard = useCopyToClipboard();

  return (
    <Container>
      <ViewTitle>{t('allUsers.title')}</ViewTitle>
      <Table>
        <thead>
          <tr>
            <TableHeaderCell $width={25}>
              <BodyText color={'gray'}>{t('allUsers.name')}</BodyText>
            </TableHeaderCell>
            <TableHeaderCell $width={30}>
              <BodyText color={'gray'}>{t('allUsers.email')}</BodyText>
            </TableHeaderCell>
            <TableHeaderCell $width={15}>
              <BodyText color={'gray'}>{t('allUsers.role')}</BodyText>
            </TableHeaderCell>
            <TableHeaderCell $width={20}>
              <BodyText color={'gray'}>{t('allUsers.createdOn')}</BodyText>
            </TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {usersTask.status === 'in-progress' && (
            <TableRow>
              <TableCell colSpan={5}>
                <Spinner />
              </TableCell>
            </TableRow>
          )}
          {usersTask.status === 'successful' && usersTask.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>{t('allUsers.noUsers')}</TableCell>
            </TableRow>
          )}
          {usersTask.status === 'successful' &&
            usersTask.data.length > 0 &&
            usersTask.data.map((user) => (
              <TableRow key={user.id} onClick={() => copyToClipboard(user.id)}>
                <TableCell>
                  <H2CategoryTitle>
                    {user.name === '' ? t('allUsers.noName') : user.name}
                  </H2CategoryTitle>
                </TableCell>
                <TableCell>
                  <BodyText>{user.email}</BodyText>
                </TableCell>
                <TableCell>
                  <StatusChip $role={user.role}>{user.role}</StatusChip>
                </TableCell>
                <TableCell>
                  <BodyText>
                    {timestampToHumanReadbleDate(user.createdOn, 'en')}
                  </BodyText>
                </TableCell>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export { AllUsers };
