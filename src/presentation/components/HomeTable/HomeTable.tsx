import { Table, TableCell, TableRow } from "./HomeTable.Styles";
import { BodyText, H2CategoryTitle } from "@src/presentation/components/Texts";
import { TableHeaderCell } from "@src/presentation/components/TableHeaderCell";
import { Publication } from "@src/domain/Publication";

interface HomeTableProps {
  publications: Publication[];
}

function HomeTable({ publications }: HomeTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeaderCell $width={20}>
            <BodyText color={"gray"}>Name</BodyText>
          </TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {publications.map((item) => (
          <TableRow key={item.title}>
            <TableCell $pointer onClick={() => void 0} $width={20}>
              <H2CategoryTitle>{item.title}</H2CategoryTitle>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

export { HomeTable };
