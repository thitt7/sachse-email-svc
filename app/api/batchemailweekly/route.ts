export const dynamic = 'force-dynamic';

import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import EmailTemplate from '@components/emailTemplate';
import { Resend } from 'resend';
import clientPromise from '@lib/mongodb';

const resend = new Resend(process.env.RESEND_API_KEY);

const dummyData = [
    {
        email: "thitt9@gmail.com",
        alerts: "on",
        events: "on",
        grecaptcharesponse: "03AFcWeA70eGIHlZSG1ucQhyz5bO1Ktj7yBuUdRXaqICPDf2GlhFJdC-46ZgfkeeeQeq3HNh8UuBccllcp8AT_Ti44ga-_9HRDbCtdth_CmKC65IQtR2ZjzzZSTxV-cQEbNFmvyyRH2ar5uXKno_3K2bTv7u-H2atD3ZxaZPAzQu7660FWF3m5GXZzjhnBXZLVAhJklM5nHIy22QWvmorYfZ7km5iO8QLGlui8_8jrGiHQ659MshD7CszsQsTw8XwqT95Ly8kWnNiqs6oGyrKbY9ptxn4bQdQ0IuKWe9TbK3Wwyc4lzkXIA5sobanS5XHlpO2P5Kf_E60_pu3YU9vDGfcEi_b4GYhAn0jwJc7VujJ9gGg4qIRM4eg-mb_1SGxleQM9xzLG5clGrD8gXAO4_AoyrPgOsFIsFIFoxqqwOkSu7l7vIb86amXvErQehNulaitLlyUaNAPnTsexalalstJeae5FG3xwFpvVI8ZVnLsF8US93GsP0_y7MWC9sgAB_WRdsy7TcLVRenoqVLDyLyjgCnBk0C-Q_6t0nCbiWskIxYqGCvqBQ0JBltR6UGNLb54DUYvLmRTEc5zguHKdR-3KN4ldzkUwC5ROEa87Eq8-2PMsS2m5o4qWQaiSA7OoyQI1BU1iQxmMwHActHGHGliKDZzxjJrB3qbX-0fxAwAaobjob1ow3C8kIpZofprZ1_flGANEKeaUt-SEtAzyfSw_Kmr-qPk4L48ape0lqhw1_ioZfqNlYLQtrcAMAgOBIHJVVHl4xsz-H9aXuNQiVZkzcGejfsdGAgzCoeLhQfMo1PZjN3S-83DzikUIs6mEzxqz0c-XwlWyeeKak707Ehy8f0cE-NW5JvTcPIPT54kOz1e0aTX_CY-nOzDSrT965SQ6u-MCYazYDCzzbjn5-1NJ2mRepMVXa9uIZDzEsvgtl3chnSw9cPikqcytUlwSduOsTN0liBmflg8MgwFlEzhY9VBDSSfiN-e8A4ONH_2nkuZs97LwsuoLf5a-Qglbgj_O-WpzttkFmGEqcEN0YQByvPfP2eMhPhmzwFgg4CWZQddM75O8Lke2lzun962_50julUEs_z3T2VJOGnm4ZGMHmtVC0TAHzSjtXRYZ28Q_h0yr_Q1DBlKzucJsRsfPjRjLA35GQYWH_NYZJBm3PY7e7sO2te2VfG_Wd1QPGmT2wamiCoOqkfGxcTnIUzMG4ZO8DKzfPjfJ4fGJtvrY0y6hERxik5bQvPZH1LDhOqAOGVvMFcENpM_nczHGMFbH3OHbKasFUCN5Vw88trsCGNboUtZ3M5HAZeV29XH8ZbgmSjvPErs-j-dHW2Ur6jZ_QcQEwDYy-SCkmOMFMo0vIVyD1O2-Z4lV6UMWRl27617hgK4ZVeW2kv8R3ePX3eFlK8c9VE6rasn9garJYyiYePpU7-az7uW5mcV1fqIXBhcJNkQsSx_cNhb7GPSfHVk8FF72j0iX-nVaC0uMwAIrloRjbWcUxcoCqvqoKpd20xrDAiwiYtZduuc7YEVYaxIY2F-RR1t_oWBU36dIMXBHED86fCgwvdcyg4uzYbRX30tQAFif8aZ1SK_dQeOel8RWq7IlWqCse1n0tWVDwzZuxe1tS3GaWw71WZc0M2jet5EVOFXdc69vUQhNXDN0M83UcyiQQAKrbt04iuRc5Hc8mnAtWM1BwwzN75x0t5Ro68gRMUfXNM0-ta85c2N8q94G6Um3oPB-3k-WU-NAcQKMqS7SQ8VYpGqdj2NNk0XsFJs78Um7JNTaTDRsQQNDXM2oDwJlgJdoN3rTqEgqwLVBfJBXB5BWuofDpee1fLWMIpjdZPgKCwSpKIPgNmd-_8EWHhWtBuQJCJRk3ODT01MmauZwQzCEATbXNsYsP93dBIuv8tMn_qjQSWU",
        news: "on",
        unsubscribed: 'false'
    },
    {
        email: "tristan@hitt.dev",
        alerts: "on",
        events: "on",
        grecaptcharesponse: "03AFcWeA70eGIHlZSG1ucQhyz5bO1Ktj7yBuUdRXaqICPDf2GlhFJdC-46ZgfkeeeQeq3HNh8UuBccllcp8AT_Ti44ga-_9HRDbCtdth_CmKC65IQtR2ZjzzZSTxV-cQEbNFmvyyRH2ar5uXKno_3K2bTv7u-H2atD3ZxaZPAzQu7660FWF3m5GXZzjhnBXZLVAhJklM5nHIy22QWvmorYfZ7km5iO8QLGlui8_8jrGiHQ659MshD7CszsQsTw8XwqT95Ly8kWnNiqs6oGyrKbY9ptxn4bQdQ0IuKWe9TbK3Wwyc4lzkXIA5sobanS5XHlpO2P5Kf_E60_pu3YU9vDGfcEi_b4GYhAn0jwJc7VujJ9gGg4qIRM4eg-mb_1SGxleQM9xzLG5clGrD8gXAO4_AoyrPgOsFIsFIFoxqqwOkSu7l7vIb86amXvErQehNulaitLlyUaNAPnTsexalalstJeae5FG3xwFpvVI8ZVnLsF8US93GsP0_y7MWC9sgAB_WRdsy7TcLVRenoqVLDyLyjgCnBk0C-Q_6t0nCbiWskIxYqGCvqBQ0JBltR6UGNLb54DUYvLmRTEc5zguHKdR-3KN4ldzkUwC5ROEa87Eq8-2PMsS2m5o4qWQaiSA7OoyQI1BU1iQxmMwHActHGHGliKDZzxjJrB3qbX-0fxAwAaobjob1ow3C8kIpZofprZ1_flGANEKeaUt-SEtAzyfSw_Kmr-qPk4L48ape0lqhw1_ioZfqNlYLQtrcAMAgOBIHJVVHl4xsz-H9aXuNQiVZkzcGejfsdGAgzCoeLhQfMo1PZjN3S-83DzikUIs6mEzxqz0c-XwlWyeeKak707Ehy8f0cE-NW5JvTcPIPT54kOz1e0aTX_CY-nOzDSrT965SQ6u-MCYazYDCzzbjn5-1NJ2mRepMVXa9uIZDzEsvgtl3chnSw9cPikqcytUlwSduOsTN0liBmflg8MgwFlEzhY9VBDSSfiN-e8A4ONH_2nkuZs97LwsuoLf5a-Qglbgj_O-WpzttkFmGEqcEN0YQByvPfP2eMhPhmzwFgg4CWZQddM75O8Lke2lzun962_50julUEs_z3T2VJOGnm4ZGMHmtVC0TAHzSjtXRYZ28Q_h0yr_Q1DBlKzucJsRsfPjRjLA35GQYWH_NYZJBm3PY7e7sO2te2VfG_Wd1QPGmT2wamiCoOqkfGxcTnIUzMG4ZO8DKzfPjfJ4fGJtvrY0y6hERxik5bQvPZH1LDhOqAOGVvMFcENpM_nczHGMFbH3OHbKasFUCN5Vw88trsCGNboUtZ3M5HAZeV29XH8ZbgmSjvPErs-j-dHW2Ur6jZ_QcQEwDYy-SCkmOMFMo0vIVyD1O2-Z4lV6UMWRl27617hgK4ZVeW2kv8R3ePX3eFlK8c9VE6rasn9garJYyiYePpU7-az7uW5mcV1fqIXBhcJNkQsSx_cNhb7GPSfHVk8FF72j0iX-nVaC0uMwAIrloRjbWcUxcoCqvqoKpd20xrDAiwiYtZduuc7YEVYaxIY2F-RR1t_oWBU36dIMXBHED86fCgwvdcyg4uzYbRX30tQAFif8aZ1SK_dQeOel8RWq7IlWqCse1n0tWVDwzZuxe1tS3GaWw71WZc0M2jet5EVOFXdc69vUQhNXDN0M83UcyiQQAKrbt04iuRc5Hc8mnAtWM1BwwzN75x0t5Ro68gRMUfXNM0-ta85c2N8q94G6Um3oPB-3k-WU-NAcQKMqS7SQ8VYpGqdj2NNk0XsFJs78Um7JNTaTDRsQQNDXM2oDwJlgJdoN3rTqEgqwLVBfJBXB5BWuofDpee1fLWMIpjdZPgKCwSpKIPgNmd-_8EWHhWtBuQJCJRk3ODT01MmauZwQzCEATbXNsYsP93dBIuv8tMn_qjQSWU",
        news: "on",
        unsubscribed: 'false'
    },
    {
        email: "thitt8@gmail.com",
        alerts: "off",
        events: "off",
        grecaptcharesponse: "03AFcWeA70eGIHlZSG1ucQhyz5bO1Ktj7yBuUdRXaqICPDf2GlhFJdC-46ZgfkeeeQeq3HNh8UuBccllcp8AT_Ti44ga-_9HRDbCtdth_CmKC65IQtR2ZjzzZSTxV-cQEbNFmvyyRH2ar5uXKno_3K2bTv7u-H2atD3ZxaZPAzQu7660FWF3m5GXZzjhnBXZLVAhJklM5nHIy22QWvmorYfZ7km5iO8QLGlui8_8jrGiHQ659MshD7CszsQsTw8XwqT95Ly8kWnNiqs6oGyrKbY9ptxn4bQdQ0IuKWe9TbK3Wwyc4lzkXIA5sobanS5XHlpO2P5Kf_E60_pu3YU9vDGfcEi_b4GYhAn0jwJc7VujJ9gGg4qIRM4eg-mb_1SGxleQM9xzLG5clGrD8gXAO4_AoyrPgOsFIsFIFoxqqwOkSu7l7vIb86amXvErQehNulaitLlyUaNAPnTsexalalstJeae5FG3xwFpvVI8ZVnLsF8US93GsP0_y7MWC9sgAB_WRdsy7TcLVRenoqVLDyLyjgCnBk0C-Q_6t0nCbiWskIxYqGCvqBQ0JBltR6UGNLb54DUYvLmRTEc5zguHKdR-3KN4ldzkUwC5ROEa87Eq8-2PMsS2m5o4qWQaiSA7OoyQI1BU1iQxmMwHActHGHGliKDZzxjJrB3qbX-0fxAwAaobjob1ow3C8kIpZofprZ1_flGANEKeaUt-SEtAzyfSw_Kmr-qPk4L48ape0lqhw1_ioZfqNlYLQtrcAMAgOBIHJVVHl4xsz-H9aXuNQiVZkzcGejfsdGAgzCoeLhQfMo1PZjN3S-83DzikUIs6mEzxqz0c-XwlWyeeKak707Ehy8f0cE-NW5JvTcPIPT54kOz1e0aTX_CY-nOzDSrT965SQ6u-MCYazYDCzzbjn5-1NJ2mRepMVXa9uIZDzEsvgtl3chnSw9cPikqcytUlwSduOsTN0liBmflg8MgwFlEzhY9VBDSSfiN-e8A4ONH_2nkuZs97LwsuoLf5a-Qglbgj_O-WpzttkFmGEqcEN0YQByvPfP2eMhPhmzwFgg4CWZQddM75O8Lke2lzun962_50julUEs_z3T2VJOGnm4ZGMHmtVC0TAHzSjtXRYZ28Q_h0yr_Q1DBlKzucJsRsfPjRjLA35GQYWH_NYZJBm3PY7e7sO2te2VfG_Wd1QPGmT2wamiCoOqkfGxcTnIUzMG4ZO8DKzfPjfJ4fGJtvrY0y6hERxik5bQvPZH1LDhOqAOGVvMFcENpM_nczHGMFbH3OHbKasFUCN5Vw88trsCGNboUtZ3M5HAZeV29XH8ZbgmSjvPErs-j-dHW2Ur6jZ_QcQEwDYy-SCkmOMFMo0vIVyD1O2-Z4lV6UMWRl27617hgK4ZVeW2kv8R3ePX3eFlK8c9VE6rasn9garJYyiYePpU7-az7uW5mcV1fqIXBhcJNkQsSx_cNhb7GPSfHVk8FF72j0iX-nVaC0uMwAIrloRjbWcUxcoCqvqoKpd20xrDAiwiYtZduuc7YEVYaxIY2F-RR1t_oWBU36dIMXBHED86fCgwvdcyg4uzYbRX30tQAFif8aZ1SK_dQeOel8RWq7IlWqCse1n0tWVDwzZuxe1tS3GaWw71WZc0M2jet5EVOFXdc69vUQhNXDN0M83UcyiQQAKrbt04iuRc5Hc8mnAtWM1BwwzN75x0t5Ro68gRMUfXNM0-ta85c2N8q94G6Um3oPB-3k-WU-NAcQKMqS7SQ8VYpGqdj2NNk0XsFJs78Um7JNTaTDRsQQNDXM2oDwJlgJdoN3rTqEgqwLVBfJBXB5BWuofDpee1fLWMIpjdZPgKCwSpKIPgNmd-_8EWHhWtBuQJCJRk3ODT01MmauZwQzCEATbXNsYsP93dBIuv8tMn_qjQSWU",
        news: "on",
        unsubscribed: 'false'
    }
]

