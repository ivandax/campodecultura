import { Table, TableCell, TableRow } from "./HomeTable.Styles";
import { BodyText, H2CategoryTitle } from "@src/presentation/components/Texts";
import { TableHeaderCell } from "@src/presentation/components/TableHeaderCell";
import { Post } from "@src/domain/Post";
import {
  notifyError,
  timestampToHumanReadbleDate,
} from "@src/presentation/utils";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "@src/persistence/post";
import { AsyncOp } from "@src/presentation/types/AsyncOp";
import { Spinner } from "../Spinner";

interface HomeTableProps {
  isAdmin: boolean;
}

function HomeTable({ isAdmin }: HomeTableProps) {
  const navigate = useNavigate();
  const [postsTask, setPostsTask] = useState<AsyncOp<Post[], null>>({
    status: "pending",
  });

  useEffect(() => {
    const handleGetPosts = async () => {
      setPostsTask({ status: "in-progress" });
      const posts = await getPosts(isAdmin);

      if (posts.error) {
        notifyError("Error loading posts");
        return;
      }
      setPostsTask({ status: "successful", data: posts.data });
    };
    handleGetPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <TableHeaderCell $width={20}>
            <BodyText color={"gray"}>Title</BodyText>
          </TableHeaderCell>
          <TableHeaderCell $width={20}>
            <BodyText color={"gray"}>Published date</BodyText>
          </TableHeaderCell>
          <TableHeaderCell $width={20}>
            <BodyText color={"gray"}>Status</BodyText>
          </TableHeaderCell>
          <TableHeaderCell $width={20}>
            <BodyText color={"gray"}>Author</BodyText>
          </TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {postsTask.status === "in-progress" && (
          <TableRow>
            <TableCell>
              <Spinner />
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        )}
        {postsTask.status === "successful" && postsTask.data.length === 0 && (
          <TableRow>
            <TableCell>No data</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        )}
        {postsTask.status === "successful" &&
          postsTask.data.length > 0 &&
          postsTask.data.map((item) => (
            <TableRow
              key={item.title}
              onClick={() => navigate(`/view/${item.id}`)}
            >
              <TableCell $pointer onClick={() => void 0} $width={20}>
                <H2CategoryTitle>{item.title}</H2CategoryTitle>
              </TableCell>
              <TableCell $pointer onClick={() => void 0} $width={20}>
                <H2CategoryTitle>
                  {timestampToHumanReadbleDate(item.createdOn, "en")}
                </H2CategoryTitle>
              </TableCell>
              <TableCell $pointer onClick={() => void 0} $width={20}>
                <BodyText>{item.status}</BodyText>
              </TableCell>
              <TableCell $pointer onClick={() => void 0} $width={20}>
                <BodyText>{item.author?.name}</BodyText>
              </TableCell>
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
}

export { HomeTable };
