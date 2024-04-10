import React from 'react';
import { Link } from "@react-email/link";
import { Hr } from "@react-email/hr";

const cardContainer = {
    color: 'white',
    background: '#3a4354',
    margin: '20px',
    padding: '15px',
    borderRadius: '7px',
}

const cardText = {
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    // display: '-webkit-box',
    display: 'block',
    overflow: 'hidden',
    fontWeight: 400,
    color: 'white',
    maxHeight: '100px',
}

const h4Styles = {
    color: 'white',
    fontSize: '15px',
    margin: '0 0 20px 0',
}

const dateText = {
    color: 'white'
}

const AlertCard = ({ Alert }: { Alert: any }) => {

    const { _id, URL, start, end, title, body, img, url } = Alert;

    return (
        <>
            <article style={cardContainer}>
                <div>
                    <Link href={url}>
                        <h4 style={h4Styles}>{title}</h4>
                    </Link>
                    <time style={dateText} dateTime={start || Alert.createdAt}>{new Date(start || Alert.createdAt).toLocaleString()}</time>
                    {/* <div> */}
                        <span style={cardText} dangerouslySetInnerHTML={{ __html: (Alert.body) }}></span>
                    {/* </div> */}
                </div>
                {/* <div className={styles.info}>
                    <div>{author}</div>
                    <Link href={`/events/?id=${_id}`}>
                        <button style={{ margin: 0 }}>READ MORE</button>
                    </Link>
                </div> */}
            </article>
            <Hr />
        </>
    )
}

export default AlertCard