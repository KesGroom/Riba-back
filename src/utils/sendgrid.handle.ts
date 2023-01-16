import sgMail from "@sendgrid/mail";

export const generate = async (to: string, code: string) => {
    try {
        sgMail.setApiKey("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");
        const msg = {
            to, // Change to your recipient
            from: 'ribasena458@gmail.com', // Change to your verified sender
            subject: 'Código de recuperación',
            text: 'Utiliza este código para reestablecer tu contraseña:',
            html: `<strong>${code}</strong>`,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);

    }
}
