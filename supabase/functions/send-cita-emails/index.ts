import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  try {
    const { nombre, telefono, email, servicio, mensaje, fecha_preferida, hora_preferida } =
      await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const OWNER_EMAIL = Deno.env.get("OWNER_EMAIL") || "onboarding@resend.dev";

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    const fechaTexto = fecha_preferida
      ? new Date(fecha_preferida + "T12:00:00").toLocaleDateString("es-MX", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Por confirmar";

    const horaTexto = hora_preferida || "Por confirmar";

    // ── 1. Confirmation email to user (only if email provided) ──
    if (email && email.trim()) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: [email.trim()],
          subject: "✅ Tu consultoría gratuita ha sido agendada — AHSE Tech",
          html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f7f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#00C2A8;padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:900;letter-spacing:-0.5px;">AHSE Tech</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Consultoría Gratuita Confirmada</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;font-size:16px;color:#1a1a2e;">Hola, <strong>${nombre}</strong> 👋</p>
            <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6;">
              Hemos recibido tu solicitud de consultoría gratuita. Nos pondremos en contacto contigo en menos de <strong>2 horas</strong> para confirmar los detalles.
            </p>

            <!-- Details card -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf9;border:1px solid #d1fae5;border-radius:12px;margin-bottom:24px;">
              <tr><td style="padding:24px;">
                <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#00C2A8;text-transform:uppercase;letter-spacing:1px;">Detalles de tu solicitud</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#888;width:140px;">Servicio:</td>
                    <td style="padding:6px 0;font-size:14px;color:#1a1a2e;font-weight:600;">${servicio}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#888;">Fecha preferida:</td>
                    <td style="padding:6px 0;font-size:14px;color:#1a1a2e;font-weight:600;">${fechaTexto}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#888;">Horario preferido:</td>
                    <td style="padding:6px 0;font-size:14px;color:#1a1a2e;font-weight:600;">${horaTexto}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#888;">Teléfono:</td>
                    <td style="padding:6px 0;font-size:14px;color:#1a1a2e;font-weight:600;">${telefono}</td>
                  </tr>
                  ${
                    mensaje
                      ? `<tr>
                    <td style="padding:6px 0;font-size:14px;color:#888;vertical-align:top;">Mensaje:</td>
                    <td style="padding:6px 0;font-size:14px;color:#1a1a2e;">${mensaje}</td>
                  </tr>`
                      : ""
                  }
                </table>
              </td></tr>
            </table>

            <p style="margin:0 0 8px;font-size:14px;color:#555;line-height:1.6;">
              Si tienes alguna pregunta, puedes contactarnos directamente:
            </p>
            <p style="margin:0 0 24px;font-size:14px;color:#555;">
              📞 <a href="tel:6181498960" style="color:#00C2A8;text-decoration:none;font-weight:600;">618 149 8960</a> &nbsp;|&nbsp;
              📞 <a href="tel:6181096537" style="color:#00C2A8;text-decoration:none;font-weight:600;">618 109 6537</a>
            </p>

            <p style="margin:0;font-size:14px;color:#555;">
              ¡Gracias por confiar en nosotros! 🚀<br>
              <strong style="color:#1a1a2e;">Equipo de AHSE Tech</strong>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8f8f8;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
            <p style="margin:0;font-size:12px;color:#aaa;">© 2026 AHSE Tech · Durango, México</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
          `,
        }),
      });
    }

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: [OWNER_EMAIL],
        subject: `🔔 Nueva cita agendada — ${nombre} (${servicio})`,
        html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f7f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#1a1a2e;padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#00C2A8;font-size:22px;font-weight:900;">🔔 Nueva Cita Recibida</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">Panel de AHSE Tech</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6;">
              Un nuevo cliente ha solicitado una consultoría gratuita. Aquí están los detalles:
            </p>

            <!-- Client details -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;border:1px solid #e9ecef;border-radius:12px;margin-bottom:24px;">
              <tr><td style="padding:24px;">
                <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#1a1a2e;text-transform:uppercase;letter-spacing:1px;">Datos del Cliente</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0;font-size:14px;color:#888;width:140px;border-bottom:1px solid #eee;">Nombre:</td>
                    <td style="padding:8px 0;font-size:14px;color:#1a1a2e;font-weight:700;border-bottom:1px solid #eee;">${nombre}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:14px;color:#888;border-bottom:1px solid #eee;">Teléfono:</td>
                    <td style="padding:8px 0;font-size:14px;border-bottom:1px solid #eee;">
                      <a href="tel:${telefono}" style="color:#00C2A8;font-weight:700;text-decoration:none;">${telefono}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:14px;color:#888;border-bottom:1px solid #eee;">Email:</td>
                    <td style="padding:8px 0;font-size:14px;border-bottom:1px solid #eee;">
                      ${
                        email
                          ? `<a href="mailto:${email}" style="color:#00C2A8;text-decoration:none;">${email}</a>`
                          : '<span style="color:#aaa;">No proporcionado</span>'
                      }
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:14px;color:#888;border-bottom:1px solid #eee;">Servicio:</td>
                    <td style="padding:8px 0;font-size:14px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #eee;">${servicio}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:14px;color:#888;border-bottom:1px solid #eee;">Fecha preferida:</td>
                    <td style="padding:8px 0;font-size:14px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #eee;">${fechaTexto}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:14px;color:#888;border-bottom:1px solid #eee;">Horario:</td>
                    <td style="padding:8px 0;font-size:14px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #eee;">${horaTexto}</td>
                  </tr>
                  ${
                    mensaje
                      ? `<tr>
                    <td style="padding:8px 0;font-size:14px;color:#888;vertical-align:top;">Mensaje:</td>
                    <td style="padding:8px 0;font-size:14px;color:#1a1a2e;">${mensaje}</td>
                  </tr>`
                      : ""
                  }
                </table>
              </td></tr>
            </table>

            <p style="margin:0;font-size:13px;color:#aaa;text-align:center;">
              Recuerda contactar al cliente en menos de 2 horas para confirmar la cita.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8f8f8;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
            <p style="margin:0;font-size:12px;color:#aaa;">AHSE Tech · Sistema de Citas Automático</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
        `,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});