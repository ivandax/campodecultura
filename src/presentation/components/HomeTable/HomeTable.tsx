import { Table, TableCell, TableRow } from "./HomeTable.Styles";
import { BodyText, H2CategoryTitle } from "@src/presentation/components/Texts";
import { TableHeaderCell } from "@src/presentation/components/TableHeaderCell";
import { Post } from "@src/domain/Post";
import { timestampToHumanReadbleDate } from "@src/presentation/utils";
import { useNavigate } from "react-router-dom";

interface HomeTableProps {
  posts: Post[];
}

function HomeTable({ posts }: HomeTableProps) {
  const navigate = useNavigate();

  return (
    <Table>
      <thead>
        <tr>
          <TableHeaderCell $width={20}>
            <BodyText color={"gray"}>Título</BodyText>
          </TableHeaderCell>
          <TableHeaderCell $width={20}>
            <BodyText color={"gray"}>Fecha de publicación</BodyText>
          </TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {posts.length === 0 && (
          <TableRow>
            <TableCell>No hay datos</TableCell>
            <TableCell></TableCell>
          </TableRow>
        )}
        {posts.map((item) => (
          <TableRow
            key={item.title}
            onClick={() => navigate(`/view/${item.id}`)}
          >
            <TableCell $pointer onClick={() => void 0} $width={20}>
              <H2CategoryTitle>{item.title}</H2CategoryTitle>
            </TableCell>
            <TableCell $pointer onClick={() => void 0} $width={20}>
              <H2CategoryTitle>
                {timestampToHumanReadbleDate(item.createdOn, "es")}
              </H2CategoryTitle>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

export { HomeTable };
