import React, { useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Location } from 'history';

import ShabadContent from '../ShabadContent';
import Fetch from '../Fetch';
import { pageView } from '../../util/analytics';
import {
  getBaaniUrl,
  getRouteValue,
  getPageView,
  getGurbani
} from './utils';

interface MatchParams {
  shabadId?: string;
}

interface IRenderShabadsProps extends RouteComponentProps<MatchParams> {
  location: Location
  sundarGutkaBaaniId?: number
}

export const RenderShabads: React.FC<IRenderShabadsProps> = ({ match, location, sundarGutkaBaaniId }) => {
  const { url, params: { shabadId } } = match;
  const { pathname } = location;
  const id = shabadId || sundarGutkaBaaniId;
  const routeValue = getRouteValue(pathname);
  const baaniUrl = getBaaniUrl({ id, routeValue });
  const pageViewUrl = getPageView({ id, routeValue });

  useEffect(() => {
    pageView(`${pageViewUrl}`);
    // Just making sure that we are always on top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageViewUrl])

  return (
    <div className="baani">
      <Fetch url={`${baaniUrl}`}>
        {({ data, error, loading }) => {

          if (loading) {
            return <div className="spinner" />
          }

          return (
            <ShabadContent
              type="shabad"
              info={data.baniInfo || data.shabadInfo}
              nav={data.nav}
              gurbani={getGurbani({ data, routeValue })}
              hideMeta
              controlProps={{
                disableSplitView: true,
              }}
            />
          )
        }}
      </Fetch>
    </div>
  );
}
