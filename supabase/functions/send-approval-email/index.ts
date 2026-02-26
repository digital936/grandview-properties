import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("re_741cJzpf_AHv18hrzm9NoF9VoZE3Ryf4F"));

serve(async (req) => {
  const { email, name, date, time } = await req.json();

  try {
    await resend.emails.send({
      from: "Grandview Realty <onboarding@resend.dev>",
      to: email,
      subject: "Your Property Tour is Approved ✅",
      html: `
        <h2>Hello ${name},</h2>
        <p>Your property tour has been approved.</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p>We look forward to seeing you!</p>
        <br/>
        <p>Grandview Realty</p>
      `,
    });

    return new Response("Email sent", { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
});