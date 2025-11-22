import { Table, TableCell, TableRow } from '../PostsTable/PostsTable.Styles';
import { BodyText, H2CategoryTitle } from '@src/presentation/components/Texts';
import { TableHeaderCell } from '@src/presentation/components/TableHeaderCell';
import { Post } from '@src/domain/Post';
import {
  notifyError,
  timestampToHumanReadbleDate,
} from '@src/presentation/utils';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLatestPosts } from '@src/persistence/post';
import { AsyncOp } from '@src/presentation/types/AsyncOp';
import { Spinner } from '../Spinner';

export function LatestPostsTable() {
  const navigate = useNavigate();
  const [postsTask, setPostsTask] = useState<AsyncOp<Post[], null>>({
    status: 'pending',
  });

  useEffect(() => {
    const handleGetPosts = async () => {
      setPostsTask({ status: 'in-progress' });
      const posts = await getLatestPosts(10);

      if (posts.error) {
        notifyError('Error loading posts');
        return;
      }
      setPostsTask({ status: 'successful', data: posts.data });
    };
    handleGetPosts();
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <TableHeaderCell $width={70}>
            <BodyText color={'gray'}>Title</BodyText>
          </TableHeaderCell>
          <TableHeaderCell $width={30}>
            <BodyText color={'gray'}>Published date</BodyText>
          </TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {postsTask.status === 'in-progress' && (
          <TableRow>
            <TableCell>
              <Spinner />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        )}
        {postsTask.status === 'successful' && postsTask.data.length === 0 && (
          <TableRow>
            <TableCell>No data</TableCell>
            <TableCell></TableCell>
          </TableRow>
        )}
        {postsTask.status === 'successful' &&
          postsTask.data.length > 0 &&
          postsTask.data.map((item) => (
            <TableRow
              key={item.id}
              onClick={() =>
                navigate(`/posts/${item.author?.id}/view/${item.id}`)
              }
            >
              <TableCell $pointer onClick={() => void 0} $width={70}>
                <H2CategoryTitle>{item.title}</H2CategoryTitle>
              </TableCell>
              <TableCell $pointer onClick={() => void 0} $width={30}>
                <H2CategoryTitle>
                  {timestampToHumanReadbleDate(item.createdOn, 'en')}
                </H2CategoryTitle>
              </TableCell>
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
}
