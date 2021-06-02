import React from 'react';
import { Location } from 'history';
import { RouteComponentProps } from 'react-router-dom';

import { RenderShabads } from '../../../components/RenderShabads';
import BreadCrumb from '../../../components/Breadcrumb';
import { TEXTS } from '../../../constants';
interface LocationState {
  prevPath?: string
}
interface IAmritKeertanShabadsProps extends RouteComponentProps<{}> {
  location: Location<LocationState>
}

export const AmritKeertanShabads: React.FC<IAmritKeertanShabadsProps> = (props) => {
  const previousUrl = (props.location.state && props.location.state.prevPath) || '/index';
  const links = [
    {
      url: previousUrl, title: TEXTS.URIS.INDEX,
    }, {
      title: TEXTS.URIS.AMRIT_KEERTAN
    }
  ]
  return (
    <div className="amritKeertanShabads row">
      <BreadCrumb links={links} />
      <RenderShabads {...props} />
    </div>
  )
}