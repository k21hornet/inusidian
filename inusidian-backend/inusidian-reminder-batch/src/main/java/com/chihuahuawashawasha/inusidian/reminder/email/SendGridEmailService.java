package com.chihuahuawashawasha.inusidian.reminder.email;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
public class SendGridEmailService {

    private final SendGrid sendGrid;
    private final String fromEmail;

    public SendGridEmailService(
            @Value("${sendgrid.api-key}") String apiKey,
            @Value("${sendgrid.from-email}") String fromEmail) {
        this.sendGrid = new SendGrid(apiKey);
        this.fromEmail = fromEmail;
    }

    public void sendReminderEmail(String toEmail, String userName) throws IOException {
        Email from = new Email(fromEmail);
        Email to = new Email(toEmail);
        String subject = "チワワわしゃわしゃInusidian";
        String body = String.format("""
                %s さん、チワワをわしゃわしゃする時間ですよ。

                ※このメールはInusidianから自動送信されています。
                """, userName);

        Content content = new Content("text/plain", body);
        Mail mail = new Mail(from, subject, to, content);

        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());

        Response response = sendGrid.api(request);
        log.info("SendGrid レスポンス: statusCode={}, to={}", response.getStatusCode(), toEmail);

        if (response.getStatusCode() >= 400) {
            throw new IOException("SendGrid メール送信失敗: statusCode=" + response.getStatusCode() + ", body=" + response.getBody());
        }
    }
}
