export const dynamic = 'force-dynamic';

import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import EmailTemplate from '@components/emailTemplate';
import { Resend } from 'resend';
import clientPromise from '@lib/mongodb';

const resend = new Resend(process.env.RESEND_API_KEY);

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
        const data = await resend.batch.send(Users.map((user, i) => {
            // if (user.unsubscribed) {return}
            return {
                from: 'Sachse Community Site <alerts@sachse.city>',
                to: [user.email],
                subject: 'Your alert for: Sachse Alerts, News & Events!',
                react: EmailTemplate({ userData: user, alertData: alertData })
            }
        }));

        let response: NextResponse = NextResponse.json(data);
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

        return response;
    } catch (error) {
        console.error(error)
        return Response.json({ error });
    }
}
