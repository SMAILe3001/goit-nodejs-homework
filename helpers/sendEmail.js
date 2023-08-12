import ElasticEmail from '@elasticemail/elasticemail-client';
import 'dotenv/config';

const { ELASTICEMAIL_API_KEY, ELASTICEMAIL_FROM } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTICEMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const callback = function (error, data, response) {
  if (error) {
    console.log(error);
  } else {
    console.log('API called successfully');
  }
};

const sendEmail = ({ to, subject, html }) => {
  const email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient(to)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: 'HTML',
          Content: html,
        }),
      ],
      Subject: subject,
      From: ELASTICEMAIL_FROM,
    },
  });

  api.emailsPost(email, callback);
};

export default sendEmail;
