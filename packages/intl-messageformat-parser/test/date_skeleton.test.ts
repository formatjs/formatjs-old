import { parse } from '../src/parser';
import { printAST } from '../src/printer';

test.each([
  `yyyy.MM.dd G 'at' HH:mm:ss vvvv`,
  `EEE, MMM d, ''yy`,
  `h:mm a`,
  ``
])('case: %p', skeleton => {
  const ast = parse(`{0, date, ::${skeleton}}`);
  expect(ast).toMatchSnapshot();
  expect(printAST(ast)).toMatchSnapshot();
});
