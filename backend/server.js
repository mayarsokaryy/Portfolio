require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['POST', 'GET'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Nodemailer with Brevo SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || 'a27971001@smtp-brevo.com',
        pass: process.env.SMTP_PASS || process.env.BREVO_API_KEY
    },
    tls: {
        rejectUnauthorized: false // Accept self-signed certificates
    }
});

// Helper function to build main email HTML
function buildMainEmailHTML(formData, clientInfo) {
    const { name, email, subject, message } = formData;
    const { ip, userAgent, timestamp } = clientInfo;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Portfolio Contact Message</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                background-color: #f4f4f4; 
                margin: 0; 
                padding: 20px; 
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: #fff; 
                border-radius: 15px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
                overflow: hidden; 
            }
            .header { 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white; 
                padding: 40px 30px; 
                text-align: center; 
            }
            .header h1 { 
                margin: 0; 
                font-size: 28px; 
                font-weight: 700; 
            }
            .header p { 
                margin: 10px 0 0; 
                opacity: 0.9; 
                font-size: 16px; 
            }
            .content { 
                padding: 40px 30px; 
            }
            .field { 
                margin-bottom: 25px; 
                border-bottom: 1px solid #eee; 
                padding-bottom: 20px; 
            }
            .field:last-of-type { 
                border-bottom: none; 
            }
            .label { 
                font-weight: 600; 
                color: #667eea; 
                text-transform: uppercase; 
                font-size: 12px; 
                letter-spacing: 1px; 
                margin-bottom: 8px; 
            }
            .value { 
                font-size: 16px; 
                color: #333; 
                margin-top: 5px; 
            }
            .message-box { 
                background: #f8f9fa; 
                padding: 25px; 
                border-left: 5px solid #667eea; 
                border-radius: 8px; 
                margin-top: 10px;
                white-space: pre-wrap;
            }
            .footer { 
                background: #f8f9fa; 
                padding: 30px; 
                text-align: center; 
                color: #666; 
                border-top: 1px solid #eee; 
            }
            .meta-info { 
                background: #e9ecef; 
                padding: 20px; 
                border-radius: 8px; 
                font-size: 13px; 
                color: #666; 
                margin-top: 20px;
            }
            .reply-button {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 30px;
                border-radius: 8px;
                text-decoration: none;
                display: inline-block;
                font-weight: 600;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📧 New Contact Message</h1>
                <p>Someone reached out through your portfolio website</p>
            </div>
            
            <div class="content">
                <div class="field">
                    <div class="label">👤 From</div>
                    <div class="value">${escapeHtml(name)}</div>
                </div>
                
                <div class="field">
                    <div class="label">📧 Email</div>
                    <div class="value">
                        <a href="mailto:${escapeHtml(email)}" style="color: #667eea; text-decoration: none;">
                            ${escapeHtml(email)}
                        </a>
                    </div>
                </div>
                
                <div class="field">
                    <div class="label">📝 Subject</div>
                    <div class="value">${escapeHtml(subject)}</div>
                </div>
                
                <div class="field">
                    <div class="label">💬 Message</div>
                    <div class="message-box">${escapeHtml(message)}</div>
                </div>
                
                <div class="meta-info">
                    <strong>📊 Message Details:</strong><br>
                    <strong>⏰ Sent:</strong> ${timestamp}<br>
                    <strong>🌐 IP Address:</strong> ${ip}<br>
                    <strong>🔍 User Agent:</strong> ${escapeHtml(userAgent)}
                </div>
            </div>
            
            <div class="footer">
                <a href="mailto:${escapeHtml(email)}" class="reply-button">
                    Reply to ${escapeHtml(name)}
                </a>
                <p>This message was sent from your portfolio contact form.</p>
                <p><strong>Simply reply to this email to respond directly to the sender.</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;
}

