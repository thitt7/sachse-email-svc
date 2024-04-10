import React from 'react';
import AlertCard from './AlertCard';
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Font } from "@react-email/font";
import { Link } from "@react-email/link";
import { Hr } from "@react-email/hr";

import styles from '@styles/home.module.scss';

type User = {
  _id: string;
  email: string;
  alerts: string;
  events: string;
  'g-recaptcha-response': string;
  news: string;
}

type AlertData = {
  Alerts: any[];
  Events: any[];
  News: any[];
}

type emailTemplateProps = {
  userData: any;
  alertData: AlertData;
}

const containerStyles = {
  maxWidth: '600px',
  margin: 'auto',
  background: '#28303f',
  borderRadius: '7px'
}

const headingStyles = {
  color: 'white',
  // textAlign: 'center',
  padding: '20px',
  background: '#364157',
  borderRadius: '7px 7px 0 0',
  fontWeight: 'bold',
}

const h3Style = {
  color: 'white',
  padding: '10px 20px 10px 20px',
  fontSize: '18px',
}

const footer = {
  display: 'block',
  color: 'white',
  // margin: '20px',
  padding: '15px 20px 20px 20px',
}

const EmailTemplate = ({ userData, alertData }: emailTemplateProps) => {

  const { alerts: alertsPref, events: eventsPref, news: newsPref } = Object.entries(userData).reduce((acc: any, [key, value]) => {
    if (value == 'on') { acc[key] = true; }
    else if (value == 'off') { acc[key] = false; }
    return acc;
  }, {});

  const { Alerts, Events, News } = Object.entries(alertData).reduce((acc: any, [key, value]) => {
    if (key == 'Alerts') {
      acc[key] = value.map((el) => {
        const url = `https://sachse.city/alerts/${el._id.toString()}`;
        return { ...el, url: url }
      });
    }
    else if (key === 'Events') {
      acc[key] = value.map((el) => {
        const url = `https://sachse.city/events?id=${el._id.toString()}`;
        const { description, ...rest } = el;
        return { ...rest, body: description?.html || '', url: url }
      });
    }
    else if (key === 'News') {
      acc[key] = value.map((el) => {
        const url = `https://sachse.city/news/${el.slug}`;
        const { body, ...rest } = el;
        return { ...rest, body: body?.html || '', url: url }
      });
    }
    return acc;
  }, {});

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Jost"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap",
            format: "woff2",
          }}
        />
        <div>
          <div style={containerStyles}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={headingStyles}>See what's new in Sachse this week!</h1>
            </div>
            {alertsPref ?
              <>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={h3Style}>Latest Police Alerts</h3>
                </div>
                {Alerts.map((alert: any, i: number) => {
                  return (<AlertCard Alert={alert} key={i} />)
                })}
              </>
              : <></>}
            {eventsPref ?
              <>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={h3Style}>Upcoming Events</h3>
                </div>
                {Events.map((event: any, i: number) => {
                  return (<AlertCard Alert={event} key={i} />)
                })}
              </>
              : <></>}
            {newsPref ?
              <>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={h3Style}>Recent News</h3>
                </div>
                {News.map((news: any, i: number) => {
                  return (<AlertCard Alert={news} key={i} />)
                })}
              </>
              : <></>}
              {/* <Hr style={{color: '#3c4861'}}/> */}
              <span style={{...footer, textAlign: 'center'}}>
                <p>This email was sent by <Link href='https://sachse.city/'>Sachse Community Site</Link> to <Link href={`mailto:${userData.email}`}>{`${userData.email}`}</Link></p>
                <p>To stop receiving emails, click <Link href={`https://sachse.city/unsubscribe?id=r5uXKno_3K2bTv7u-H2atD3ZxaZPAzQu7660FWF3m5GXZzj`}>Unsubscribe</Link></p>
                {/* <p>To edit these settings, change your preferences, or <Link href={`https://sachse.city/unsubscribe?id=${userData[0]['g-recaptcha-response']}`}>Unsubscribe</Link></p> */}
                <p>If you have questions, concerns, or suggestions, please email me at <Link href='mailto:support@sachse.city'>support@sachse.city</Link></p>
              </span>
          </div>
        </div>
      </Head>
    </Html>
  )
}

export default EmailTemplate;