export async function GET(request: Request) {

    const client = await clientPromise;
    const db = client.db("sachse-site");
    const emails = await db.collection('emails');
    const alerts = await db.collection('alerts');
    const events = await db.collection('events');
    const news = await db.collection('news');

    const Users = await emails.find().toArray()
    const Alerts = await alerts.find().sort({ createdAt: -1 }).limit(3).toArray();
    const Events = await events.find({ start: { $gte: new Date(Date.now()) } })
        .sort({ start: 1 })
        .limit(3)
        .toArray()
    const News = await news.find().sort({ createdAt: -1 }).limit(3).toArray();

    const alertData = {
        Alerts: Alerts,
        Events: Events,
        News: News,
    }

    try {
        const data = await resend.batch.send(dummyData.map((user, i) => {
            // if (user.unsubscribed) {return}
            return {
                from: 'Sachse Community Site <alerts@sachse.city>',
                to: [user.email],
                subject: 'Your alert for: Sachse Alerts, News & Events!',
                react: EmailTemplate({ userData: user, alertData: alertData })
            }
        }));

        let response: NextResponse;

        response = NextResponse.json(data)
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

        // return new NextResponse(data, { status: 200, statusText: "OK", headers });
        // return Response.json(data);
        // return new Response(JSON.stringify(data), {
        //     status: 200,
        //     headers
        //   })
        return response;
    } catch (error) {
        console.error(error)
        return Response.json({ error });
    }
}