// Helper function to build auto-reply HTML
function buildAutoReplyHTML(formData) {
    const { name, subject } = formData;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for your message</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                background-color: #f4f4f4; 
                margin: 0; 
                padding: 20px; 
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: #fff; 
                border-radius: 15px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
                overflow: hidden; 
            }
            .header { 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white; 
                padding: 40px 30px; 
                text-align: center; 
            }
            .content { 
                padding: 40px 30px; 
            }
            .footer { 
                background: #f8f9fa; 
                padding: 30px; 
                text-align: center; 
                color: #666; 
                border-top: 1px solid #eee; 
            }
            .projects-list {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .project-link {
                color: #667eea;
                text-decoration: none;
                font-weight: 600;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🙏 Thank You!</h1>
                <p>Your message has been received successfully</p>
            </div>
            
            <div class="content">
                <p>Dear <strong>${escapeHtml(name)}</strong>,</p>
                
                <p>Thank you for reaching out through my portfolio website! I have successfully received your message regarding <strong>"${escapeHtml(subject)}"</strong> and I truly appreciate your interest in my work.</p>
                
                <p>I will review your message carefully and respond within <strong>24-48 hours</strong>. I'm excited to learn more about your project and explore potential collaboration opportunities.</p>
                
                <div class="projects-list">
                    <p><strong>📱 Meanwhile, feel free to explore my work:</strong></p>
                    <ul>
                        <li><strong>Portfolio Website:</strong> <a href="https://github.com/mayarsokaryy/Portfolio" class="project-link">GitHub Repository</a></li>
                        <li><strong>Mastering Git:</strong> <a href="https://github.com/mayarsokaryy/masteringGIT" class="project-link">GitHub Repository</a></li>
                    </ul>
                </div>
                
                <p><strong>📞 Need urgent assistance?</strong><br>
                Feel free to contact me directly:</p>
                <ul>
                    <li>📧 Email: <strong>mayarsokary@gmail.com</strong></li>
                    <li>💼 LinkedIn: <a href="https://linkedin.com/in/mayar-elsokary" class="project-link">mayar-elsokary</a></li>
                </ul>
                
                <p>Looking forward to connecting with you!</p>
                
                <p>Best regards,<br>
                <strong>Mayar Elsokary</strong><br>
                <em>Software Engineer & DevOps Specialist</em></p>
            </div>
            
            <div class="footer">
                <p>🤖 This is an automated response to confirm receipt of your message.</p>
                <p>You will receive a personal response shortly.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Portfolio Contact API - Brevo Integration',
        timestamp: new Date().toISOString()
    });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email address'
            });
        }

        // Client info
        const clientInfo = {
            ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown',
            userAgent: req.headers['user-agent'] || 'Unknown',
            timestamp: new Date().toLocaleString('en-US', {
                timeZone: 'Africa/Cairo',
                dateStyle: 'full',
                timeStyle: 'long'
            })
        };

        // Send main email to yourself
        const mainEmailOptions = {
            from: `"${process.env.FROM_NAME || 'Portfolio Contact'}" <${process.env.FROM_EMAIL}>`,
            to: `"${process.env.TO_NAME || 'Mayar Elsokary'}" <${process.env.TO_EMAIL}>`,
            replyTo: `"${name}" <${email}>`,
            subject: `Portfolio Contact: ${subject}`,
            html: buildMainEmailHTML({ name, email, subject, message }, clientInfo)
        };

        const mainResult = await transporter.sendMail(mainEmailOptions);
        console.log(`✓ Main email sent to ${process.env.TO_EMAIL} - MessageID: ${mainResult.messageId}`);

        // Send auto-reply
        let autoReplyResult = null;
        if (process.env.ENABLE_AUTO_REPLY === 'true') {
            const autoReplyOptions = {
                from: `"${process.env.FROM_NAME || 'Mayar Elsokary'}" <${process.env.FROM_EMAIL}>`,
                to: `"${name}" <${email}>`,
                subject: `Thank you for contacting Mayar Elsokary - Message received`,
                html: buildAutoReplyHTML({ name, email, subject, message })
            };

            autoReplyResult = await transporter.sendMail(autoReplyOptions);
            console.log(`✓ Auto-reply sent to ${email} - MessageID: ${autoReplyResult.messageId}`);
        } else {
            console.log(`⚠ Auto-reply disabled (ENABLE_AUTO_REPLY=${process.env.ENABLE_AUTO_REPLY})`);
        }

        res.json({
            success: true,
            message: 'Message sent successfully! I\'ll get back to you within 24-48 hours.',
            messageId: mainResult.messageId,
            autoReplyId: autoReplyResult?.messageId || null
        });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send message. Please try again or contact directly at mayarsokary@gmail.com',
            details: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Portfolio Backend API running on port ${PORT}`);
    console.log(`📧 Using Brevo API for email delivery`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'Not set (allowing all origins)'}`);
});
