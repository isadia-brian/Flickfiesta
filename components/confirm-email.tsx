import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Font,
  Row,
  Column,
  Text,
  Hr,
  Heading,
  Button,
  Link,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ConfirmUserEmail = (props) => {
  const { url } = props;
  const previewText = "Verify email address";
  return (
    <Html>
      <Head>
        <Font
          fontFamily='Roboto'
          fallbackFontFamily='Verdana'
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap",
            format: "truetype",
          }}
          fontStyle='normal'
        />
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-[#f6f8fd] my-auto px-2 '>
          <Container className=' my-[60px] bg-white px-4 py-8 rounded-md shadow-lg '>
            <Section align='left' className=' w-[250px]'>
              <Row>
                <Column>
                  <Img
                    src={`/images/logo.png`}
                    width='40'
                    height='37'
                    alt='FilmSasa'
                    className=''
                  />
                </Column>
                <Column className=''>
                  <Text className='font-extrabold text-2xl'>FilmSasa</Text>
                </Column>
              </Row>
            </Section>
            <Hr />
            <Heading className='mt-8 mb-3 text-3xl'>
              Verify your email address
            </Heading>
            <Section>
              <Text>Hi,</Text>
              <Text>
                Someone, recently used this email to create an account on
                FilmSasa. If this was you click the button below to confirm and
                verify your email account.
              </Text>
            </Section>
            <Section>
              <Button
                className='bg-orange-500 font-medium py-3 px-5 rounded-md cursor-pointer'
                href={url}>
                Verify Email
              </Button>
            </Section>
            <Section className='my-7'>
              <Text>
                If this wasn't you, please ignore and delete this email
              </Text>
            </Section>
            <Section>
              <Text>Best,</Text>
              <Text className='-mt-4'>FilmSasa Team</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmUserEmail;
