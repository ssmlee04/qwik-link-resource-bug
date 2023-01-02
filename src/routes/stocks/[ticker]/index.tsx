import { component$, Resource, useStore, useContext } from '@builder.io/qwik';
import { useLocation, useNavigate, DocumentHead, useEndpoint } from '@builder.io/qwik-city';
import { SiteContext } from '~/routes/context';
import type { RequestHandler } from '@builder.io/qwik-city';
import Company from '~/components/companies/company';
import StockPosts from '~/components/common/stock-posts'
import FinancialsPage from '~/components/stocks/financials-page';
import ChartsPage from '~/components/stocks/charts-page';
import config from '~/config';
import { plussign, color } from '~/helper'
import { Link } from '@builder.io/qwik-city';

interface ApiData {
  profile: any,
}

export const onGet: RequestHandler<ApiData> = async ({ params }: any) => { 
  try {
    const profile = await getData();
    return {
      profile
    }
  } catch(err) {
    return {
      profile: {}
    }
  }
};

export default component$(() => {
  const mainData = useEndpoint<ApiData>();

  return (
    <Resource
      value={mainData}
      onPending={() => <>Loading...</>}
      onRejected={() => <>Error loading data</>}
      onResolved={({ profile }) => {
        const title = profile.title
        return (<>
          <span>{title}</span>
          <Link href={'/'}>Home Page</Link>
        </>)
      }}
    />
  );
});

export async function getData(): Promise<any[]> {
  const resp = await fetch(`https://developer.mozilla.org/en-US/docs/Web/API/Response/bcd.json`);
  return await resp.json();
}
