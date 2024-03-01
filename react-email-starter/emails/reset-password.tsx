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

export const ResetPassword = () => {
  const previewText = "Password Reset";
  return (
    <Html>
      <Head>
        <Font
          fontFamily='Poppins'
          fallbackFontFamily='Verdana'
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;800;900&display=swap",
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
                    src={`${baseUrl}/static/logo.png`}
                    width='40'
                    height='37'
                    alt='Flickfiesta'
                    className=''
                  />
                </Column>
                <Column>
                  <Text className='font-extrabold text-2xl'>Flickfiesta</Text>
                </Column>
              </Row>
            </Section>
            <Hr />
            <Heading className='mt-8 mb-3 text-3xl'>Password Reset</Heading>
            <Section>
              <Text>Hi,</Text>
              <Text>
                Someone, recently requested for a password change for your
                Flickfiesta account. If this was you, you can set a new password
                here.
              </Text>
            </Section>
            <Section>
              <Button className='bg-orange-500 font-medium py-3 px-5 rounded-md cursor-pointer'>
                Reset Password
              </Button>
            </Section>
            <Section className='my-7'>
              <Text>
                If you don't want to change your password or didn't request
                this, just ignore and delete this message.
              </Text>
              <Text>
                To keep your account secure, please don't forward this email to
                anyone.
              </Text>
            </Section>
            <Section>
              <Text>Best,</Text>
              <Text className='-mt-4'>Flickfiesta Team</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPassword;
