import { component$ } from '@builder.io/qwik';

export default component$(({ width = '100%' }) => {
  console.log(width)
  return (
    <input style={{ width }} placeholder={'Enter a stock ticker or company name'}/>
  );
});
