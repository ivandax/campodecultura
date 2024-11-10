import { Table, TableCell, TableRow } from "./HomeTable.Styles";
import { BodyText, H2CategoryTitle } from "@src/presentation/components/Texts";
import { TableHeaderCell } from "@src/presentation/components/TableHeaderCell";
import { Post } from "@src/domain/Post";

interface HomeTableProps {
  posts: Post[];
}

function HomeTable({ posts }: HomeTableProps) {
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
        {posts.map((item) => (
          <TableRow key={item.title}>
            <TableCell $pointer onClick={() => void 0} $width={20}>
              <H2CategoryTitle>{item.title}</H2CategoryTitle>
            </TableCell>
            <TableCell $pointer onClick={() => void 0} $width={20}>
              <H2CategoryTitle>{item.createdOn}</H2CategoryTitle>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

export { HomeTable };
