import React from 'react'
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Tab = ({ tabs }) => {
  

  return (
    <div className="message-tab-btns">
      {
        tabs.map((tab) => {
          return <TabBtn tab={tab.tab} badgeNo={tab.badgeNo} icon={tab.icon} route={tab.route} key={tab.tab}/>
        })
      }
    </div>
  )
}

const TabBtn = ({ tab, badgeNo, icon, route }) => {
  const toRoute = `/dashboard/messages${route}`;
  const location = useLocation().pathname;
  const className = toRoute === location ? 'tab-btn active' : 'tab-btn';


  return (
    <Link to={toRoute} className={className}>
      <FontAwesomeIcon icon={icon}/>
      <span>{tab}</span>
      {badgeNo ? <span className="badge">{badgeNo}</span>: null}
    </Link>
  )
}

export default Tab
